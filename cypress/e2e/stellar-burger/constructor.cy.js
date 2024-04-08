import {dropContainer, testUrl} from "../../constants";

describe('drag-and-drop', () => {
    beforeEach(() => {
        cy.intercept("GET","api/ingredients", {fixture: "ingredients.json"})
        cy.viewport(1300, 800);
        cy.visit(testUrl);
    })
    
    it('should drag & drop work in constructor', () => {
        cy.get(dropContainer).as('dropContainer')
        cy.get('[alt="Ингредиент 1"]')
            .trigger('dragstart');
        cy.get('@dropContainer')
            .trigger('drop');
        cy.get('[alt="Ингредиент 3"]')
            .trigger('dragstart');
        cy.get('@dropContainer')
            .trigger('drop')
        cy.get('[alt="Ингредиент 4"]')
            .trigger('dragstart');
        cy.get('@dropContainer')
            .trigger('drop');
        cy.get('[alt="Ингредиент 5"]')
            .trigger('dragstart');
        cy.get('@dropContainer')
            .trigger('drop');
        cy.get('[alt="Ингредиент 6"]')
            .trigger('dragstart');
        cy.get('@dropContainer')
            .trigger('drop');
        cy.get('[alt="Ингредиент 7"]')
            .trigger('dragstart');
        cy.get('@dropContainer')
            .trigger('drop');
        cy.get('[alt="Ингредиент 8"]')
            .trigger('dragstart');
        cy.get('@dropContainer')
            .trigger('drop');
    });
})
