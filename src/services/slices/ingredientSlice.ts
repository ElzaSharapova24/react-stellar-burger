import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { createOrderRequest, getIngredientsRequest } from "../../utils/api";
import { checkResponse } from "../../utils/utils";
import { IngredientsDto } from "../../types/slice-types";
import {CreateOrderResponse, GetIngredientsResponse} from "../../types/api-types";
import {PayloadCreator} from "../hooks";

export interface IngredientState {
    bun: IngredientsDto | null;
    fillings: IngredientsDto[];
    ingredients: IngredientsDto[];
    isLoading: boolean;
    imagesByIds: Map<string, string>;
    order: null | CreateOrderResponse;
}

export const initialState: IngredientState = {
    bun: null,
    fillings: [],
    ingredients: [],
    isLoading: true,
    imagesByIds: new Map(),
    order: null,
};

export const getIngredientsFetch = createAsyncThunk<GetIngredientsResponse>(
    "ingredients/getIngredientsFetch",
    PayloadCreator<GetIngredientsResponse, void>(async function () {
        return await getIngredientsRequest().then(checkResponse<GetIngredientsResponse>);
    })
);

export const createOrderResult = createAsyncThunk<CreateOrderResponse, string[]>(
    "order/getOrderResult",
    PayloadCreator<CreateOrderResponse, string[]>(async function (payload) {
        return await createOrderRequest(payload).then(checkResponse<CreateOrderResponse>);
    })
);

export const ingredientSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        dragBun(state: IngredientState, action) {
            if (state.bun !== null) {
                state.ingredients.find((e) => e._id === state.bun!._id)!.count = 0;
            }
            state.ingredients.find((e) => e._id === action.payload._id)!.count = 2;
            state.bun = action.payload;
        },
        dragFilling(state: IngredientState, action) {
            state.ingredients.find((e) => e._id === action.payload._id)!.count++;
            state.fillings.push({
                ...action.payload,
                id: crypto.randomUUID(),
            });
        },
        ingredientSort(state: IngredientState, action) {
            state.fillings.splice(
                action.payload.to,
                0,
                state.fillings.splice(action.payload.from, 1)[0]
            );
        },
        ingredientDelete(state: IngredientState, action) {
            state.ingredients.find((e) => e._id === action.payload._id)!.count--;
            state.fillings = state.fillings.filter(
                (item) => item.id !== action.payload.id
            );
        },
        resetOrder(state) {
            state.order = null;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredientsFetch.pending, (state: IngredientState) => {
                state.isLoading = true;
            })
            .addCase(getIngredientsFetch.fulfilled, (state: IngredientState, action) => {
                const { data } = action.payload;
                const ingredients = data.map((e) => {
                    return {
                        ...e,
                        count: 0,
                    };
                });
                state.ingredients = ingredients;
                for (let ingredient of ingredients){
                    state.imagesByIds.set(ingredient._id, ingredient.image_mobile);
                }
                state.isLoading = false;
            })

            .addCase(getIngredientsFetch.rejected, (state: IngredientState) => {
                state.isLoading = false;
            })

            .addCase(createOrderResult.pending, (state: IngredientState) => {
                state.isLoading = true;
            })

            .addCase(createOrderResult.fulfilled, (state: IngredientState, action) => {
                state.bun = null;
                state.fillings = [];
                for (let ingredient of state.ingredients) {
                    ingredient.count = 0;
                }
                state.order = action.payload;
                state.isLoading = false;
            })

            .addCase(createOrderResult.rejected, (state: IngredientState) => {
                state.isLoading = false;
            });
    },
});

export const {
    dragBun,
    dragFilling,
    ingredientSort,
    ingredientDelete,
    resetOrder,
} = ingredientSlice.actions;

export const ingredientReducers = ingredientSlice.reducer;
