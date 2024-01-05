import { RegisterPage } from '../pages/register.page';
import { DataFixtures } from "../fixtures/data.fixtures";

describe('Register spec', () : void => {
  let page: RegisterPage;
  let fixtures: DataFixtures;

  beforeEach(() => {
    fixtures = new DataFixtures();
    page = new RegisterPage();
    page.visit();
  })


  it('Register successful', () : void => {
    page.signUp(
      fixtures.userData.firstName,
      fixtures.userData.lastName,
      'new.user@test.com',
      'password'
    )
    cy.wait('@postRegister');

    cy.url().should('include', '/login')
  })
})
