import { SessionsPage } from '../pages/sessions.page';
import { LoginPage } from '../pages/login.page';
import { SessionInformationsPage } from "../pages/session-info.page";
import { DataFixtures } from "../fixtures/data.fixtures";

describe('Session Removal spec', () : void => {
  let sessionInfoPage: SessionInformationsPage;
  let loginPage : LoginPage;
  let sessionsPage: SessionsPage;
  let fixtures: DataFixtures;

  beforeEach(() : void => {
    fixtures= new DataFixtures();
    sessionInfoPage = new SessionInformationsPage();
    loginPage = new LoginPage();
    sessionsPage = new SessionsPage();
    sessionInfoPage.visit();
  });

  describe('As admin', () : void => {
    beforeEach(() => {
      loginPage.logIn(fixtures.adminData.email, fixtures.adminData.password);
      cy.wait('@postLogin');
      cy.wait('@getSession');
      sessionsPage.elements.detailBtns().first().click();
      cy.wait('@getSession0');
      cy.wait('@getTeacher0');
    });

    it('Delete session', () : void => {
      const originalSessionsLength: number = fixtures.sessionsData.length;

      sessionInfoPage.elements.deleteBtn().click();
      cy.wait('@deleteSession0');

      sessionsPage.elements.matCardItems()
        .should('have.length', originalSessionsLength - 1);
    });
  });
})
