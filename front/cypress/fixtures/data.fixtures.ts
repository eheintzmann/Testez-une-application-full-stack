export class DataFixtures {
  userData: any;
  adminData: any;
  sessionsData: any;
  teachersData : any;


  constructor() {
    this.loadUsersFixtures();
    this.loadSessionsFixtures();
    this.loadTeachersFixtures();
  }

  loadUsersFixtures(): void {

    cy.fixture('user').then((user: any): void => {
      this.userData = user;

      cy.intercept({
          method: `GET`,
          url: `/api/user/${this.userData.id}`
        }, (req): void => req.reply(this.userData)
      ).as('getUser1');

      cy.fixture('admin').then((admin: any): void => {
        this.adminData = admin;

        cy.intercept({method: 'POST', url: '/api/auth/login'}, (req): void => {
          if (req.body.email === this.userData.email) {
            req.reply(this.userData);
          } else if (req.body.email === this.adminData.email) {
            req.reply(this.adminData);
          } else {
            req.reply({statusCode: 403});
          }
        }).as('getLogin');

        cy.intercept({method: 'POST', url: '/api/auth/register'}, (req): void => req.reply({statusCode: 201})
        ).as('postRegister');
      });
    });
  }

  loadSessionsFixtures(): void {

    cy.fixture('sessions').then((sessions: any): void => {
      this.sessionsData = sessions;

      cy.intercept({
          method: `GET`,
          url: `/api/session`
        }, (req): void => req.reply(this.sessionsData)
      ).as('getSession');

      cy.intercept({
          method: 'GET',
          url: '/api/session/0'
        }, (req) : void  => req.reply(this.sessionsData[0])
      ).as('getSession0');

      cy.intercept({
        method: 'POST',
        url: '/api/session'
      }, (req): void => {
        this.sessionsData.push(req.body);
        req.reply({statusCode: 201});
      }).as('postSession');

      cy.intercept({
        method: 'PUT',
        url: '/api/session/0'
      }, (req): void => {
        Object.assign(this.sessionsData[0], req.body);
        req.reply({statusCode: 200});
      }).as('putSession0');
    });
  }

  loadTeachersFixtures() : void {
    cy.fixture('teachers').then((data: any) : void => {
      this.teachersData = data;

      cy.intercept({
          method: 'GET',
          url: `/api/teacher`
        }, (req): void => req.reply(this.teachersData)
      ).as('getTeacher');

      cy.intercept({
          method: 'GET',
          url: `/api/teacher/0`
        }, (req) : void  => req.reply(this.teachersData[0])
      ).as('getTeacher0');
    });
  }
}
