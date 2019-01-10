import Template from "./Template";
import View from "./View";
import EventEmitter from "./EventEmitter";
import Storage from "./Storage";
import { validateEmail } from "./helpers";

class App {
  constructor() {
    this.emitter = new EventEmitter();

    this.template = new Template();
    this.view = new View(this.template, this.emitter);
    this.store = new Storage(this.emitter);

    /**
     * Elements
     */
    this.root = document.querySelector(".root");
    this.usersContainer = document.querySelector(".list-users");
    this.btnEditUser = "btn-edit-user";
  }

  async init() {
    this.emitter.addListener("change_app_mode", this.render);

    await this.hidrateApp();
    this.render();
  }

  getData = key => {
    return this.store.find(key);
  };

  async hidrateApp() {
    const users = this.getData("users") || [];

    if (users.length > 0) return;
    try {
      const res = await fetch(
        "https://private-21e8de-rafaellucio.apiary-mock.com/users"
      );

      const result = await res.json();

      this.emitter.emit("save", {
        key: "users",
        value: JSON.stringify(result)
      });
    } catch (error) {
      console.log("error -> ", error);
    }
  }

  addEventListeners() {
    /**
     * Button Create User
     */
    const btnCreateUser = document.querySelectorAll(
      '[data-js="btnCreateUser"]'
    );
    btnCreateUser.forEach(btn =>
      btn.addEventListener("click", e => this.changeAppMode("create"))
    );

    /**
     * Button Edit User
     */
    const btnEditUser = document.querySelectorAll('[data-js="btnEditUser"]');
    btnEditUser.forEach(btn =>
      btn.addEventListener("click", e =>
        this.changeAppMode("edit", e.target.dataset.index)
      )
    );

    const btnGoToList = document.querySelectorAll('[data-js="btnGoToList"]');
    btnGoToList.forEach(btn =>
      btn.addEventListener("click", e => this.changeAppMode("list"))
    );

    /**
     * Form Update User
     */
    const formUpdateUser = document.querySelectorAll(
      '[data-js="editUserForm"]'
    );
    formUpdateUser.forEach(form =>
      form.addEventListener("submit", this.handleSubmitUpdateForm)
    );

    const formCreateUser = document.querySelectorAll(
      '[data-js="formCreateUser"]'
    );
    formCreateUser.forEach(form =>
      form.addEventListener("submit", this.handleCreateUser)
    );

    /**
     * Button Remove User
     */
    const btnRemoveUser = document.querySelectorAll(
      '[data-js="btnRemoveUser"]'
    );
    btnRemoveUser.forEach(btn =>
      btn.addEventListener("click", this.handleRemoveUser)
    );

    const inputNumbers = document.querySelectorAll(
      '[data-input-type="number"]'
    );
    inputNumbers.forEach(input =>
      input.addEventListener("keyup", this.forceJustNumbers)
    );

    const inputString = document.querySelectorAll(
      '[data-input-type="string"]'
    );
    inputString.forEach(input =>
      input.addEventListener("keyup", this.forceJustString)
    );
  }

  removeEventListeners() {
    /**
     * Button Create User
     */
    const btnCreateUser = document.querySelectorAll(
      '[data-js="btnCreateUser"]'
    );
    btnCreateUser.forEach(btn => btn.addEventListener("click", e => {}, true));

    const btnEditUser = document.querySelectorAll('[data-js="btnEditUser"]');
    btnEditUser.forEach(btn =>
      btn.removeEventListener("click", () => {}, true)
    );

    const btnGoToList = document.querySelectorAll('[data-js="btnGoToList"]');
    btnGoToList.forEach(btn => btn.removeEventListener("click", e => {}, true));

    /**
     * Form Update User
     */
    const formUpdateUser = document.querySelectorAll(
      '[data-js="editUserForm"]'
    );
    formUpdateUser.forEach(form =>
      form.removeEventListener("submit", () => {}, true)
    );

    /**
     * Button Remove User
     */
    const btnRemoveUser = document.querySelectorAll(
      '[data-js="btnRemoveUser"]'
    );
    btnRemoveUser.forEach(btn =>
      btn.removeEventListener("click", () => {}, true)
    );
  }

