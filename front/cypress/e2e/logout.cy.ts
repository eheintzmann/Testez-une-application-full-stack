import { LoginPage } from '../pages/login.page';
import { headerBar } from "../pages/header.bar";
import { DataFixtures } from "../fixtures/data.fixtures";

describe('Logout spec', () : void => {
  let loginPage: LoginPage;
  let fixtures; DataFixtures;

  beforeEach(() => {
    fixtures = new DataFixtures();
    loginPage = new LoginPage();
  });

  describe('As user', ()  : void=> {
    beforeEach(() => {
      loginPage.visit();
      loginPage.logIn(fixtures.userData.email, fixtures.userData.password);
      cy.wait('@postLogin');
    });

    it('Logout successful', () : void => {
      cy.url().should('include', '/sessions')
      cy.wait('@getSession');
      headerBar.logoutLnk().click();
      cy.url().should('include', '/').should('not.include', '/sessions');
    })
  });
})
