const { ingredientReducers, initialState, dragBun, dragFilling, ingredientSort, ingredientDelete, resetOrder } = require('./ingredientSlice');



describe('ingredient reducers', () => {
    it('should return the initial state', () => {
        expect(ingredientReducers(undefined, {})).toEqual(initialState);
    });
    
    it('should handle dragBun correctly', () => {
        const action = dragBun({ _id: 'bun_id', name: 'bun', image_mobile: 'bun_image', price: 1 });
        const newState = ingredientReducers(initialState, action);
        expect(newState.bun).toEqual({ _id: 'bun_id', name: 'fun', image_mobile: 'bun_image', price: 1 });
    });
    
    it('should handle dragFilling correctly', () => {
        const action = dragFilling({ _id: 'filling_id', name: 'filling', image_mobile: 'filling_image', price: 2 });
        const newState = ingredientReducers(initialState, action);
        expect(newState.fillings).toHaveLength(1);
        expect(newState.fillings[0]).toEqual({ _id: 'filling_id', name: 'filling', image_mobile: 'filling_image', price: 2 });
    });
    
    it('should handle ingredientSort correctly', () => {
        const state = {
            ...initialState,
            fillings: [
                { _id: 'filling1_id', name: 'filling1', image_mobile: 'filling1_image', price: 2 },
                { _id: 'filling2_id', name: 'filling2', image_mobile: 'filling2_image', price: 3 }
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
            ingredients: [{ _id: 'filling_id', count: 1 }],
            fillings: [{ _id: 'filling_id', id: 'some_id' }]
        };
        const action = ingredientDelete({ _id: 'filling_id', id: 'some_id' });
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
        expect(newState.order).toBeNull();
    });
});
