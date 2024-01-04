import { SessionsPage } from '../pages/sessions.page';
import { LoginPage } from '../pages/login.page';

describe('Sessions spec', () => {
  let sessionsPage: SessionsPage;
  let loginPage : LoginPage;

  beforeEach(() => {
    sessionsPage = new SessionsPage();
    sessionsPage.visit();
    loginPage = new LoginPage();
  });

  describe('As user', () => {
    beforeEach(() => {
      loginPage.logIn(loginPage.fixtures.userData.username, 'text!123');
    });

    it('Show sessions list', () => {

      // Test sessions list
      sessionsPage.elements.matCardItems()
        .should(`have.length`, sessionsPage.fixtures.sessionsData.length)
        .each((item, index) => {
          expect(item.find('mat-card-title')).to.contain(sessionsPage.fixtures.sessionsData[index].name);
          expect(item.find('mat-card-content p')).to.contain(sessionsPage.fixtures.sessionsData[index].description);
          expect(item.find('mat-card-actions button:nth-child(1) span.ml1')).to.contain('Detail');
        })
    })
  });


  describe('As admin', () => {
    beforeEach(() => {
      loginPage.logIn(loginPage.fixtures.adminData.username, 'text!123');
    });

    it('Show Create and Edit buttons', () => {

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
