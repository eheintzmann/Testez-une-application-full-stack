import { SessionsPage } from '../pages/sessions.page';
import { LoginPage } from '../pages/login.page';
import { DataFixtures } from "../fixtures/data.fixtures";

describe('Sessions spec', () => {
  let sessionsPage: SessionsPage;
  let loginPage : LoginPage;
  let fixtures: DataFixtures;

  beforeEach(() :void => {
    fixtures = new DataFixtures();
    sessionsPage = new SessionsPage();
    loginPage = new LoginPage();
    sessionsPage.visit();
  });

  describe('As user', (): void => {
    beforeEach(() => {
      loginPage.logIn(fixtures.userData.email, fixtures.userData.password);
      cy.wait('@postLogin');
      cy.wait('@getSession');

    });

    it('Show sessions list', () : void => {

      // Test sessions list
      sessionsPage.elements.matCardItems()
        .should(`have.length`, fixtures.sessionsData.length)
        .each((item, index): void => {
          expect(item.find('mat-card-title')).to.contain(fixtures.sessionsData[index].name);
          expect(item.find('mat-card-content p')).to.contain(fixtures.sessionsData[index].description);
          expect(item.find('mat-card-actions button:nth-child(1) span.ml1')).to.contain('Detail');
        })
    })
  });


  describe('As admin', () : void => {
    beforeEach(() => {
      loginPage.logIn(fixtures.adminData.email, fixtures.adminData.password);
      cy.wait('@postLogin');
      cy.wait('@getSession');
    });

    it('Show Create and Edit buttons', () : void => {

      // Test Create button
      sessionsPage.elements.createBtn().should('have.text', 'Create')

      // Test Edit buttons
      sessionsPage.elements.matCardItems()
        .should('have.length', fixtures.sessionsData.length)
        .each((item) => {
          expect(item.find('mat-card-actions button:nth-child(2) span.ml1')).to.contain('Edit')
        })
    });
  });
})
