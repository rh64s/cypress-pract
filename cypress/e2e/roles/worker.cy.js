import FastMethods from "../../../modules/fastmethods.js";

describe('worker', () => {
    it('send request role', () => {
        FastMethods.login('registration/correctInputForTest.json');
        cy.wait(500);

        // на самой странице

        /* добавить роль */
        cy.get('.page-nav__role-block > .button').click(); // кнопка "добваить роль"
        cy.get('.select-role-form > :nth-child(1)').click({ force: true })

        cy.wait(100);

        /* ввод информации для института */

        cy.get('.variants-company > :nth-child(1)').click(); // сущесвтующая
        cy.fixture('roles/worker/workerExistsValid.json').as('dataWorkerExistsValid');
        cy.get("@dataWorkerExistsValid").then((data) => {
            // ввод орги
            cy.get('div.search-input__field > .form-input--text').type(data.name)
            cy.wait(3500);
            cy.get('div.search-input > div.search-input__wrapper-result').click();
            cy.wait(100);
            cy.get('.choose-company > .button').click({ force: true });
        })
        cy.wait(100);

    });

    it('can delete query', () => {
        FastMethods.login('registration/correctInputForTest.json');
        cy.wait(1500);
        FastMethods.deleteRequest();

    });

    it('write wrong info in form to be student', () => {
        FastMethods.login('registration/correctInputForTest.json');
        cy.wait(500);

        // на самой странице

        /* добавить роль */
        cy.get('.page-nav__role-block > .button').click(); // кнопка "добваить роль"
        cy.get('.select-role-form > :nth-child(2)').click({ force: true }) // выбрать "студент";

        cy.wait(100);

        /* ввод информации для института */

        cy.get('.variants-company > :nth-child(1)').click(); // сущесвтующая
        cy.fixture('roles/worker/workerExistsNotValid.json').as('dataWorkerExistsNotValid');
        cy.get("@dataWorkerExistsNotValid").then((data) => {
            // ввод орги
            cy.get('div.search-input__field > .form-input--text').type(data.name)
            cy.wait(3500);
            cy.get('.choose-company > .button').should('be.disabled', true);
        })
    })
})