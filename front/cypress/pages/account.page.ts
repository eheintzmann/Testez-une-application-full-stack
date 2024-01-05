export class AccountPage {

  elements = {
    nameField : () => cy.get('mat-card mat-card-content div:first-child>p:first-child'),
    emailField : () => cy.get('mat-card mat-card-content div:first-child>p:nth-child(2)')
  }
}
