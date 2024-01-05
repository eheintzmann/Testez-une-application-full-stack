export class LoginPage {
  url: string = '/login';

  elements = {
    emailInput: () => cy.get('input[formControlName="email"]'),
    passwordInput: () => cy.get('input[formControlName="password"]'),
    submitBtn: () => cy.get(`button[type="submit"]`),
    errorMessage: () => cy.get('p.error')
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
