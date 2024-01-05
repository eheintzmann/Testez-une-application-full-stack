import { RegisterPage } from '../pages/register.page';

describe('Register spec', () => {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
    page.visit();
  })


  it('Register successful', () => {
    page.signUp(
      page.fixtures.userData.firstName,
      page.fixtures.userData.lastName,
      page.fixtures.userData.username,
      'test!123'
    )
    cy.wait('@register');

    cy.url().should('include', '/login')
  })
})