  forceJustNumbers = e => {
    const {
      target: { value }
    } = e;

    if (!/^[0-9]+$/.test(value)) {
      document.querySelector(
        `[data-js="${e.target.dataset.js}"]`
      ).value = value.substring(0, value.length - 1);
    }
  };

  forceJustString = e => {
    const {
      target: { value }
    } = e;

    if (/^[0-9]+$/.test(value)) {
      document.querySelector(
        `[data-js="${e.target.dataset.js}"]`
      ).value = value.substring(0, value.length - 1);
    }
  };

  handleCreateUser = e => {
    e.preventDefault();
    let isValid = true;

    const fields = ["field-name", "field-phone", "field-email", "field-cpf"];

    // Validate
    fields.forEach(field =>
      document.querySelectorAll(`[data-js="${field}"]`).forEach(f => {
        const {
          dataset: { js: dataAttribute },
          value
        } = f;

        const name = dataAttribute.split("-")[1];

        if (f.value === "") {
          isValid = false;

          f.classList.add("input__field--error");
          f.addEventListener("keydown", function() {
            f.classList.remove("input__field--error");
            f.removeEventListener("keyup", () => {}, true);
          });
        }

        if (name === "email" && !validateEmail(value)) {
          isValid = false;

          f.classList.add("input__field--error");
          f.addEventListener("keydown", function() {
            f.classList.remove("input__field--error");
            f.removeEventListener("keyup", () => {}, true);
          });
        }

        if (name === "phone" && value.length !== 11) {
          console.log("value -> ", value.length);
          isValid = false;

          f.classList.add("input__field--error");
          f.addEventListener("keydown", function() {
            f.classList.remove("input__field--error");
            f.removeEventListener("keyup", () => {}, true);
          });
        }
      })
    );

    if (!isValid) return false;

    const data = {};

    fields.forEach(field =>
      document.querySelectorAll(`[data-js="${field}"]`).forEach(f => {
        const {
          dataset: { js: dataAttribute },
          value
        } = f;
        const name = dataAttribute.split("-")[1];

        data[name] = value;
      })
    );

    const users = JSON.parse(this.getData("users"));
    users.push(data);
    this.emitter.emit("save", { key: "users", value: JSON.stringify(users) });
    this.changeAppMode("list");
  };

  handleRemoveUser = e => {
    const {
      target: {
        dataset: { index }
      }
    } = e;

    const users = JSON.parse(this.getData("users"));

    const modifiedUsers = users.filter((obj, key) => {
      if (parseInt(key) === parseInt(index)) return false;
      return true;
    });

    this.emitter.emit("save", {
      key: "users",
      value: JSON.stringify(modifiedUsers)
    });

    this.changeAppMode("list");
  };

  changeAppMode = (mode, props) => {
    this.emitter.emit("change_app_mode", mode, props);
  };

  handleSubmitUpdateForm = e => {
    e.preventDefault();
    let isValid = true;

    const fields = ["field-name", "field-phone", "field-email", "field-cpf"];

    fields.forEach(field => {
      const inputEl = document.querySelector(`[data-js="${field}"]`);
      isValid = inputEl.value !== "" && isValid;

      if (inputEl.value === "") {
        inputEl.classList.add("input--error");
      }
    });

    if (!isValid) {
      console.log("isValid", isValid);
      return;
    }

    const users = JSON.parse(this.store.find("users"));

    const id = document.querySelector('[data-js="field-id"]').value;
    const name = document.querySelector('[data-js="field-name"]').value;
    const phone = document.querySelector('[data-js="field-phone"]').value;
    const email = document.querySelector('[data-js="field-email"]').value;
    const cpf = document.querySelector('[data-js="field-cpf"]').value;

    const data = {
      name,
      phone,
      email,
      cpf
    };

    const usersModified = [...users];
    usersModified[id] = data;

    this.emitter.emit("save", {
      key: "users",
      value: JSON.stringify(usersModified)
    });

    this.changeAppMode("list");
  };

  render = (...props) => {
    const users = JSON.parse(this.store.find("users"));
    const templ = this.view.render(users, props);

    this.root.innerHTML = templ;

    this.removeEventListeners();
    this.addEventListeners();
  };
}

// Initialize App
const app = new App();
window.addEventListener("load", app.init());
