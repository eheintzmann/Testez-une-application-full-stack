import { SessionsPage } from '../pages/sessions.page';
import { LoginPage } from '../pages/login.page';
import { SessionCreationPage } from "../pages/session-creation.page";
import { DataFixtures } from "../fixtures/data.fixtures";

describe('Session Creation spec', () : void => {
  let loginPage: LoginPage;
  let sessionsPage: SessionsPage;
  let sessionCreationPage: SessionCreationPage;
  let fixtures: DataFixtures;
  const createdSession = {
    name: 'Created session',
    date: '2001-01-01',
    description: 'Created description'
  }

  beforeEach((): void => {
    fixtures = new DataFixtures();
    loginPage = new LoginPage();
    sessionsPage = new SessionsPage();
    sessionCreationPage = new SessionCreationPage();
  });

  describe('As admin', (): void => {


    it('Create new session', (): void => {
      sessionsPage.visit();

      loginPage.logIn(fixtures.adminData.email, fixtures.adminData.password);
      cy.wait('@postLogin')
      cy.wait('@getSession')
      const originalSessionsLength: number = fixtures.sessionsData.length;

      sessionsPage.elements.createBtn().click();
      cy.wait('@getTeacher');

      // Test Create button
      sessionCreationPage.createSession(
        createdSession.name,
        createdSession.date,
        createdSession.description
      );
      cy.wait('@postSession')
      cy.wait('@getSession')

      sessionsPage.elements.matCardItems()
        .should(`have.length`, originalSessionsLength + 1)
        .last().as('newSession')
      cy.get('@newSession').find('mat-card-title').should('contain.text', createdSession.name)
      cy.get('@newSession').find('mat-card-content p').should('contain.text', createdSession.description);
    });
  });
})
