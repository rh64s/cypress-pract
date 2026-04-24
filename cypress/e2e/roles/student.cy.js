import FastMethods from "../../../modules/fastmethods.js";

describe('student', () => {
    it('send request role', () => {
        FastMethods.login('registration/correctInputForTest.json');
        cy.wait(500);

        // на самой странице

        /* добавить роль */
        cy.get('.page-nav__role-block > .button').click(); // кнопка "добваить роль"
        cy.get('.select-role-form > :nth-child(3)').click({ force: true }) // выбрать "студент";

        cy.wait(100);

        /* верификация под студента */
        cy.get('.message-student > .button').click(); // прожать "верификация"
        cy.fixture('roles/studentVerify.json').as('dataStudent');
        cy.get("@dataStudent").then((data) => {

            // ввод орги
            cy.get('.desktop-modal__content > .student-form > .choose-institution > :nth-child(1) > [data-v-40f88df4=""] > .search-input > div.search-input__field > .form-input--text').type(data.org);
            cy.wait(1500);
            cy.get('.desktop-modal__content > .student-form > .choose-institution > :nth-child(1) > [data-v-40f88df4=""] > .search-input > div.search-input__wrapper-result').click();

            cy.wait(500);
            // ввод спецы
            cy.get('.desktop-modal__content > .student-form > .choose-specialty > [data-v-0dbb9e5f=""] > .search-input > div.search-input__field > .form-input--text').type(data.special);
            cy.wait(3500);
            cy.get('.desktop-modal__content > .student-form > .choose-specialty > [data-v-0dbb9e5f=""] > .search-input > div.search-input__wrapper-result').click();

            // ввод прочего
            cy.get('.desktop-modal__content > .student-form > :nth-child(3) > .form-control--max > .form-input--text').type(data.qual);
            cy.get('.desktop-modal__content > .student-form > .student-form__courses > .courses-list > :nth-child(3)').click({force: true});
            cy.get('.desktop-modal__content > .student-form > .student-form__years > :nth-child(1) > .form-control--max > .form-input--number').type(data.startDate);
            cy.get('.desktop-modal__content > .student-form > .student-form__years > :nth-child(2) > .form-control--max > .form-input--number').type(data.endDate);
            cy.wait(500);

            cy.get('.desktop-modal__content > .student-form > .button').click({force: true});
        })

    });

    it('admin get notification', () => {
        FastMethods.login('authorization/institut.json');

        cy.visit('https://dev.profteam.su/account/requests');
        cy.contains(':nth-child(1) > .responses-list-item__content-company > .responses-list-item__about > .responses-list-item__text > .responses-list-item__title', 'Прекраснов')
    })

    it('can delete query', () => {
        FastMethods.login('registration/correctInputForTest.json');
        cy.wait(1500);

        FastMethods.deleteRequest();

        cy.visit('https://dev.profteam.su/account/requests');
        cy.contains('.failed-loading > .card-title', 'Нет исходящих заявок')

    });

    it('stop to be student', () => {
        FastMethods.login('registration/correctInputForTest.json');
        cy.wait(500);
        cy.get('[data-v-02661ece=""][data-v-4e40dec7=""] > .form__buttons > .button').click({force: true});
        cy.wait(2000);
        cy.location('pathname').should('eq', '/login');

        FastMethods.login('registration/correctInputForTest.json')
        cy.wait(500);
        cy.contains('.menu-item__name', "Роль не определена")
    })

    it('write wrong info in form to be student', () => {
        FastMethods.login('registration/correctInputForTest.json');
        cy.wait(500);

        // на самой странице

        /* добавить роль */
        cy.get('.page-nav__role-block > .button').click(); // кнопка "добваить роль"
        cy.get('.select-role-form > :nth-child(3)').click({ force: true }) // выбрать "студент";

        cy.wait(100);

        /* верификация под студента */
        cy.get('.message-student > .button').click(); // прожать "верификация"
        cy.fixture('roles/studentVerifyFail.json').as('dataStudent');
        cy.get("@dataStudent").then((data) => {

            // ввод орги
            cy.get('.desktop-modal__content > .student-form > .choose-institution > :nth-child(1) > [data-v-40f88df4=""] > .search-input > div.search-input__field > .form-input--text').type(data.org);
            cy.wait(500);

            // ввод спецы
            cy.get('.desktop-modal__content > .student-form > .choose-specialty > [data-v-0dbb9e5f=""] > .search-input > div.search-input__field > .form-input--text').should('be.disabled', true)

            // ввод прочего
            cy.get('.desktop-modal__content > .student-form > :nth-child(3) > .form-control--max > .form-input--text').type(data.qual);
            cy.get('.desktop-modal__content > .student-form > .student-form__courses > .courses-list > :nth-child(3)').click({force: true});
            cy.get('.desktop-modal__content > .student-form > .student-form__years > :nth-child(1) > .form-control--max > .form-input--number').type(data.startDate);
            cy.get('.desktop-modal__content > .student-form > .student-form__years > :nth-child(2) > .form-control--max > .form-input--number').type(data.endDate);
            cy.wait(500);

            cy.get('.desktop-modal__content > .student-form > .button').should('be.disabled', true);
        })
    })
})