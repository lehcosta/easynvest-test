describe("Create user", function() {
  beforeEach(function() {
    cy.visit("/");
    cy.wait(2000);
    cy.get('[data-js="btnCreateUser"]').click();
  });

  it("User created successfully!", function() {
    cy.get('[data-js="field-name"]').type("Leandro");
    cy.get('[data-js="field-phone"]').type("11968349210");
    cy.get('[data-js="field-email"]').type("leandrohernandes95@gmail.com");
    cy.get('[data-js="field-cpf"]').type("46584022897");

    cy.get("form button").click();

    cy.get(".table")
      .find("tbody tr")
      .should("have.length", 4);
  });

  describe("Validate email", function() {
    it("Invalid email", function() {
      cy.get('[data-js="field-email"]').type("leandrohernandes95");
      cy.get("form button").click();

      cy.get('[data-js="field-email"]').should(
        "have.class",
        "input__field--error"
      );
    });

    it("Valid email", function() {
      cy.get('[data-js="field-email"]').type("leandrohernandes95@gmail.com");
      cy.get("form button").click();

      cy.get('[data-js="field-email"]').should(
        "not.have.class",
        "input__field--error"
      );
    });
  });

  describe("Validate Phone", function() {
    it("Invalid Cellphone", function() {
      cy.get('[data-js="field-phone"]').type("1196834");
      cy.get("form button").click();

      cy.get('[data-js="field-phone"]').should(
        "have.class",
        "input__field--error"
      );
    });

    it("Valid Cellphone", function() {
      cy.get('[data-js="field-phone"]').type("11968349210");
      cy.get("form button").click();

      cy.get('[data-js="field-phone"]').should(
        "have.not.class",
        "input__field--error"
      );
    });
  });
});
