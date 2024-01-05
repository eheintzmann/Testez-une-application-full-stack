import { LoginPage } from '../pages/login.page';

describe('Login spec', () => {
  let page: LoginPage

  beforeEach(() => {
    page = new LoginPage();
    page.visit();
  })


  it('Login successful', () => {
    page.logIn(page.fixtures.userData.username, 'test!123')
    cy.wait('@login');

    cy.url().should('include', '/sessions')
  })


  it('Bad credentials', () : void => {
    page.logIn('bad@email.com', 'test!123');
    cy.wait('@login');

    page.elements.errorMessage().should('have.text', 'An error occurred');
  })
})
