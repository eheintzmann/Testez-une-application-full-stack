export class SessionsPage {
  url = '/sessions'

  elements = {
    matCardItems: () => cy.get('mat-card.item'),
    createBtn: () => cy.get('div.list mat-card mat-card-header button span.ml1'),
    detailBtns : () => cy.get('mat-card.item mat-card-actions button:nth-child(1)'),
    editBtns : () => cy.get('mat-card.item mat-card-actions button:nth-child(2)')

  }

  visit(): void {
    cy.visit(this.url);
  }
}
