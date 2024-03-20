describe('drag-and-drop', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredient', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('http://localhost:3000')
    })
    
    const dragAndDrop = (index) => {
        cy.get('[data-cy="drag-ingredient"]').eq(index).trigger('dragstart');
        cy.get('[data-cy="drop-container"]').trigger('drop');
    };
    
    it('should drag ingredient', () => {
        cy.get('[data-cy="drop-container"]').contains('Добавьте инредиент');
    });
})
