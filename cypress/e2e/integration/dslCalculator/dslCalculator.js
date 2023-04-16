import {
  Before,
  Given,
  When,
  And,
  Then,
} from "cypress-cucumber-preprocessor/steps";

import {
  TARIFF_RESULT_API,
  TOTAL_TARIFFS_AVAILABLE_TEXT,
  LOAD_20TARIFFS_MORE_BUTTON,
  LOAD_ALL_TARIFFS_BUTTON,
} from "../../pages/TariffResultPage";
import {
  TARIFF_DETAILS_SECTION_ITEMS_TITLE,
  SELECTED_TARIFF_PRICE,
  TARIFF_DETAILS_BUTTON,
  TARIFF_DETAILS_SECTION_ITEMS_LIST,
  TARIFF_GO_TO_ONLINE_APPLICATION_BUTTON,
} from "../../pages/TariffDetail";
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
Before(() => {
  cy.visit(Cypress.config().baseUrl);
  cy.acceptCookies();
  cy.intercept("GET", TARIFF_RESULT_API).as("tariff_result_api");
});

When(
  "User navigates to 'Versicherungen' and selects 'Privathaftpflicht'",
  () => {
    cy.get(PRIVATHAFTPFLICHT_LINK).invoke("show").click({ force: true });
    cy.url().should("include", PRIVATHAFTPFLICHT_PAGE_URL);
  }
);
And("User enters the age '18' and 'Single ohne Kinder'", () => {
  cy.fixture("user").then((user) => {
    const maritalStatusOption = user.maritalStatusOption;
    const age = user.age;

    cy.get(MARITAL_STATUS_INPUT).select(maritalStatusOption);
    cy.get(AGE_INPUT).type(age);
    cy.contains(COMPARE_NOW_TEXT).click();
  });
});
Then(
  "User should go to the Privathaftpflicht personal information page",
  () => {
    cy.url().should("include", PRIVATHAFTPFLICHT_CALCULATOR_URL);
  }
);
And("User enters the birthdate '4'", () => {
  cy.fixture("user").then((user) => {
    const birth_day = user.birth_day;

    cy.get(DOB_CALENDAR_ICON).click();
    cy.contains(SELECTED_DAY, birth_day).click();
  });
});
And("User enters the zip code '13088'", () => {
  cy.fixture("user").then((user) => {
    const postal_code = user.postal_code;

    cy.get(POSTAL_CODE).type(postal_code);
  });
});
And("User clicks the 'Jetzt vergleichen' button", () => {
  cy.get(COMPARE_NOW_BUTTON).wait(3000).click({ force: true });
});
Then(
  "User should see a page that lists the available tariffs for selection with minimum 5 tariffs displayed",
  () => {
    cy.url().should("include", TARIFF_RESULT_ROUTE);
    cy.get(TARIFF_CARDS_LIST, { timeout: 30000 });
  }
);
