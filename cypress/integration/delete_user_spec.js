describe("Delete user", function() {
  beforeEach(function() {
    cy.visit("/");
    cy.wait(2000);
  });

  it("Delete a user", function() {
    cy.get("tbody tr")
      .last()
      .find('[data-js="btnRemoveUser"]')
      .click();

    cy.get(".table")
      .find("tbody tr")
      .should("have.length", 2);
  });
});
