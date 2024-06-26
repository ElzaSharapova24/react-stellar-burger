import { AsyncThunk, UnknownAction } from "@reduxjs/toolkit";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
export type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

const hasPrefix = (action: UnknownAction, prefix: string): boolean => {
    return action.type.startsWith(prefix);
};

function isPending(action: PendingAction): boolean {
    return action.type.endsWith("/pending");
}

function isRejected(action: RejectedAction): boolean {
    return action.type.endsWith("/rejected");
}


export const isActionPending = (prefix: string) => (action: PendingAction) => {
    return hasPrefix(action, prefix) && isPending(action);
};


export const isActionRejected =
    (prefix: string) => (action: RejectedAction) => {
        return hasPrefix(action, prefix) && isRejected(action);
    };
