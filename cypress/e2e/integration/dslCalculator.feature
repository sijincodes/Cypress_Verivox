Feature: Verivox user, uses the Privathaftpflicht calculator and tariff search pages

  Background: 
    Given   I can open "www.verivox.de"
  Scenario: Verify the DSL calculator
    When    I navigate to "Versicherungen" and select "Privathaftpflicht"
    And     I enter my age "18" and "Single ohne Kinder"
    Then    I should go to the Privathaftpflicht personal information page
    And     I enter my birthdate "4" 
    And     I enter my zip code "13088"
    And     I click the "Jetzt vergleichen" button
    Then    I should see a page that lists the available tariffs for my selection with minimum 5 tariffs displayed 
  Scenario: Validate the multiple tariff Result List page are loaded
    When    I use tariff calculation criteria with "Privathaftpflicht" calculator
    And     I display the tariff Result List page
    Then    I should see the total number of available tariffs listed above all the result list
    When    I scroll to the end of the result list page
    Then    I should see only the first 20 tariffs displayed
    When    I click on the button labeled "20 Weitere Tarife Laden"
    Then    I should see the next 20 tariffs displayed
    And     I click on button labeled "Alle Tarife laden" to load any additional tariffs until all tariffs have been displayed
    Then    I should not be able to see the button labeled "20 Weitere Tarife Laden"
  Scenario: Verify offer details for a selected tariff
    When    I use tariff calculation criteria with "Privathaftpflicht" calculator
    And     I display the tariff Result List page   
    Then    I should see the tariff price of the first tariff
    When    I click on the button labeled "TarifDetails"
    Then    I should see tariff details sections: "Weitere Leistungen", "Allgemein","Tätigkeiten und Hobbys","Miete & Immobilien" and "Dokumente"
    And     I should see the "ZUM ONLINE-ANTRAG" button
     
