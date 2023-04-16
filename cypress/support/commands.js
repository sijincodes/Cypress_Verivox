import {
  COOKIE_PRIVACY_POLICY_LINK,
  ACCEPT_EVERYTHING_BUTTON,
  VERIVOX_ICON,
} from "../e2e/pages/Cookies";
import {
  PRIVATHAFTPFLICHT_LINK,
  PRIVATHAFTPFLICHT_PAGE_URL,
  MARITAL_STATUS_INPUT,
  AGE_INPUT,
  PRIVATHAFTPFLICHT_CALCULATOR_URL,
  DOB_CALENDAR_ICON,
  SELECTED_DAY,
  POSTAL_CODE,
  COMPARE_NOW_TEXT,
  COMPARE_NOW_BUTTON,
  TARIFF_RESULT_URL,
  TARIFF_CARDS_LIST,
} from "../e2e/pages/DslCalculator";

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

Cypress.Commands.add("getTariffSearchResults", () => {
  cy.fixture("user").then((user) => {
    const maritalStatusOption = user.maritalStatusOption;
    const age = user.age;
    const birth_day = user.birth_day;
    const postal_code = user.postal_code;

    cy.get(PRIVATHAFTPFLICHT_LINK).invoke("show").click({ force: true });
    cy.url().should("include", PRIVATHAFTPFLICHT_PAGE_URL);
    cy.get(MARITAL_STATUS_INPUT).select(maritalStatusOption);
    cy.get(AGE_INPUT).type(age);
    cy.contains(COMPARE_NOW_TEXT).click();
    cy.url().should("include", PRIVATHAFTPFLICHT_CALCULATOR_URL);
    cy.get(DOB_CALENDAR_ICON).click();
    cy.contains(SELECTED_DAY, birth_day).click();
    cy.get(POSTAL_CODE).type(postal_code);
    cy.get(COMPARE_NOW_BUTTON).wait(3000).click({ force: true });
    cy.url().should("include", TARIFF_RESULT_URL);
    cy.get(TARIFF_CARDS_LIST, { timeout: 30000 });
  });
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
