import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {
  TARIFF_RESULT_API,
  TOTAL_TARIFFS_AVAILABLE_TEXT,
  LOAD_20TARIFFS_MORE_BUTTON,
  LOAD_ALL_TARIFFS_BUTTON,
} from "../../pages/TariffResultPage";
import {
  TARIFF_DETAILS_SECTION_ITEMS_TITLE,
  SELECTED_TARIFF_PRICE_TEXT,
  TARIFF_DETAILS_BUTTON,
  TARIFF_DETAILS_SECTION_ITEMS_LIST,
  TARIFF_GO_TO_ONLINE_APPLICATION_BUTTON,
  TARIFF_DETAILS_BUTTON_LIST,
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
  TARIFF_RESULT_URL,
  TARIFF_CARDS_LIST,
} from "../../pages/DslCalculator";
beforeEach(() => {
  cy.visit(Cypress.config().baseUrl);
  cy.acceptCookies();
  cy.intercept("GET", TARIFF_RESULT_API).as("tariff_result_api");
});

//Scenario1
When(
  "User navigates to 'Versicherungen' and selects 'Privathaftpflicht'",
  () => {
    cy.get(PRIVATHAFTPFLICHT_LINK).invoke("show").click({ force: true });
    cy.url().should("include", PRIVATHAFTPFLICHT_PAGE_URL);
  }
);
Then("User enters the age '18' and 'Single ohne Kinder'", () => {
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
When("User enters the birthdate '4'", () => {
  cy.fixture("user").then((user) => {
    const birth_day = user.birth_day;

    cy.get(DOB_CALENDAR_ICON).click();
    cy.contains(SELECTED_DAY, birth_day).click();
  });
});
When("User enters the zip code '13088'", () => {
  cy.fixture("user").then((user) => {
    const postal_code = user.postal_code;

    cy.get(POSTAL_CODE).type(postal_code);
  });
});
When("User clicks the 'Jetzt vergleichen' button", () => {
  cy.get(COMPARE_NOW_BUTTON).wait(3000).click({ force: true });
});
Then(
  "User should be navigated to  tariff result page with minimum 5 tariffs displayed",
  () => {
    cy.url().should("include", TARIFF_RESULT_URL);
    cy.get(TARIFF_CARDS_LIST, { timeout: 30000 });
  }
);

//Scenario2
Given("User is on the  'Privathaftpflicht' tariff Result List page", () => {
  cy.getTariffSearchResults();
});
Then(
  "User should see the total number of available tariffs listed above all the result list",
  () => {
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
  }
);
Then(
  "User should see only the first 20 tariffs displayed on the screen",
  () => {
    cy.get(TARIFF_CARDS_LIST, { timeout: 30000 })
      .its("length")
      .should("eq", 20);
  }
);
When("User clicks on the button labeled '20 Weitere Tarife Laden'", () => {
  cy.get(LOAD_20TARIFFS_MORE_BUTTON).click({ true: false });
});
Then("User should see also the next 20 tariffs displayed", () => {
  cy.get(TARIFF_CARDS_LIST, { timeout: 30000 }).its("length").should("eq", 40);
});
When(
  "User clicks on button labeled 'Alle Tarife laden' to load any additional tariffs until all tariffs have been displayed",
  () => {
    cy.get(LOAD_ALL_TARIFFS_BUTTON).click();
    cy.get("@total_number_of_tariffs").then((total_number_of_tariffs) => {
      cy.get(TARIFF_CARDS_LIST, { timeout: 30000 })
        .its("length")
        .should("eq", total_number_of_tariffs);
    });
  }
);
Then(
  "User should not be able to see the button labeled '20 Weitere Tarife Laden'",
  () => {
    cy.get(LOAD_20TARIFFS_MORE_BUTTON).should("not.exist");
  }
);

//Scenario3
Given("User is at the 'Privathaftpflicht' tariff Result List page", () => {
  cy.getTariffSearchResults();
});
Then("User should see the tariff price of the first tariff", () => {
  cy.wait("@tariff_result_api").then((res) => {
    if (res.response.statusCode === 200) {
      cy.wrap(res.response.body.offers[0].prices[12]).as(
        "selected_tariff_price"
      );
    }
  });
  cy.get("@selected_tariff_price").then((price) => {
    let tariffPrice = String(price).replace(".", ",");
    cy.get(SELECTED_TARIFF_PRICE_TEXT).should("include.text", tariffPrice);
  });
});

When("User clicks on the button labeled 'TarifDetails'", () => {
  cy.get(TARIFF_DETAILS_BUTTON).click();
});
Then(
  "User should see tariff details sections: 'Weitere Leistungen', 'Allgemein','Tätigkeiten und Hobbys','Miete & Immobilien' and 'Dokumente'",
  () => {
    cy.get(TARIFF_DETAILS_SECTION_ITEMS_LIST).each((item, index) => {
      cy.wrap(item).should(
        "contain.text",
        TARIFF_DETAILS_SECTION_ITEMS_TITLE[index]
      );
    });
  }
);
Then("User should see the 'ZUM ONLINE-ANTRAG' button", () => {
  cy.fixture("tariffDetail").then((selectedTariff) => {
    const onlineApplicationButtonText =
      selectedTariff.onlineApplicationButtonText;
    cy.get(TARIFF_GO_TO_ONLINE_APPLICATION_BUTTON).should(
      "have.text",
      onlineApplicationButtonText
    );
  });
});
Then(
  "User should be able to see two 'ZUM ONLINE-ANTRAN' buttons for the selected tarrif",
  () => {
    cy.get(TARIFF_DETAILS_BUTTON_LIST)
      .filter(':contains("Zum Online-Antrag")')
      .should("have.length", 2);
  }
);
