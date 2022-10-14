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
    describe('Conduit application Setting page test cases', () => {

        beforeEach(() => {
            cy.get('a.nav-link[href="#/login"]').click()
            cy.title().should('equal', 'Sign in — Conduit')
            cy.get('input.ng-valid-email').type('shivanigoel1709@gmail.com')
            cy.get(`input.ng-pristine[type='password']`).type('password123')
            cy.get('button.btn').click()
            cy.get("ul.pull-xs-right[show-authed='true'] li.nav-item:nth-of-type(4) a").
                should('contain', 'shivanigoel')
            cy.get(`a.nav-link[ui-sref='app.settings']`).click()
            cy.title().should('equal', 'Settings — Conduit')
        })

        //#1. Full scenario execution for Setting page
        it('Verify presence of all the field in Settings pagee', () => {

            cy.get(`input.form-control[placeholder='URL of profile picture']`).
                invoke('val').should('contain', "smiley-cyrus.jpeg");
            cy.get(`input.form-control[placeholder='Username']`).invoke('val').
                should('contain', 'shivanigoel')
            cy.get('textarea.form-control').type('Hi there, this is Shivani')
            cy.get(`input.form-control[type='email']`).invoke('val').
                should('contain', 'shivanigoel1709@gmail.com')
            cy.get('button.btn-lg').should('be.visible')
        })

        //#2. Test Case to verify user is able to change username
        it('Verify user should be able to change username', () => {
            cy.get(`input.form-control[placeholder='Username']`).focus().clear();
            cy.get(`input.form-control[placeholder='Username']`).type('shivanigoel')
            cy.get('button.btn-lg').click()
            cy.get(`a.ng-binding[ui-sref-active='active']`).should('contain', 'shivanigoel')
            cy.get(`a.nav-link[ui-sref='app.settings']`).click()
        })
        //#3. Test Case to verify user is able to change password
        it('Verify user should be able to change password', () => {
            cy.get(`input.form-control[type='password']`).type('password123')
            cy.get('button.btn-lg').click()
            cy.get('button.btn-outline-danger').click()
            cy.wait(200)

            cy.get('a.nav-link[href="#/login"]').click()
            cy.title().should('equal', 'Sign in — Conduit')
            cy.get('input.ng-valid-email').type('shivanigoel1709@gmail.com')
            cy.get(`input.ng-pristine[type='password']`).type('password123')
            cy.get('button.btn').click({force: true})
            cy.get("ul.pull-xs-right[show-authed='true'] li.nav-item:nth-of-type(4) a").
                should('contain', 'shivanigoel')
        })
        //#4.Test Case to verify user is able to change email address
        it('Verify user should be able to change email address', () => {
            cy.get(`input.form-control[type='email']`).focus().clear();
            cy.get(`input.form-control[type='email']`).type('shivanigoel1709@gmail.com')
            cy.wait(2000)

            cy.get('button.btn-lg').click()
            cy.get('button.btn-outline-danger').click()
            cy.wait(200)

            cy.get('a.nav-link[href="#/login"]').click()
            cy.title().should('equal', 'Sign in — Conduit')
            cy.get('input.ng-valid-email').type('shivanigoel1709@gmail.com')
            cy.get(`input.ng-pristine[type='password']`).type('password123')
            cy.get('button.btn').click({force: true})
            cy.get("ul.pull-xs-right[show-authed='true'] li.nav-item:nth-of-type(4) a").
                should('contain', 'shivanigoel')
        })
    })
})
