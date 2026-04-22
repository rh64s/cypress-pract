describe('authorization', () => {
    it('authorization can login', () => {
        cy.fixture('authorization/authorization.json').as('data');
        cy.visit('https://dev.profteam.su/login');
        cy.wait(500);

        // 1 part of form
        cy.get('.form__buttons > :nth-child(3) > button').should('be.disabled', true);

        cy.get("@data").then((data) => {
            cy.get('.form-input--text').type(data.login);
            cy.get('.form-input--password').type(data.password);
        })

        cy.get('.form__buttons > :nth-child(3) > button').click();
    });

    it('authorization wrong login', () => {
        cy.fixture('authorization/authorizationWrong.json').as('data');
        cy.visit('https://dev.profteam.su/login');
        cy.wait(500);

        cy.get("@data").then((data) => {
            cy.get('.form-input--text').type(data.login);
            cy.get('.form-input--password').type(data.password);
        });

        cy.get('.form__buttons > :nth-child(3) > button').click();

        cy.contains('.form-error > span', 'Неверный логин или пароль, попробуйте заново.').should('exist')
    });
});