export class RegisterPage {
  url: string = '/register';

  elements = {
    firstNameInput: () => cy.get('input[formControlName="firstName"]'),
    lastNameInput: () => cy.get('input[formControlName="lastName"]'),
    emailInput: () => cy.get('input[formControlName="email"]'),
    passwordInput: () => cy.get('input[formControlName="password"]'),
    submitBtn: () => cy.get(`button[type="submit"]`),
    errorMessage: () => cy.get('span.error')
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
