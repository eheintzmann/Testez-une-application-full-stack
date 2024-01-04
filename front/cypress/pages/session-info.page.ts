export class SessionInformationsPage {
  url = '/sessions/detail/0'

  elements = {
    sessionNameH1 : () => cy.get('mat-card mat-card-title h1'),
    teacherName : () => cy.get('mat-card mat-card-subtitle span'),
    deleteBtn : () => cy.get('mat-card mat-card-title div div:nth-child(2) button span'),
  }

  fixtures : {
    sessionsData : any;
    teacherData : any;
  } = {
    sessionsData: undefined,
    teacherData: undefined
  }

  constructor() {
    cy.fixture('sessions').then((data: any) : void => {
      this.fixtures.sessionsData = data;
    });

    cy.fixture('teacher').then((data: any) : void => {
      this.fixtures.teacherData = data;
    });

    cy.intercept({
        method: 'GET',
        url: '/api/session/0'
      }, (req) : void  => req.reply(this.fixtures.sessionsData[0])
    );

    cy.intercept({
        method: 'GET',
        url: `/api/teacher/0`
      }, (req) : void  => req.reply(this.fixtures.teacherData)
    );
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
