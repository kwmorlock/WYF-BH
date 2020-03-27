describe("Tests our form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3001/form");
    })
    it("Add text to inputs and submit form", () => {
        cy.get('input[name="name"]')
        .type("Chelsea")
        .should("have.value", "Chelsea");
        cy.get('input[name="flavor"]')
        .type("Cherry Coke")
        .should("have.value", "Cherry Coke");
    })
})