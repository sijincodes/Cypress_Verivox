import { TARIFF_CARDS_LIST } from "../../pages/DslCalculator";
import {
  TARIFF_RESULT_API,
  TOTAL_TARIFFS_AVAILABLE_TEXT,
  LOAD_20TARIFFS_MORE_BUTTON,
  LOAD_ALL_TARIFFS_BUTTON,
} from "../../pages/TariffResultPage";
describe("Verify the DSL Calculator", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.acceptCookies();
  });

  it("Verify for Privathaftpflicht calculator with Single ohne Kinder category, minimun 5 tariffs are displayed", () => {
    cy.getTariffSearchResults();
    cy.get(TARIFF_CARDS_LIST, { timeout: 30000 })
      .its("length")
      .should("be.gte", 5);
  });

  it.only("Validate the multiple tariff Result List page are loaded", () => {
    cy.intercept("GET", TARIFF_RESULT_API).as("tariff_result_api");
    cy.getTariffSearchResults();
    cy.get(TARIFF_CARDS_LIST, { timeout: 30000 });

    cy.wait("@tariff_result_api").then((res) => {
      if (res.response.statusCode === 200) {
        cy.get(TOTAL_TARIFFS_AVAILABLE_TEXT).should(
          "contain.text",
          res.response.body.meta.pagination.total
        );

        cy.wrap(res.response.body.meta.pagination.total).as(
          "total_number_of_tariffs"
        );
      }
    });

    cy.get(TARIFF_CARDS_LIST, { timeout: 30000 })
      .its("length")
      .should("eq", 20);
    cy.get(LOAD_20TARIFFS_MORE_BUTTON).click({ true: false });
    cy.get(TARIFF_CARDS_LIST, { timeout: 30000 })
      .its("length")
      .should("eq", 40);
    cy.get(LOAD_ALL_TARIFFS_BUTTON).click();

    cy.get("@total_number_of_tariffs").then((total_number_of_tariffs) => {
      cy.get(TARIFF_CARDS_LIST, { timeout: 30000 })
        .its("length")
        .should("eq", total_number_of_tariffs);
    });

    cy.get(LOAD_20TARIFFS_MORE_BUTTON).should("not.exist");
  });
});
