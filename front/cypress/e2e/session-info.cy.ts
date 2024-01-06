import { SessionsPage } from '../pages/sessions.page';
import { LoginPage } from '../pages/login.page';
import { SessionInformationsPage } from "../pages/session-info.page";
import { DataFixtures } from "../fixtures/data.fixtures";

describe('Session Information spec', () : void => {
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

  describe('As user', (): void => {
    beforeEach(() => {
      loginPage.logIn(fixtures.userData.email, fixtures.userData.password);
      cy.wait('@postLogin');
      cy.wait('@getSession');
      sessionsPage.elements.detailBtns().first().click();
      cy.wait('@getSession0');
      cy.wait('@getTeacher0');
    });

    it('Show first session details', () : void => {

      // Test sessions list
      sessionInfoPage.elements.sessionNameH1()
        .should(`contain.text`, sessionInfoPage.titleCase(fixtures.sessionsData[0].name));
      sessionInfoPage.elements.teacherName()
        .should('contain.text', fixtures.teachersData[0].firstName)
        .should('contain.text', fixtures.teachersData[0].lastName.toUpperCase())
    })
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

    it('Show Delete button', () : void => {

      // Test Create button
      sessionInfoPage.elements.deleteBtn()
        .should('be.visible')
        .should('contain.text', 'Delete')

    });
  });
})
