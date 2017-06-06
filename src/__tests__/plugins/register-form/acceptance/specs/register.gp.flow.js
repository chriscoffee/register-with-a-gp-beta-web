const ContentPage = require('../pageobjects/content.page');

describe('a content page', () => {
  it('should contain a local header', () => {
    ContentPage.open();
    ContentPage.header.isVisible().should.be.true;
  });

  it('should contain a heading level 1', () => {
    ContentPage.open();
    ContentPage.h1.isVisible().should.be.true;
  });

  it('Test all gp registration flow', () => {
    $('#practice-list a').click();
    $('a=Start').click();

    /*Do you know your NHS number?*/
    $('label=No').click();
    ContentPage.nextStep();

    /*What is your sex?*/
    $('label=Male').click();
    ContentPage.nextStep();

    /*What is your name?*/
    browser.setValue('#input-firstName', 'David');
    browser.setValue('#input-middleNames', 'William');
    browser.setValue('#input-lastName', 'Charles');
    ContentPage.nextStep();

    /*What is your date of birth?*/
    browser.setValue('#input-day', '01');
    browser.setValue('#input-month', '12');
    browser.setValue('#input-year', '1976');
    ContentPage.nextStep();

    /*What is your address?*/
    browser.setValue('#input-postcode', 'SW1A1AA');
    ContentPage.nextStep();
    /*Select your address*/
    ContentPage.nextStep();

    /*How can the GP contact you?*/
    browser.setValue('#input-bestPhone', '07779998833');
    browser.setValue('#input-email', 'test@test.com');
    ContentPage.nextStep();

    /*Have you served in the armed forces?*/
    $('label=No').click();
    ContentPage.nextStep();

    /*Are you already registered with a GP?*/
    $('label=No').click();
    ContentPage.nextStep();

    /*Are you taking any medication?*/
    $('label=No').click();
    ContentPage.nextStep();

    /*Do you have any allergies?*/
    $('label=No').click();
    ContentPage.nextStep();

    /*Have you ever had any of these conditions?*/
    $('label=Asthma').click();
    $('label=Cancer').click();
    $('label=Diabetes').click();
    ContentPage.nextStep();

    /*Check your details*/
    $('#sendBtn').click();
    browser.pause(1000);

  });
});
