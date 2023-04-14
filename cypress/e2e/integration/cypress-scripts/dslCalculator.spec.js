describe("Verify the DSL Calculator", () => {
  beforeEach(() => {
    const COOKIE_NAME = "cookie_consent";
    const COOKIE_NAME1 = "CONSENTMGR";
    // The value meaning that user has accepted the cookie policy
    const COOKIE_VALUE =
      "{'Funk':1,'Mktg':1,'Cmpg':1,'SubP':1,'Prtn':1,'Efu':1,'pt':1,'SfoB':1,'ga':1,'opE':1,'scA':1,'at':1,'OfE':1}";
    const COOKIE_VALUE1 =
      "c1:1%7Cc2:1%7Cc3:1%7Cc4:1%7Cc5:1%7Cc6:1%7Cc7:1%7Cc8:1%7Cc9:1%7Cc10:1%7Cc11:1%7Cc12:1%7Cc13:1%7Cc14:1%7Cc15:1%7Cts:1681486120252%7Cconsent:true";
    Cypress.on("window:before:load", (window) => {
      window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}`;
      window.document.cookie = `${COOKIE_NAME1}=${COOKIE_VALUE1}`;
    });
  });

  it("Verify for Privathaftpflicht calculator with Single ohne Kinder category minimun 5 tariffs are displayed", () => {
    cy.visit("www.verivox.de");
    //  cy.contains('Alles Akzeptieren').focus().click()
    // cy.get("#uc-btn-accept-banner").trigger('mouseover').wait(1000).click().click({force:true});

    // cy.get("a[ga-key='ga-key='0272d1e0']").click()

    // cy.window().then(() => {
    //     // win is the remote window
    //     cy.get('#uc-btn-accept-banner').click({ force: true })
    //   })
    //   cy.intercept('POST', 'https://consent-api.service.consent.usercentrics.eu/consent/uw/1').as('api')
    //   cy.wait("@api").then(({ response }) => {
    //     expect(response.statusCode).to.eq(201);
    //   });
    //Assertion
    // cy.contains("Cookie-Einstellungen").should("be.visible");
    cy.get("button.gdpr-button.gdpr-settings-button.first-layer").should(
      "be.visible"
    );
    cy.get("button.gdpr-button.gdpr-settings-button.first-layer").click({
      force: true,
    });
    cy.get("#uc-btn-accept-banner").click({ force: true });
    //cy.contains("Cookie-Einstellungen").should("be.visible");
    //cy.get("a[ga-key='a0e709bb']").select("a[ga-key='bc76676b']").click();
  });
});
