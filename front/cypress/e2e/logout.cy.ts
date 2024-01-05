import { LoginPage } from '../pages/login.page';
import { headerBar } from "../pages/header.bar";
import { LogoutPage } from "../pages/logout.page";

describe('Logout spec', () : void => {
  let loginPage: LoginPage;
  let logoutPage: LogoutPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    logoutPage = new LogoutPage();
  });

  describe('as user', ()  : void=> {
    beforeEach(() => {
      loginPage.visit();
      loginPage.logIn(loginPage.fixtures.userData.username, 'test!123');
      cy.wait('@login');
    });

    it('Logout successful', () : void => {
      cy.url().should('include', '/sessions')
      cy.wait('@sessions');
      headerBar.logoutLnk().click();
      cy.url().should('include', '/').should('not.include', '/sessions');
    })
  });
})
