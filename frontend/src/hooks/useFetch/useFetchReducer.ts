export type UseFetchState = {
    isFetching: boolean;
    error: string;
    data: any;
}

export type UseFetchAction = 
{ type: 'START_FETCH' }
| {
    type: 'FETCH_SUCCESS',
    payload: { data: any },
}
| {
    type: 'FETCH_ERROR',
    payload: { error: string },
}

export const DEFAULT_INITIAL_STATE: UseFetchState = {
    isFetching: false,
    error: '',
    data: undefined,
}

export const useFetchReducer = (
    state: UseFetchState,
    action: UseFetchAction,
): UseFetchState => {
    switch (action.type) {
        case 'START_FETCH':
            return {
                ...state,
                isFetching: true,
                error: '',
                data: undefined,
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isFetching: false,
                error: '',
                data: action.payload.data,
            }
        case 'FETCH_ERROR':
            return {
                ...state,
                isFetching: false,
                error: action.payload.error,
                data: undefined,
            }
        default:
            return state;
    }
}