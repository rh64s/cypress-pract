export default class FastMethods {
    static login(path = 'registration/correctInputForTest.json') {
        cy.fixture(path).as('data');
        cy.visit('https://dev.profteam.su/login');
        cy.wait(3000);

        // 1 part of form
        cy.get('.form__buttons > :nth-child(3) > button').should('be.disabled', true);

        cy.get("@data").then((data) => {
            cy.get('.form-input--text').type(data.login);
            cy.get('.form-input--password').type(data.password);
        })
        cy.get('.form__buttons > :nth-child(3) > button').click();
        cy.wait(3000);
    }

    static deleteRequest(target = '.buttons > .button') {
        cy.visit('https://dev.profteam.su/account/requests');
        cy.wait(2000);

        cy.get(target).click();
        cy.wait(600);
    }
}