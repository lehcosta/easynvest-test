describe("Load initial data", function() {
  it("Rendering initial data", function() {
    cy.visit("http://localhost:8080");
    cy.wait(2000);
    cy.get(".table")
      .find("tbody tr")
      .should("have.length", 3);
  });
});
