export class SessionEditionPage {
  url : string = '/sessions/update/0'

  elements = {
    nameInput : () => cy.get('input[formControlName="name"]'),
    dateInput : () => cy.get('input[formControlName="date"]'),
    teacherIdSelect : () => cy.get('mat-select[formControlName="teacher_id"]'),
    teacherOptions : () => cy.get('mat-option'),
    descriptionTextArea : () => cy.get('textarea[formControlName="description"]'),
    submitBtn : () => cy.get('button[type="submit"]')
  }

  fixtures : {
    teachersData : any,
    sessionsData : any
  } = {
    teachersData : undefined,
    sessionsData: undefined
  }

  constructor() {
    cy.fixture('teachers').then((data: any): void => {
      this.fixtures.teachersData = data;

      cy.intercept({
          method: 'GET',
          url: `/api/teacher`
        }, (req): void => req.reply(this.fixtures.teachersData)
      ).as('teachers');
    });

    cy.fixture('sessions').then((data: any) : void => {
      this.fixtures.sessionsData = data;

      cy.intercept({
          method: 'GET',
          url: '/api/session/0'
        }, (req) : void  => req.reply(this.fixtures.sessionsData[0])
      ).as('session0');
    });
  }

  createSession(name : string, date : string, description : string): void {
     this.elements.nameInput().clear();
    this.elements.nameInput().type(name);

    this.elements.dateInput().clear();
    this.elements.dateInput().type(date);

    this.elements.teacherIdSelect().click().then( () : void => {
      this.elements.teacherOptions().first().click();
    });

    this.elements.descriptionTextArea().clear();
    this.elements.descriptionTextArea().type(description);

    this.elements.submitBtn().click();
  }

  visit(): void {
    cy.visit(this.url);
  }
}
