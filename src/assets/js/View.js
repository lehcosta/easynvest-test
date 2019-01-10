const APP_MODES = ["list", "create", "edit"];

class View {
  constructor(template, emitter) {
    this.template = template;
    this.emitter = emitter;
    this.appMode = "list";

    this.emitter.addListener("change_app_mode", this.setAppMode);
  }

  setAppMode = mode => {
    if (APP_MODES.indexOf(mode) === -1) {
      throw Error("invalid mode!");
    }

    this.appMode = mode;
  };

  render(users, parameters) {
    const templ = this.template[this.appMode](users, parameters);

    return templ;
  }
}

export default View;
