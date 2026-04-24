import FastMethods from "../../../modules/fastmethods.js";

describe('institute', () => {
    it('send request role exists', () => {
        FastMethods.login('registration/correctInputForTest.json');

        // на самой странице
        /* добавить роль */
        cy.get('.page-nav__role-block > .button').click(); // кнопка "добваить роль"
        cy.get('.select-role-form > :nth-child(2)').click({ force: true }) // выбрать "студент";

        cy.wait(100);

        /* ввод информации для института */

        cy.get('.variants-company > :nth-child(1)').click(); // сущесвтующая
        cy.fixture('roles/institute/instituteExistsValid.json').as('dataInstituteExistsValid');
        cy.get("@dataInstituteExistsValid").then((data) => {
            // ввод орги
            cy.get('div.search-input__field > .form-input--text').type(data.name)
            cy.wait(3500);
            cy.get('div.search-input > div.search-input__wrapper-result').click();
            cy.wait(100);
            cy.get('.choose-company > .button').click({ force: true });
        })
        cy.wait(100);

    });

    it('admin get notification', () => {
        FastMethods.login('authorization/institut.json');

        cy.visit('https://dev.profteam.su/account/requests');
        cy.contains(':nth-child(1) > .responses-list-item__content-company > .responses-list-item__about > .responses-list-item__text > .responses-list-item__title', 'Прекраснов')
    })

    it('can delete query', () => {
        FastMethods.login('registration/correctInputForTest.json');

        cy.visit('https://dev.profteam.su/account/main');
        cy.wait(1500);
        FastMethods.deleteRequest();
    });

    it('send request role creating company', () => {
        FastMethods.login('registration/correctInputForTest.json');

        cy.visit('https://dev.profteam.su/account/main');
        cy.wait(500);

        // на самой странице

        /* добавить роль */
        cy.get('.page-nav__role-block > .button').click(); // кнопка "добваить роль"
        cy.get('.select-role-form > :nth-child(2)').click({ force: true })

        cy.wait(100);

        /* ввод информации для института */


        cy.get('.variants-company > :nth-child(2)').click(); // не сущесвтующая
        cy.fixture('roles/institute/instituteNewValid.json').as('dataInstituteNewValid');
        cy.get("@dataInstituteNewValid").then((data) => {
            // ввод орги
            cy.get(':nth-child(1) > .form-control--medium > .form-input--text').type(data.name) // имя орги
            cy.get(':nth-child(2) > .form-control--medium > .form-input--text').type(data.address) // адрес
            cy.get('.form-area').type(data.description) // описание
            cy.wait(1000);
            cy.get('.create-company-form__description-block > .button').click({force: true}) // кнопа
            cy.wait(100);
            cy.visit('https://dev.profteam.su/account/requests');
            cy.contains('.shared-list-item__title > span', 'Заявка на создание организации ' + data.name + ' по адресу ' + data.address).should('exist')
        })
    })

    it('change request', () => {
        FastMethods.login('registration/correctInputForTest.json');

        cy.visit('https://dev.profteam.su/account/main');
        cy.wait(500);
        cy.visit('https://dev.profteam.su/account/requests');
        cy.wait(2000);

        cy.get('.button__background-color-light-blue').click();
        cy.fixture('roles/institute/instituteChange.json').as('dataInstituteChanged');

        cy.get("@dataInstituteChanged").then((data) => {
            // ввод орги
            cy.wait(5000);
            cy.get('.desktop-modal__content > .create-company-form > :nth-child(1) > :nth-child(1) > .form-control--medium > .form-input--text').clear().type(data.name) // имя орги
            cy.get('.desktop-modal__content > .create-company-form > :nth-child(1) > :nth-child(2) > .form-control--medium > .form-input--text').clear().type(data.address) // адрес
            cy.get('.desktop-modal__content > .create-company-form > :nth-child(2) > :nth-child(1) > .form-control > .form-area').clear().type(data.description) // описание
            // cy.wait(1000);
            cy.get('.desktop-modal__content > .create-company-form > .create-company-form__description-block > .button').click() // кнопа
            cy.wait(100);
            cy.visit('https://dev.profteam.su/account/requests');
            cy.contains('.shared-list-item__title > span', 'Заявка на создание организации ' + data.name + ' по адресу ' + data.address).should('exist')
        })
    })

    it('can delete query', () => {
        FastMethods.login('registration/correctInputForTest.json');

        cy.visit('https://dev.profteam.su/account/main');
        cy.wait(1500);
        FastMethods.deleteRequest('.button__background-color-light-red');
    });

    it('write wrnog info in creating company', () => {
        FastMethods.login('registration/correctInputForTest.json');

        cy.visit('https://dev.profteam.su/account/main');
        cy.wait(500);

        // на самой странице

        /* добавить роль */
        cy.get('.page-nav__role-block > .button').click(); // кнопка "добваить роль"
        cy.get('.select-role-form > :nth-child(2)').click({ force: true })

        cy.wait(100);

        /* ввод информации для института */


        cy.get('.variants-company > :nth-child(2)').click(); // не сущесвтующая
        cy.fixture('roles/institute/instituteNewNotValid.json').as('dataInstituteNewNotValid');
        cy.get("@dataInstituteNewNotValid").then((data) => {
            // ввод орги
            cy.get(':nth-child(1) > .form-control--medium > .form-input--text').type(data.name) // имя орги
            cy.get(':nth-child(2) > .form-control--medium > .form-input--text').type(data.address) // адрес
            cy.get('.form-area').type(data.description) // описание
            cy.wait(1000);
            cy.get('.create-company-form__description-block > .button').should('be.disabled', true) // кнопа
            cy.wait(100);
        })
    })

    it('write wrong info for exists company', () => {
        FastMethods.login('registration/correctInputForTest.json');

        cy.visit('https://dev.profteam.su/account/main');

        cy.wait(500);

        // на самой странице

        /* добавить роль */
        cy.get('.page-nav__role-block > .button').click(); // кнопка "добваить роль"
        cy.get('.select-role-form > :nth-child(2)').click({ force: true }) // выбрать "студент";

        cy.wait(100);

        /* ввод информации для института */

        cy.get('.variants-company > :nth-child(1)').click(); // сущесвтующая
        cy.fixture('roles/institute/instituteExistsNotValid.json').as('dataInstituteExistsNotValid');
        cy.get("@dataInstituteExistsNotValid").then((data) => {
            // ввод орги
            cy.get('div.search-input__field > .form-input--text').type(data.name)
            cy.wait(3500);
            cy.get('.choose-company > .button').should('be.disabled', true);
        })
    })
})