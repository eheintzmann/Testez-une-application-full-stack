import { RegisterPage } from '../pages/register.page';

describe('Register spec', () : void => {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
    page.visit();
  })


  it('Register successful', () : void => {
    page.signUp(
      page.fixtures.userData.firstName,
      page.fixtures.userData.lastName,
      'new.user@test.com',
      'password'
    )
    cy.wait('@register');

    cy.url().should('include', '/login')
  })
})
