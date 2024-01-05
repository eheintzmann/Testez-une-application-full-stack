import { SessionsPage } from '../pages/sessions.page';
import { LoginPage } from '../pages/login.page';
import { SessionCreationPage } from "../pages/session-creation.page";

describe('Session Creation spec', () : void => {
  let loginPage: LoginPage;
  let sessionsPage: SessionsPage;
  let sessionCreationPage: SessionCreationPage;
  const createdSession = {
    name: 'Created session',
    date: '2001-01-01',
    description: 'Created description'
  }

  beforeEach((): void => {
    loginPage = new LoginPage();
    sessionsPage = new SessionsPage();
    sessionCreationPage = new SessionCreationPage();
  });

  describe('as admin', (): void => {


    it('create new session', (): void => {
      sessionsPage.visit();

      loginPage.logIn(loginPage.fixtures.adminData.username, 'text!123');
      cy.wait('@login')
      cy.wait('@sessions')

      sessionsPage.elements.createBtn().click();
      cy.wait('@teachers');

      // Test Create button
      sessionCreationPage.createSession(
        createdSession.name,
        createdSession.date,
        createdSession.description
      );
      cy.wait('@post-sessions')
      cy.wait('@sessions')

      sessionsPage.elements.matCardItems()
        .should(`have.length`, sessionsPage.fixtures.sessionsData.length + 1)
        .last().as('newSession')
      cy.get('@newSession').find('mat-card-title').should('contain.text', createdSession.name)
      cy.get('@newSession').find('mat-card-content p').should('contain.text', createdSession.description);
    });
  });
})
