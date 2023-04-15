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
  TARIFF_RESULT_ROUTE,
  TARIFF_CARDS_LIST,
} from "../../pages/DslCalculator";
describe("Verify the DSL Calculator", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.acceptCookies();
  });

  it("Verify for Privathaftpflicht calculator with Single ohne Kinder category, minimun 5 tariffs are displayed", () => {
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
      cy.url().should("include", TARIFF_RESULT_ROUTE);

      cy.get(TARIFF_CARDS_LIST, { timeout: 20000 })
        .its("length")
        .should("be.gte", 5);
    });
  });
});
