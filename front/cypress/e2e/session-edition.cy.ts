import { SessionsPage } from '../pages/sessions.page';
import { LoginPage } from '../pages/login.page';
import { SessionCreationPage } from "../pages/session-creation.page";
import { SessionEditionPage } from "../pages/session-edition.page";
import { DataFixtures } from "../fixtures/data.fixtures";

describe('Session Edition spec', () : void => {
  let loginPage: LoginPage;
  let sessionsPage: SessionsPage;
  let sessionEditionPage: SessionEditionPage;
  let fixtures : DataFixtures;
  const editedSession = {
    name: 'Edited session',
    date: '2011-01-01',
    description: 'Edited description'
  }

  beforeEach((): void => {
    fixtures = new DataFixtures();
    loginPage = new LoginPage();
    sessionsPage = new SessionsPage();
    sessionEditionPage = new SessionEditionPage();
  });

  describe('As admin', (): void => {


    it('create new session', () : void => {
      sessionsPage.visit();

      loginPage.logIn(fixtures.adminData.email, fixtures.adminData.password);
      cy.wait('@postLogin')
      cy.wait('@getSession')

      sessionsPage.elements.editBtns().first().click();
      cy.wait('@getSession0')
      cy.wait('@getTeacher');

      // Test Create button
      sessionEditionPage.editSession(
        editedSession.name,
        editedSession.date,
        editedSession.description
      );
      cy.wait('@putSession0')
      cy.wait('@getSession')

      sessionsPage.elements.matCardItems()
        .should(`have.length`, fixtures.sessionsData.length)
        .first().as('editedSession')
      cy.get('@editedSession').find('mat-card-title').should('contain.text', editedSession.name)
      cy.get('@editedSession').find('mat-card-content p').should('contain.text', editedSession.description);
    });
  });
})
