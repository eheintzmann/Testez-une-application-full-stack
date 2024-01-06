import { RegisterPage } from '../pages/register.page';
import { DataFixtures } from "../fixtures/data.fixtures";
import { LoginPage } from "../pages/login.page";

describe('Register spec', () : void => {
  let registerPage: RegisterPage;
  let loginPage: LoginPage;
  let fixtures: DataFixtures;
  const newUser = {
    firstName: "James",
    lastName: "Doe",
    email: "james.doe@test.com",
    password: "azerty"
  }

  beforeEach(() => {
    fixtures = new DataFixtures();
    loginPage = new LoginPage();
    registerPage = new RegisterPage();
    registerPage.visit();
  })


  it('Register successful', () : void => {
    registerPage.signUp(
      newUser.firstName,
      newUser.lastName,
      newUser.email,
      newUser.password
    )
    cy.wait('@postRegister');

    cy.url().should('include', '/login');
    loginPage.logIn(newUser.email, newUser.password);
    cy.wait('@postLogin');

    cy.url().should('include', '/sessions');
  })
})
