export const headerBar = {

    sessionsLnk: () => cy.get('mat-toolbar div span.link:first-child'),
    accountLnk: () => cy.get('mat-toolbar div span.link:nth-child(2)'),
    logoutLnk: () => cy.get('mat-toolbar div span.link:last-child')
}
