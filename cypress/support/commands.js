Cypress.Commands.add(
  "fillRegisterForm",
  (fullname, email, password, repeatPassword) => {
    cy.get("#full-name").type(fullname);
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#confirm-password").type(repeatPassword);
  }
);

Cypress.Commands.add("submitFormAndCheckErrors", () => {
  cy.get("form").submit();
  cy.url().should("eq", "https://test-qa.inlaze.com/auth/sign-up");
});

Cypress.Commands.add("clearRegisterForm", () => {
  cy.get("#full-name").clear();
  cy.get("#email").clear();
  cy.get("#password").clear();
  cy.get("#confirm-password").clear();
});
