export class AccountPage {

  elements = {
    nameField : () => cy.get('mat-card mat-card-content div:first-child>p:first-child'),
    emailField : () => cy.get('mat-card mat-card-content div:first-child>p:nth-child(2)')
  }

  fixtures: {
    userData: any,
    sessionsData: any
  } = {
    userData: undefined,
    sessionsData: undefined
  }

  constructor() {
    cy.fixture('user').then((data: any): void => {
      this.fixtures.userData = data;
      cy.intercept({
          method: `GET`,
          url: `/api/user/1`
        }, (req): void => req.reply(this.fixtures.userData)
      ).as('user1');
    });


    cy.fixture('sessions').then((data: any): void => {
      this.fixtures.sessionsData = data;

      cy.intercept({
          method: `GET`,
          url: `/api/session`
        }, (req): void => req.reply(this.fixtures.sessionsData)
      ).as('sessions');
    });
  }
}
