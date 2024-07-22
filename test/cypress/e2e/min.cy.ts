describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

describe("Backend", () => {
  it("checks get response", () => {
    const url = "http://localhost:2222";
    cy.request({
      method: "GET",
      url: `${url}/todos`,
    }).then((res) => {
      expect(res.body).to.be.a("array");
    });
  });
});

describe("Frontend Form", () => {
  it("submits the form with all required fields", () => {
    const url = "http://localhost:3333";
    const topic = "Test Topic";
    const name = "John Doe";
    const imageUrl = "https://cdn.pixabay.com/photo/2017/09/03/00/44/png-2709031_640.png";
    const detail = "This is a detailed description";

    cy.visit(url);

    // Increase timeout for elements to appear
    cy.get("[data-cy='input-topic']", { timeout: 10000 }).should('be.visible').type(topic);
    cy.get("[data-cy='input-name']", { timeout: 10000 }).should('be.visible').type(name);
    cy.get("[data-cy='input-link']", { timeout: 10000 }).should('be.visible').type(imageUrl);
    cy.get("[data-cy='input-detail']", { timeout: 10000 }).should('be.visible').type(detail);

    // Submit the form
    cy.get("[data-cy='submit']", { timeout: 10000 }).should('be.visible').click();

    // Optionally wait for the page to update
    cy.wait(2000);

    // Verify that the todo item was created
    cy.contains(topic);
    cy.contains(name);
    cy.contains(detail);
  });
});
