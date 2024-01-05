export class LogoutPage {
  fixtures: { sessionsData: any } = {sessionsData: undefined}

  constructor() {
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
