import {IngredientsDto, UserDto} from "./slice-types";

export type ServerResponse<T> = {
    success: boolean;
} & T;

export type UserResponseToken = ServerResponse<{
    user: UserDto;
    accessToken: string;
    refreshToken: string;
}>;

export type UserRefreshToken = ServerResponse<{
    accessToken: string;
    refreshToken: string;
}>;

export type GetUserResponse = ServerResponse<{
    user: UserDto;
}>;

export type ErrorResponse = {
    statusCode: number
}

export type CreateOrderResponse = ServerResponse<{
    name: string;
    order: TOrderType
}>;

export type TOrderType = {
    number: number,
}

export type TOrderState = {
    orders: TAllOrder[];
    isLoading: boolean,
    errorCode: string | null;
}

export type WebSocketOrdersAllDto = ServerResponse<{
    orders: TAllOrder[],
    total: number,
    totalToday: number,
}>

export type TAllOrder = {
    _id: string,
    ingredients: string[],
    status: string,
    name: string,
    createAt: string,
    updateAt: string,
    number: number;
}

export type GetIngredientsResponse = ServerResponse<{
    data: IngredientsDto[]
}>;
