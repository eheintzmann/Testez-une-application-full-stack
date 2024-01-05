import { SessionsPage } from '../pages/sessions.page';
import { LoginPage } from '../pages/login.page';
import { SessionInformationsPage } from "../pages/session-info.page";

describe('Session Informations spec', () => {
  let sessionInfoPage: SessionInformationsPage;
  let loginPage : LoginPage;
  let sessionsPage: SessionsPage;

  beforeEach(() : void => {
    sessionInfoPage = new SessionInformationsPage();
    loginPage = new LoginPage();
    sessionsPage = new SessionsPage();
    sessionInfoPage.visit();
  });

  describe('As user', (): void => {
    beforeEach(() => {
      loginPage.logIn(loginPage.fixtures.userData.username, 'text!123');
      cy.wait('@login');
      cy.wait('@sessions');
      sessionsPage.elements.detailBtns().first().click();
      cy.wait('@session0');
      cy.wait('@teacher0');
    });

    it('Show first session details', () : void => {

      // Test sessions list
      sessionInfoPage.elements.sessionNameH1()
        .should(`contain.text`, sessionInfoPage.titleCase(sessionInfoPage.fixtures.sessionsData[0].name));
      sessionInfoPage.elements.teacherName()
        .should('contain.text', sessionInfoPage.fixtures.teacherData[0].firstName)
        .should('contain.text', sessionInfoPage.fixtures.teacherData[0].lastName.toUpperCase())
    })
  });


  describe('As admin', () => {
    beforeEach(() => {
      loginPage.logIn(loginPage.fixtures.adminData.username, 'text!123');
      sessionsPage.elements.detailBtns().first().click();
      cy.wait('@session0');
      cy.wait('@teacher0');
    });

    it('Show Delete button', () => {

      // Test Create button
      sessionInfoPage.elements.deleteBtn()
        .should('be.visible')
        .should('contain.text', 'Delete')

    });
  });
})
