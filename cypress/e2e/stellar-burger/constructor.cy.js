describe('drag-and-drop', () => {
    beforeEach(() => {
        cy.intercept("GET","api/ingredients", {fixture: "ingredients.json"})
        cy.viewport(1300, 800);
        cy.visit('http://localhost:3000')
    })
    
    it('should drag & drop work in constructor', () => {
        cy.get('[alt="Ингредиент 1"]')
            .trigger('dragstart');
        cy.get('[data-cy="drop-container"]')
            .trigger('drop');
        cy.get('[alt="Ингредиент 3"]')
            .trigger('dragstart');
        cy.get('[data-cy="drop-container"]')
            .trigger('drop')
        cy.get('[alt="Ингредиент 4"]')
            .trigger('dragstart');
        cy.get('[data-cy="drop-container"]')
            .trigger('drop');
        cy.get('[alt="Ингредиент 5"]')
            .trigger('dragstart');
        cy.get('[data-cy="drop-container"]')
            .trigger('drop');
        cy.get('[alt="Ингредиент 6"]')
            .trigger('dragstart');
        cy.get('[data-cy="drop-container"]')
            .trigger('drop');
        cy.get('[alt="Ингредиент 7"]')
            .trigger('dragstart');
        cy.get('[data-cy="drop-container"]')
            .trigger('drop');
        cy.get('[alt="Ингредиент 8"]')
            .trigger('dragstart');
        cy.get('[data-cy="drop-container"]')
            .trigger('drop');
    });
})
