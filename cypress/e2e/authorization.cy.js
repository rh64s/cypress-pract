describe('authorization', () => {
    // it('authorization can login', () => {
    //     cy.fixture('authorization/authorization.json').as('data');
    //     cy.visit('https://dev.profteam.su/login');
    //     cy.wait(500);
    //
    //     // 1 part of form
    //     cy.get('.form__buttons > :nth-child(3) > button').should('be.disabled', true);
    //
    //     cy.get("@data").then((data) => {
    //         cy.get('.form-input--text').type(data.login);
    //         cy.get('.form-input--password').type(data.password);
    //     })
    //
    //     cy.get('.form__buttons > :nth-child(3) > button').click();
    // });
    //
    // it('authorization wrong login', () => {
    //     cy.fixture('authorization/authorizationWrong.json').as('data');
    //     cy.visit('https://dev.profteam.su/login');
    //     cy.wait(500);
    //
    //     cy.get("@data").then((data) => {
    //         cy.get('.form-input--text').type(data.login);
    //         cy.get('.form-input--password').type(data.password);
    //     });
    //
    //     cy.get('.form__buttons > :nth-child(3) > button').click();
    //
    //     cy.contains('.form-error > span', 'Неверный логин или пароль, попробуйте заново.').should('exist')
    // });
    it('authorization SPO', () => {
        cy.fixture('authorization/authorizationSPO.json').as('data');
        cy.visit('https://dev.profteam.su/login');
        cy.get('.button-login__network-city-desktop').click();
        cy.wait(100);
        cy.get('.desktop-modal__content > .form > .form__buttons > .login-form__button > button').should('be.disabled', true);
        cy.get("@data").then((data) => {
            cy.get('.desktop-modal__content > .form > :nth-child(1) > .form__labels > :nth-child(1) > .form-control--medium > .form-input--text').type(data.login) // login
            cy.get('.desktop-modal__content > .form > :nth-child(1) > .form__labels > :nth-child(2) > .form-control--medium > .form-input--password').type(data.password) // pwd
            cy.get('.desktop-modal__content > .form > .form__buttons > .login-form__button > .button').click();
        })
        cy.wait(3000);
        cy.location('pathname').should('eq', '/account/main');
    })

    it('authorization SPO wrong', () => {
        cy.fixture('authorization/authorization.json').as('data');
    })
});