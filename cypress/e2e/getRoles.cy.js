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

        // на самой странице

        /* добавить роль */
        // cy.get('.page-nav__role-block > .button').click(); // кнопка "добваить роль"
        // cy.get('.select-role-form > :nth-child(3)').click({ force: true }) // выбрать "студент";
        //
        // cy.wait(100);

        /* верификация под студента */
        cy.get('.message-student > .button').click(); // прожать "верификация"
        cy.fixture('roles/studentVerify.json').as('dataStudent');
        cy.get("@dataStudent").then((data) => {

            // ввод орги
            cy.get('.desktop-modal__content > .student-form > .choose-institution > :nth-child(1) > [data-v-40f88df4=""] > .search-input > div.search-input__field > .form-input--text').type(data.org);
            cy.wait(500);
            cy.get('.desktop-modal__content > .student-form > .choose-institution > :nth-child(1) > [data-v-40f88df4=""] > .search-input > div.search-input__wrapper-result').click();

            cy.wait(500);
            // ввод спецы
            cy.get('.desktop-modal__content > .student-form > .choose-specialty > [data-v-0dbb9e5f=""] > .search-input > div.search-input__field > .form-input--text').type('0', {force: true});
            cy.wait(1500);
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
})