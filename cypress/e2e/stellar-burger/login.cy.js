describe('Login to page',() => {
    beforeEach(() => {
        cy.viewport(1300, 800);
        cy.visit('http://localhost:3000')
    })
    
    it('User authorization', () => {
        cy.get('[data-cy="profile-btn"]').click();
        cy.get('[data-cy="form-input"]').type('sharliz1202@gmail.com');
        cy.get('[data-cy="form-password"]').type('111111');
        cy.get('[data-cy="login-btn"]').click();
    });
})
