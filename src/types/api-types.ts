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
    order: OrderType
    _id: string;
    total: number;
    totalToday: number;
}>;

export type OrderType = {
    number: number,
}

export type TOrderState = {
    isLoading: boolean;
    data: CreateOrderResponse | null;
    errorCode: string | null;
}

export type GetIngredientsResponse = ServerResponse<{
    data: IngredientsDto[]
}>;
