const { ingredientReducers, initialState, dragBun, dragFilling, ingredientSort, ingredientDelete, resetOrder,
    getIngredientsFetch, createOrderResult
} = require('./ingredientSlice');
const {enableMapSet} = require("immer");
const generated_id = '1q2w3e4r';
global.crypto = {
    randomUUID() {return generated_id}
};

enableMapSet();

describe('ingredient reducers', () => {
    
    it('should return the initial state', () => {
        expect(ingredientReducers(undefined, {})).toEqual(initialState);
    });
    
    it('should handle dragBun correctly', () => {
        const state = {
            ...initialState,
            ingredients: [
                { _id: 'bun_id', name: 'bun', count: 0}
            ]
        };
        const action = dragBun({ _id: 'bun_id', name: 'bun', count: 0});
        const newState = ingredientReducers(state, action);
        expect(newState.bun).toEqual({ _id: 'bun_id', name: 'bun', count: 0});
    });
    
    it('should handle dragFilling correctly', () => {
        const state = {
            ...initialState,
            ingredients: [
                { _id: 'filling_id', name: 'filling', count: 0}
            ]
        };
        const action = dragFilling({ _id: 'filling_id', name: 'filling' });
        const newState = ingredientReducers(state, action);
        expect(newState.fillings).toHaveLength(1);
        expect(newState.fillings[0]).toEqual({ _id: 'filling_id', name: 'filling', id: generated_id});
    });
    
    it('should handle ingredientSort correctly', () => {
        const state = {
            ...initialState,
            fillings: [
                { _id: 'filling_id1', name: 'filling1'},
                { _id: 'filling_id2', name: 'filling2'}
            ]
        };
        const action = ingredientSort({ from: 0, to: 1 });
        const newState = ingredientReducers(state, action);
        expect(newState.fillings[0].name).toBe('filling2');
        expect(newState.fillings[1].name).toBe('filling1');
    });
    
    it('should handle ingredientDelete correctly', () => {
        const state = {
            ...initialState,
            ingredients: [{ _id: 'id', count: 1 }],
            fillings: [{ _id: 'id', id: 'some_id' }]
        };
        const action = ingredientDelete({ _id: 'id', id: 'some_id' });
        const newState = ingredientReducers(state, action);
        expect(newState.ingredients[0].count).toBe(0);
        expect(newState.fillings).toHaveLength(0);
    });
    
    it('should handle resetOrder correctly', () => {
        const state = {
            ...initialState,
            order: { id: 'order_id' }
        };
        const action = resetOrder();
        const newState = ingredientReducers(state, action);
        expect(newState.order).toBe(null);
    });
    
    it("should handle getIngredientsFetch.pending action", () => {
        const action = getIngredientsFetch.pending('');
        const state = ingredientReducers(initialState, action);
        expect(state.isLoading).toBe(true)
    });
    
    it('should update state correctly when getIngredientsFetch.fulfilled action is dispatched', () => {
        const initialState = {
            ingredients: [],
            imagesByIds: new Map(),
            isLoading: true
        };
        
        const mockData = [
            {
                _id: '1',
                name: 'Ingredient 1',
                image_mobile: 'url1',
                price: 10
            },
            {
                _id: '2',
                name: 'Ingredient 2',
                image_mobile: 'url2',
                price: 20
            }
        ];
        
        const mockActionPayload = {
            data: mockData
        };
        
        const action = {
            type: getIngredientsFetch.fulfilled.type,
            payload: mockActionPayload
        };
        
        const updatedState = ingredientReducers(initialState, action);
        
        // Проверяем, что ингредиенты были обновлены правильно
        expect(updatedState.ingredients).toEqual(
            mockData.map(ingredient => ({ ...ingredient, count: 0 }))
        );
        
        // Проверяем, что данные для изображений были установлены правильно
        mockData.forEach(ingredient => {
            expect(updatedState.imagesByIds.get(ingredient._id)).toEqual({
                image: ingredient.image_mobile,
                price: ingredient.price,
                name: ingredient.name,
                count: 0,
                _id: ingredient._id
            });
        });
        
        expect(updatedState.isLoading).toBe(false);
    });
    
    it("should handle getIngredientsFetch.rejected action", () => {
        const action = getIngredientsFetch.rejected('');
        const state = ingredientReducers(initialState, action);
        expect(state.isLoading).toBe(false)
    });
    
    it("should handle createOrderResult.pending action", () => {
        const action = createOrderResult.pending('');
        const state = ingredientReducers(initialState, action);
        expect(state.isLoading).toBe(true)
    });
    
    it('should update state correctly when createOrderResult.fulfilled action is dispatched', () => {
        const initialState = {
            bun: { id: 'bun_id', name: 'bun', count: 1 },
            fillings: [
                { id: 'filling_id_1', name: 'Filling 1', count: 2 },
                { id: 'filling_id_2', name: 'Filling 2', count: 1 }
            ],
            ingredients: [
                { id: 'bun_id', name: 'bun', count: 1 },
                { id: 'filling_id_1', name: 'Filling 1', count: 2 },
                { id: 'filling_id_2', name: 'Filling 2', count: 1 }
            ],
            order: null,
            isLoading: true
        };

        const mockPayload = { id: 'mock_order_id', totalPrice: 50 };
        
        const action = {
            type: createOrderResult.fulfilled.type,
            payload: mockPayload
        };
        
        const updatedState = ingredientReducers(initialState, action);
        
        expect(updatedState.bun).toBe(null);
        expect(updatedState.fillings).toEqual([]);
        updatedState.ingredients.forEach(ingredient => {
            expect(ingredient.count).toBe(0);
        });
        expect(updatedState.order).toEqual(mockPayload);
        expect(updatedState.isLoading).toBe(false);
    });
    
    it("should handle createOrderResult.rejected action", () => {
        const action = createOrderResult.rejected('');
        const state = ingredientReducers(initialState, action);
        expect(state.isLoading).toBe(false)
    });
});
