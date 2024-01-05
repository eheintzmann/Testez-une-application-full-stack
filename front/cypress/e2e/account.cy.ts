import { LoginPage } from '../pages/login.page';
import { headerBar } from "../pages/header.bar";
import { AccountPage } from "../pages/account.page";

describe('Logout spec', () : void => {
  let loginPage: LoginPage;
  let accountPage: AccountPage;

  beforeEach((): void => {
    loginPage = new LoginPage();
    accountPage = new AccountPage();
  });

  describe('As user', (): void => {
    beforeEach(() => {
      loginPage.visit();
      loginPage.logIn(loginPage.fixtures.userData.email, loginPage.fixtures.userData.password);
      cy.wait('@login');
    });

    it('Logout successful', (): void => {
      cy.url().should('include', '/sessions')
      cy.wait('@sessions');
      headerBar.accountLnk().click();
      cy.wait('@user1');
      cy.url().should('include', '/me');
      accountPage.elements.nameField()
        .should('contain.text', `${accountPage.fixtures.userData.firstName} ${accountPage.fixtures.userData.lastName.toUpperCase()}`);
      accountPage.elements.emailField()
        .should('contain.text', accountPage.fixtures.userData.email);
    });
  })
})
