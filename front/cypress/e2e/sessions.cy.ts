import { SessionsPage } from '../pages/sessions.page';
import { LoginPage } from '../pages/login.page';

describe('Sessions spec', () => {
  let sessionsPage: SessionsPage;
  let loginPage : LoginPage;

  beforeEach(() :void => {
    sessionsPage = new SessionsPage();
    loginPage = new LoginPage();
    sessionsPage.visit();
  });

  describe('As user', (): void => {
    beforeEach(() => {
      loginPage.logIn(loginPage.fixtures.userData.email, loginPage.fixtures.userData.password);
      cy.wait('@login');
      cy.wait('@sessions');

    });

    it('Show sessions list', () : void => {

      // Test sessions list
      sessionsPage.elements.matCardItems()
        .should(`have.length`, sessionsPage.fixtures.sessionsData.length)
        .each((item, index): void => {
          expect(item.find('mat-card-title')).to.contain(sessionsPage.fixtures.sessionsData[index].name);
          expect(item.find('mat-card-content p')).to.contain(sessionsPage.fixtures.sessionsData[index].description);
          expect(item.find('mat-card-actions button:nth-child(1) span.ml1')).to.contain('Detail');
        })
    })
  });


  describe('As admin', () : void => {
    beforeEach(() => {
      loginPage.logIn(loginPage.fixtures.adminData.email, loginPage.fixtures.adminData.password);
      cy.wait('@login');
      cy.wait('@sessions');
    });

    it('Show Create and Edit buttons', () : void => {

      // Test Create button
      sessionsPage.elements.createBtn().should('have.text', 'Create')

      // Test Edit buttons
      sessionsPage.elements.matCardItems()
        .should('have.length', sessionsPage.fixtures.sessionsData.length)
        .each((item) => {
          expect(item.find('mat-card-actions button:nth-child(2) span.ml1')).to.contain('Edit')
        })
    });
  });
})
