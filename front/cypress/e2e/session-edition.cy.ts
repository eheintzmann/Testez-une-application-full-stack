import { SessionsPage } from '../pages/sessions.page';
import { LoginPage } from '../pages/login.page';
import { SessionCreationPage } from "../pages/session-creation.page";
import { SessionEditionPage } from "../pages/session-edition.page";

describe('Session Edition spec', () : void => {
  let loginPage: LoginPage;
  let sessionsPage: SessionsPage;
  let sessionEditionPage: SessionEditionPage;
  const editedSession = {
    name: 'Edited session',
    date: '2011-01-01',
    description: 'Edited description'
  }

  beforeEach((): void => {
    loginPage = new LoginPage();
    sessionsPage = new SessionsPage();
    sessionEditionPage = new SessionEditionPage();
  });

  describe('As admin', (): void => {


    it('create new session', () : void => {
      sessionsPage.visit();

      loginPage.logIn(loginPage.fixtures.adminData.email, loginPage.fixtures.adminData.password);
      cy.wait('@login')
      cy.wait('@sessions')

      sessionsPage.elements.editBtns().first().click();
      cy.wait('@session0')
      cy.wait('@teachers');

      // Test Create button
      sessionEditionPage.createSession(
        editedSession.name,
        editedSession.date,
        editedSession.description
      );
      cy.wait('@put-sessions')
      cy.wait('@sessions')

      sessionsPage.elements.matCardItems()
        .should(`have.length`, sessionsPage.fixtures.sessionsData.length)
        .first().as('editedSession')
      cy.get('@editedSession').find('mat-card-title').should('contain.text', editedSession.name)
      cy.get('@editedSession').find('mat-card-content p').should('contain.text', editedSession.description);
    });
  });
})
