import { LoginPage } from '../pages/login.page';
import { DataFixtures } from "../fixtures/data.fixtures";

describe('Login spec', () => {
  let page: LoginPage
  let fixtures: DataFixtures;

  beforeEach(() => {
    fixtures = new DataFixtures();
    page = new LoginPage();
    page.visit();
  })


  it('Login successful', () : void => {
    page.logIn(fixtures.userData.email, fixtures.userData.password)
    cy.wait('@postLogin');

    cy.url().should('include', '/sessions')
  })


  it('Bad credentials', () : void => {
    page.logIn('bad@email.com', 'test!123');
    cy.wait('@postLogin');

    page.elements.errorMessage().should('have.text', 'An error occurred');
  })
})
