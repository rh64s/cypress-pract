import RandHelper from "../../modules/helpers.js";

describe('register', () => {
    it('register', () => {
        cy.visit('https://dev.profteam.su/registration');
        cy.wait(500);

        //  there we are creating randomized logins that can pass

        let randomizedUsername = RandHelper.randomCharacters(30) + "user" + RandHelper.randomCharacters(5);
        cy.get(':nth-child(1) > :nth-child(1) > .form-control--medium > .form-input--text').type(randomizedUsername);
        cy.get(':nth-child(1) > :nth-child(1) > .form-control--medium > .form-input--text').should('have.value', randomizedUsername);

        let randomizedEmail = randomizedUsername + "email@example.com"
        cy.get('.form-input--email', {timeout: 4000}).type(randomizedEmail);
        cy.get('.form-input--email').should('have.value', randomizedEmail);

        let randomizedPassword = "Password1!"
        cy.get(':nth-child(3) > .form-control--medium > .form-input--password', {timeout: 4000}).type(randomizedPassword);
        cy.get(':nth-child(3) > .form-control--medium > .form-input--password').should('have.value', randomizedPassword);

        cy.get(':nth-child(4) > .form-control--medium > .form-input--password', {timeout: 4000}).type(randomizedPassword);
        cy.get(':nth-child(4) > .form-control--medium > .form-input--password').should('have.value', randomizedPassword);

        cy.get(':nth-child(4) > .button').click();
        cy.wait(400);

        cy.get('[style=""] > :nth-child(1) > .form-control--medium > .form-input--text').type("рандом-рандомов")
        cy.get(':nth-child(2) > .form-control--medium > .form-input--text').type("рандом")
        cy.get(':nth-child(3) > .form-control--medium > .form-input--text').type("рандом")
        cy.get('.form-input--file').selectFile('storage/images/test.png')

        cy.get('[style=""] > :nth-child(1) > .form-control--medium > .form-input--text').should('have.value', "рандом-рандомов")
        cy.get(':nth-child(2) > .form-control--medium > .form-input--text').should('have.value', "рандом")
        cy.get(':nth-child(3) > .form-control--medium > .form-input--text').should('have.value', "рандом")
        // cy.get(':nth-child(3) > .button').click();
    });

    it('register validation check on 1 part', () => {
        cy.fixture('registration/validation.json').as('dataValidation')
        cy.visit('https://dev.profteam.su/registration');
        cy.wait(500);

        // 1 part of form

        cy.get("@dataValidation").then((data) => {
            cy.get(':nth-child(1) > :nth-child(1) > .form-control--medium > .form-input--text').type(data.login);
            cy.get('.form-input--email', {timeout: 4000}).type(data.email);
            cy.get(':nth-child(3) > .form-control--medium > .form-input--password', {timeout: 4000}).type(data.password);
            cy.get(':nth-child(4) > .form-control--medium > .form-input--password', {timeout: 4000}).type(data.passwordRepeat);
        })

        cy.wait(1000);

        cy.contains('.form-error > span', 'Обязательное поле, символы латиницы, не содержит пробелы').should('exist')
        cy.contains('.form-error > span', 'Обязательное поле, некорректная почта').should('exist')
        cy.contains('.form-error > span', 'Обязательное поле, мин 6 символов, должен содержать буквы в верхнем и нижнем регистре, минимум 1 цифру, не содержать пробелы').should('exist')
        cy.contains('.form-error > span', 'Пароли не совпадают').should('exist')
    });

    it('register validation check on 2 part', () => {
        cy.visit('https://dev.profteam.su/registration');
        cy.wait(500);

        // 1 part of form

        cy.fixture('registration/correctInputs.json').as('dataCorrect')
        cy.get("@dataCorrect").then((data) => {
            cy.get(':nth-child(1) > :nth-child(1) > .form-control--medium > .form-input--text').type(data.login);
            cy.get('.form-input--email', {timeout: 4000}).type(data.email);
            cy.get(':nth-child(3) > .form-control--medium > .form-input--password', {timeout: 4000}).type(data.password);
            cy.get(':nth-child(4) > .form-control--medium > .form-input--password', {timeout: 4000}).type(data.passwordRepeat);
        })

        cy.get(':nth-child(4) > .button').click();
        cy.wait(1000);

        cy.fixture('registration/validation.json').as('dataValidation')
        cy.get("@dataValidation").then((data) => {
            cy.get('[style=""] > :nth-child(1) > .form-control--medium > .form-input--text').type(data.surname)
            cy.get(':nth-child(2) > .form-control--medium > .form-input--text').type(data.name)
            cy.get(':nth-child(3) > .form-control--medium > .form-input--text').type(data.patronymic)
            cy.get('.form-input--file').selectFile(data.avatarPath)
        })

        cy.contains('.form-error > span', 'Обязательное поле, кириллица, тире, апостроф и пробелы').should('exist')
        cy.contains('.form-error > span', 'кириллица, тире и пробелы').should('exist')
        cy.contains('.form-error > span', 'В формате jpg(jpeg) или png c ограничением по размеру не более 1 Мб').should('exist')
    })
})