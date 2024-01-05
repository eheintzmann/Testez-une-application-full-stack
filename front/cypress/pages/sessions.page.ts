export class SessionsPage {
  url = '/sessions'

  elements = {
    matCardItems: () => cy.get('mat-card.item'),
    createBtn: () => cy.get('div.list mat-card mat-card-header button span.ml1'),
    detailBtns : () => cy.get('mat-card.item mat-card-actions button')
  }

  fixtures : { sessionsData : any  } = { sessionsData: undefined }

  constructor() {
    cy.fixture('sessions').then((data: any): void => {
      this.fixtures.sessionsData = data;

      cy.intercept({
          method: `GET`,
          url: `/api/session`
        }, (req): void => req.reply(this.fixtures.sessionsData)
      ).as('sessions');

      cy.intercept({
        method: 'POST',
        url: '/api/session'
      }, (req): void => {
        this.fixtures.sessionsData.push(req.body);
        req.reply({statusCode: 201});
      }).as('post-sessions');
    });
  }


  visit(): void {
    cy.visit(this.url);
  }
}
