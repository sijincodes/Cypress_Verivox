Feature: Privathaftpflicht calculator and its tariff search pages functionality
    I want to visit the Verivox site
    I want to use the Privathaftpflicht calculator and view its tariff search pages
    I want to select the best available tariff based on price

  Scenario: Verify the DSL calculator
    When    User navigates to 'Versicherungen' and selects 'Privathaftpflicht'
    Then    User enters the age '18' and 'Single ohne Kinder'
    Then    User should go to the Privathaftpflicht personal information page
    When    User enters the birthdate '4'
    When    User enters the zip code '13088'
    When    User clicks the 'Jetzt vergleichen' button
    Then    User should be navigated to  tariff result page with minimum 5 tariffs displayed
  Scenario: Validate the multiple tariff Result List page are loaded
    Given   User is on the  'Privathaftpflicht' tariff Result List page
    Then    User should see the total number of available tariffs listed above all the result list
    Then    User should see only the first 20 tariffs displayed on the screen
    When    User clicks on the button labeled '20 Weitere Tarife Laden'
    Then    User should see also the next 20 tariffs displayed
    When    User clicks on button labeled 'Alle Tarife laden' to load any additional tariffs until all tariffs have been displayed
    Then    User should not be able to see the button labeled '20 Weitere Tarife Laden'
  Scenario: Verify offer details for a selected tariff
   Given    User is at the 'Privathaftpflicht' tariff Result List page  
    Then    User should see the tariff price of the first tariff
    When    User clicks on the button labeled 'TarifDetails'
    Then    User should see tariff details sections: 'Weitere Leistungen', 'Allgemein','Tätigkeiten und Hobbys','Miete & Immobilien' and 'Dokumente'
    Then    User should see the 'ZUM ONLINE-ANTRAG' button
    Then    User should be able to see two 'ZUM ONLINE-ANTRAN' buttons for the selected tarrif
   
     
