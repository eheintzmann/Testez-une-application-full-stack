import { LoginPage } from '../pages/login.page';
import { headerBar } from "../pages/header.bar";
import { AccountPage } from "../pages/account.page";
import { DataFixtures } from "../fixtures/data.fixtures";

describe('Account spec', () : void => {
  let loginPage: LoginPage;
  let accountPage: AccountPage;
  let fixtures: DataFixtures;

  beforeEach((): void => {
    fixtures = new DataFixtures();
    loginPage = new LoginPage();
    accountPage = new AccountPage();
  });

  describe('As user', (): void => {
    beforeEach(() => {
      loginPage.visit();
      loginPage.logIn(fixtures.userData.email, fixtures.userData.password);
      cy.wait('@postLogin');
    });

    it('Show account', (): void => {
      cy.url().should('include', '/sessions')
      cy.wait('@getSession');
      headerBar.accountLnk().click();
      cy.wait(`@getUser${fixtures.userData.id}`);
      cy.url().should('include', '/me');
      accountPage.elements.nameField()
        .should('contain.text', `${fixtures.userData.firstName} ${fixtures.userData.lastName.toUpperCase()}`);
      accountPage.elements.emailField()
        .should('contain.text', fixtures.userData.email);
    });
  })
})
