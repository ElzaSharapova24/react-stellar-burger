describe('open ingredient modal', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredient', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('http://localhost:3000')
    })
    
    it('should open modal on ingredient click', () => {
        // Найти элемент с ингредиентом и кликнуть по нему
        cy.get('[data-cy="ingredient"]').first().click();
        
        // Проверить, что модальное окно отображается
        cy.get('[data-cy="ingredient-modal"]').should('be.visible');
    
        // Проверить, что модальное окно содержит кнопку закрытия
        cy.get('[data-cy="close-icon"]').should('exist');
        
        // Найти кнопку закрытия и кликнуть по ней
        cy.get('[data-cy="close-icon"]').click();
    
        // Проверить, что модальное окно больше не отображается
        cy.get('[data-cy="modal"]').should('not.exist');
    });
    
})
