export class SessionInformationsPage {
  url = '/sessions/detail/0'

  elements = {
    sessionNameH1 : () => cy.get('mat-card mat-card-title h1'),
    teacherName : () => cy.get('mat-card mat-card-subtitle span'),
    deleteBtn : () => cy.get('mat-card mat-card-title div div:nth-child(2) button span').contains('Delete'),
  }

  visit(): void {
    cy.visit(this.url);
  }

  titleCase(str :string) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }
}
