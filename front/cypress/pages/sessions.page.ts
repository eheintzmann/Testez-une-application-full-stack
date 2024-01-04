export class SessionsPage {
  url = '/sessions'

  elements = {
    matCardItems: () => cy.get('mat-card.item'),
    createBtn: () => cy.get('div.list mat-card mat-card-header button span.ml1')
  }

  fixtures : {
    sessionsData : any;
  } = {
    sessionsData: undefined
  }

  constructor() {
    cy.fixture('sessions').then((data: any) : void => {
      this.fixtures.sessionsData = data;
    });

    cy.intercept({
        method: 'GET',
        url: '/api/session'
      }, (req) : void  => req.reply(this.fixtures.sessionsData)
    );
  }

  visit(): void {
    cy.visit(this.url);
  }
}
