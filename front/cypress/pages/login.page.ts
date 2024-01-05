export class LoginPage {
  url: string = '/login';

  fixtures : {
    userData: any,
    adminData: any
  } = {
    userData: undefined,
    adminData: undefined
  };

  elements = {
    emailInput: () => cy.get('input[formControlName="email"]'),
    passwordInput: () => cy.get('input[formControlName="password"]'),
    submitBtn: () => cy.get(`button[type="submit"]`),
    errorMessage: () => cy.get('p.error')
  }


  constructor() {
    cy.fixture('user').then((data: any) : void => {
      this.fixtures.userData = data;

      cy.fixture('admin').then((data: any) : void => {
        this.fixtures.adminData = data;

        cy.intercept({method: 'POST', url: '/api/auth/login'}, (req) : void => {
          if (req.body.email === this.fixtures.userData.email) {
            req.reply(this.fixtures.userData);
          } else if (req.body.email === this.fixtures.adminData.email) {
            req.reply(this.fixtures.adminData);
          } else {
            req.reply({ statusCode: 403 });
          }
        }).as('login');
      });
    });
  }

  logIn(email: string, password: string) {
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
