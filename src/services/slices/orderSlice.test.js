const { initialState, ingredientReducers, dragBun, dragFilling, ingredientSort, ingredientDelete, resetOrder } = require("./ingredientSlice");

describe('ingredientReducers', () => {
    it('should handle dragBun action', () => {
        const state = {
            ...initialState,
            ingredients: [{ _id: '1', count: 0 }, { _id: '2', count: 0 }],
            bun: null
        };
        const action = dragBun({ _id: '1' });
        const nextState = ingredientReducers(state, action);
        expect(nextState.bun).toEqual({ _id: '1' });
        expect(nextState.ingredients.find(e => e._id === '1').count).toEqual(2);
        expect(nextState.ingredients.find(e => e._id === '2').count).toEqual(0);
    });
    
    it('should handle dragFilling action', () => {
        const state = {
            ...initialState,
            fillings: [],
            ingredients: [{ _id: '1', count: 0 }],
            imagesByIds: new Map()
        };
        const action = dragFilling({ _id: '1' });
        const nextState = ingredientReducers(state, action);
        expect(nextState.fillings.length).toEqual(1);
        expect(nextState.fillings[0]._id).toEqual('1');
        expect(nextState.ingredients.find(e => e._id === '1').count).toEqual(1);
    });
    
    it('should handle ingredientSort action', () => {
        const state = {
            ...initialState,
            fillings: [{ id: '1' }, { id: '2' }, { id: '3' }]
        };
        const action = ingredientSort({ from: 0, to: 2 });
        const nextState = ingredientReducers(state, action);
        expect(nextState.fillings.map(f => f.id)).toEqual(['2', '3', '1']);
    });
    
    it('should handle ingredientDelete action', () => {
        const state = {
            ...initialState,
            fillings: [{ id: '1', _id: '1' }, { id: '2', _id: '2' }],
            ingredients: [{ _id: '1', count: 1 }, { _id: '2', count: 0 }]
        };
        const action = ingredientDelete({ id: '1', _id: '1' });
        const nextState = ingredientReducers(state, action);
        expect(nextState.fillings.length).toEqual(1);
        expect(nextState.fillings[0].id).toEqual('2');
        expect(nextState.ingredients.find(e => e._id === '1').count).toEqual(0);
    });
    
    it('should handle resetOrder action', () => {
        const state = {
            ...initialState,
            order: { orderId: '123' }
        };
        const nextState = ingredientReducers(state, resetOrder());
        expect(nextState.order).toEqual(null);
    });
});
