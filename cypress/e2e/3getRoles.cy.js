describe('start to be student', () => {
    it('authorization can login', () => {
        cy.fixture('registration/correctInputForTest.json').as('data');
        cy.visit('https://dev.profteam.su/login');
        // cy.wait(30000);

        // 1 part of form
        cy.get('.form__buttons > :nth-child(3) > button').should('be.disabled', true);

        cy.get("@data").then((data) => {
            cy.get('.form-input--text').type(data.login);
            cy.get('.form-input--password').type(data.password);
        })

        cy.get('.form__buttons > :nth-child(3) > button').click();

        cy.wait(500);

        // cy.get()
        cy.get('.page-nav__role-block > .button').click();
        cy.get('.select-role-form > :nth-child(3)').click({ force: true });
        cy.wait(100);

    });
})