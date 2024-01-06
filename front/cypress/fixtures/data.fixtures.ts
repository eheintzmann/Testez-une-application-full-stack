export class DataFixtures {
  usersData: any[];
  userData: any;
  adminData: any;
  sessionsData: any[];
  teachersData : any[];


  constructor() {
    this.loadUsersFixtures();
    this.loadSessionsFixtures();
    this.loadTeachersFixtures();
  }

  loadUsersFixtures(): void {

    cy.fixture('users').then((users: any[]): void => {
      this.usersData = users;
      this.userData = users.find((user): boolean => user.admin === false);
      this.adminData = users.find((user): boolean => user.admin === true);

      cy.intercept({
          method: `GET`,
          url: `/api/user/${this.userData.id}`
        }, (req): void => req.reply(this.userData)
      ).as(`getUser${this.userData.id}`);

      cy.intercept({
          method: `GET`,
          url: `/api/user/${this.adminData.id}`
        }, (req): void => req.reply(this.adminData)
      ).as(`getUser${this.adminData.id}`);

      cy.intercept({method: 'POST', url: '/api/auth/login'}, (req): void => {
        req.reply(this.usersData.find((user): boolean => user.email === req.body.email) || {statusCode: 403});
      }).as('postLogin');

      cy.intercept({method: 'POST', url: '/api/auth/register'}, (req): void => {
          if (req.body.email === this.userData.email || req.body.email === this.adminData.email) {
            req.reply({statusCode: 400})
          } else {
            this.usersData.push(req.body);
            req.reply({statusCode: 201});
          }
        }
      ).as('postRegister');
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
        }, (req): void => req.reply(this.sessionsData[0])
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
        const index: number = this.sessionsData.findIndex((session): boolean => session.id === 0);
        if (index >= 0) {
          Object.assign(this.sessionsData[index], req.body);
          req.reply({statusCode: 200});
        } else {
          req.reply({statusCode: 404});
        }
      }).as('putSession0');

      cy.intercept({
        method: 'DELETE',
        url: '/api/session/0'
      }, (req): void => {
        const index: number = this.sessionsData.findIndex((session): boolean => session.id === 0);
        if (index >= 0) {
          this.sessionsData = this.sessionsData.splice(index, 1);
          req.reply({statusCode: 200});
        } else {
          req.reply({statusCode: 404});
        }
      }).as('deleteSession0');
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
        }, (req) : void  => {
        req.reply(this.teachersData.find((teacher) => teacher.id === 0) || {statusCode: 404})
        }
      ).as('getTeacher0');
    });
  }
}
