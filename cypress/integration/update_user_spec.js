describe("Update user", function() {
  beforeEach(function() {
    cy.visit("/");
    cy.wait(2000);
  });

  it("Load edit page", function() {
    cy.get("tbody tr")
      .last()
      .find('[data-js="btnEditUser"]')
      .click();

    cy.get('[data-js="field-name"]').should("have.value", "My name 3");
    cy.get('[data-js="field-phone"]').should("have.value", "11987654321");
    cy.get('[data-js="field-email"]').should(
      "have.value",
      "myemail3@test.com.br"
    );
    cy.get('[data-js="field-cpf"]').should("have.value", "45486737688");
  });

  it("User updated successfully!", function() {
    cy.get("tbody tr")
      .last()
      .find('[data-js="btnEditUser"]')
      .click();

    cy.get('[data-js="field-name"]')
      .clear()
      .type("Leandro");
    cy.get('[data-js="field-phone"]')
      .clear()
      .type("11968349210");
    cy.get('[data-js="field-email"]')
      .clear()
      .type("leandrohernandes95@gmail.com");
    cy.get('[data-js="field-cpf"]')
      .clear()
      .type("46584022897");

    cy.get("form button").click();

    cy.get("tbody tr")
      .last()
      .find("td")
      .eq(0)
      .should("contain", "3");

    cy.get("tbody tr")
      .last()
      .find("td")
      .eq(1)
      .should("contain", "Leandro");

    cy.get("tbody tr")
      .last()
      .find("td")
      .eq(2)
      .should("contain", "465.840.228-97");

    cy.get("tbody tr")
      .last()
      .find("td")
      .eq(3)
      .should("contain", "(11) 96834-9210");

    cy.get("tbody tr")
      .last()
      .find("td")
      .eq(4)
      .should("contain", "leandrohernandes95@gmail.com");
  });
});
