describe('open ingredient modal', () => {
    beforeEach(() => {
        cy.viewport(1300, 800);
        cy.visit('http://localhost:3000')
    })
    
    it('should open modal on ingredient click', () => {
        cy.get('[data-cy="ingredient"]').first().click();
        cy.get('[data-cy="ingredient-modal"]').should('be.visible');
        cy.get('[data-cy="close-icon"]').should('exist');
        cy.get('[data-cy="close-icon"]').click();
        cy.get('[data-cy="modal"]').should('not.exist');
    });
    
})
