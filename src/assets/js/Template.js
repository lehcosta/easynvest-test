import { formatCPF, formatCellphone } from "./helpers";

class Template {
  list(users) {
    return `
      <div class="listusers">
        <header class="listusers__header">
          <h2 class="listusers__header__title">Lista de Usuários</h2>
          <button class="btn btn--default" data-js="btnCreateUser">Criar Usuário</button>
        </header>
        <div class="listusers__table">
          <table class="table" cellpading="0" cellspacing="0">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Celular</th>
                <th>E-mail</th>
                <th colspan="2">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(
                (user, index) => `<tr>
                  <td>${index + 1}</td>
                  <td>${user.name}</td>
                  <td>${formatCPF(user.cpf)}</td>
                  <td>${formatCellphone(user.phone)}</td>
                  <td>${user.email}</td>
                  <td><button data-index="${index}" data-js="btnEditUser" class="btn btn--default">Editar</button></td>
                  <td><button data-index="${index}" data-js="btnRemoveUser" class="btn btn--default">Remover</button></td>
                </tr>`
              )}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  edit(users, props) {
    const user = users[props[1]];

    return `
      <div class="edituser">
        <header class="edituser__header">
          <button data-js="btnGoToList" class="btn btn--default">< Voltar</button>
        </header>
        <form class="edituser__form" data-js="editUserForm">
        <input type="hidden" name="id" value="${
          props[1]
          }" data-js="field-id" />
          <div class="form-group">
            <div class="input">
               <input type="text" name="name" class="input__field"  value="${
                 user.name
               }" data-js="field-name"  />
               <label class="input__label">Nome*</label>
            </div>
          </div>
          <div class="form-group">
            <div class="input">
              <input type="text" name="phone" class="input__field" value="${
                user.phone
              }" data-js="field-phone"  />
              <label class="input__label">Celular*</label>
            </div>
          </div>
          <div class="form-group">
            <div class="input">
              <input
                type="text"
                name="email"
                class="input__field"
                value="${user.email}"
                data-js="field-email"
                />
                <label class="input__label">E-mail*</label>
            </div>
          </div>
          <div class="form-group">
            <div class="input">
              <input type="cpf" name="email" class="input__field" value="${
                user.cpf
              }" data-js="field-cpf"  />
              <label class="input__label">CPF*</label>
            </div>
          </div>
          <div class="edituser__form__actions">
            <button data-js="btnUpdateUser" class="btn btn--primary">Atualizar</button>
          </div>
        </form>
      </div>
    `;
  }

  create() {
    return `
      <div class="createuser">
        <header class="createuser__header">
          <button data-js="btnGoToList" class="btn btn--default">< Voltar</button>
        </header>
        <form class="createuser__form" data-js="formCreateUser">
          <div class="form-group">
            <div class="input">
                <input type="text" name="name" class="input__field" data-js="field-name" data-input-type="string" />
                <label class="input__label">Nome*</label>
            </div>
          </div>
          <div class="form-group">
            <div class="input">
              <input type="text" name="phone" class="input__field" data-js="field-phone" data-input-type="number" />
              <label class="input__label">Celular* (com ddd)</label>
            </div>
          </div>
          <div class="form-group">
            <div class="input">
              <input
                type="text"
                name="email"
                class="input__field"
                data-js="field-email"
                />
                <label class="input__label">E-mail*</label>
            </div>
          </div>
          <div class="form-group">
            <div class="input">
              <input type="cpf" name="email" class="input__field" data-js="field-cpf"  />
              <label class="input__label">CPF*</label>
            </div>
          </div>
          <div class="edituser__form__actions">
            <button class="btn btn--primary">Cadastrar</button>
          </div>
        </form>
      </div>
    `;
  }
}

export default Template;
