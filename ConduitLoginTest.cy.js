const cyView = require("cy-view");
const devices = [
    {
        model: "desktop",
        width: 1280,
        height: 800
    },
    {
        model: "mobile simulator",
        width: 375,
        height: 667
    }
];
const urls = [
    "http://angularjs.realworld.io/#/"
];
const conduitTests = cyView(devices);

conduitTests(urls, () => {
    describe('Conduit application test cases', () => {
        //#1 Successful Login Test Case
        it('Verify user is able to login successfully with correct username and password', () => {
            cy.get('a.nav-link[href="#/login"]').click()
            cy.title().should('equal', 'Sign in — Conduit')
            cy.get('input.ng-valid-email').type('shivanigoel1709@gmail.com')
            cy.get(`input.ng-pristine[type='password']`).type('password123')
            cy.get('button.btn').click()
            cy.get("ul.pull-xs-right[show-authed='true'] li.nav-item:nth-of-type(4) a").
                should('contain', 'shivanigoel')
        })
        //#2 Incorrect Username Test Case
        it('Verify user tries to login with incorrect username', () => {
            cy.get('a.nav-link[href="#/login"]').click()
            cy.title().should('equal', 'Sign in — Conduit')
            cy.get('input.ng-valid-email').type('shivanigoel@gmail.com')
            cy.get(`input.ng-pristine[type='password']`).type('password123')
            cy.get('button.btn').click()
            cy.get(`li.ng-scope[ng-repeat='error in errors']`).
                should('contain', 'email or password is invalid')
        })
        //#3 User tries to login with Incorrect Password
        it('Verify user tries to login with incorrect password', () => {
            cy.get('a.nav-link[href="#/login"]').click()
            cy.title().should('equal', 'Sign in — Conduit')
            cy.get('input.ng-valid-email').type('shivanigoel@gmail.com')
            cy.get(`input.ng-pristine[type='password']`).type('password125')
            cy.get('button.btn').click()
            cy.get(`li.ng-scope[ng-repeat='error in errors']`).
                should('contain', 'email or password is invalid')
        })
        //#4 User tries to login without password
        it('Verify user tries to login without password', () => {
            cy.get('a.nav-link[href="#/login"]').click()
            cy.title().should('equal', 'Sign in — Conduit')
            cy.get('input.ng-valid-email').type('shivanigoel@gmail.com')
            //cy.get(`input.ng-pristine[type='password']`).type('password125')
            cy.get('button.btn').click()
            cy.get(`li.ng-scope[ng-repeat='error in errors']`).
                should('contain', `password can't be blank`)
        })

        //#5 User tries to login without username and password
        it('Verify user tries to login without username and password', () => {
            cy.get('a.nav-link[href="#/login"]').click()
            cy.title().should('equal', 'Sign in — Conduit')
            cy.get('input.ng-valid-email').type('shivanigoel@gmail.com')
            cy.get('input.ng-valid-email').clear()
            cy.get('button.btn').click()
            cy.get(`li.ng-scope[ng-repeat='error in errors']`).
                should('contain', `email can't be blank`)
        })
        //#6 User tries to login with wrong email format
        it('Verify user tries to login with incorrect format of email address', () => {
            cy.get('a.nav-link[href="#/login"]').click()
            cy.title().should('equal', 'Sign in — Conduit')
            cy.get('input.ng-valid-email').type('shivanigoelgmail.com')
            cy.get(`input.ng-pristine[type='password']`).type('password123')
            cy.get('button.btn').click()
            cy.get('[type="email"]').then(($input) => {
                expect($input[0].validationMessage).to.contain(`Please include an \'@\' in the email address`);
            })
        })

    })
})