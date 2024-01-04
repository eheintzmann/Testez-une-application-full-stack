export class RegisterPage {
  url: string = '/register';

  fixtures : {
    userData: any,
    adminData: any
  } = {
    userData: undefined,
    adminData: undefined
  };

  elements = {
    firstNameInput: () => cy.get('input[formControlName="firstName"]'),
    lastNameInput: () => cy.get('input[formControlName="lastName"]'),
    emailInput: () => cy.get('input[formControlName="email"]'),
    passwordInput: () => cy.get('input[formControlName="password"]'),
    submitBtn: () => cy.get(`button[type="submit"]`),
    errorMessage: () => cy.get('span.error')
  }


  constructor() {
    cy.fixture('user').then((data: any) : void => {
      this.fixtures.userData = data;
    });

    cy.fixture('admin').then((data: any) : void => {
      this.fixtures.adminData = data;
    });

    cy.intercept({method: 'POST', url: '/api/auth/register'}, (req) : void => {
      if (req.body.email === this.fixtures.userData.username) {
        req.reply(this.fixtures.userData);
      } else if (req.body.email === this.fixtures.adminData.username) {
        req.reply(this.fixtures.adminData);
      } else {
        req.reply({ statusCode: 403 });
      }
    })
  }

  signUp(firstName: string, lastName: string, email: string, password: string) {

    this.elements.firstNameInput().clear();
    this.elements.firstNameInput().type(firstName)

    this.elements.lastNameInput().clear();
    this.elements.lastNameInput().type(lastName)

    this.elements.emailInput().clear();
    this.elements.emailInput().type(email);

    this.elements.passwordInput().clear();
    this.elements.passwordInput().type(password);

    this.elements.submitBtn().click();
  }

  visit() : void {
    cy.visit(this.url);
  }
}
