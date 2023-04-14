import {
  COOKIE_PRIVACY_POLICY_LINK,
  ACCEPT_EVERYTHING_BUTTON,
  VERIVOX_ICON,
} from "../e2e/pages/Cookies";
Cypress.Commands.add("acceptCookies", () => {
  cy.get(COOKIE_PRIVACY_POLICY_LINK).should("be.visible");
  cy.get(COOKIE_PRIVACY_POLICY_LINK)
    .eq(0)
    .invoke("show")
    .trigger("mouseover")
    .click();

  cy.get(ACCEPT_EVERYTHING_BUTTON).should("be.visible");
  cy.get(ACCEPT_EVERYTHING_BUTTON)
    .eq(0)
    .invoke("show")
    .wait(3000)
    .focus()
    .click({ force: true });

  cy.get(VERIVOX_ICON).click({ force: true });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
