import axios, { AxiosRequestConfig } from 'axios';
import { Reducer, useReducer, useEffect } from 'react';
import {
    DEFAULT_INITIAL_STATE,
    UseFetchAction,
    UseFetchState,
    useFetchReducer,
} from './useFetchReducer';

export const useFetch = (request: AxiosRequestConfig): UseFetchState => {
    const [
        fetchState,
        dispatchFetchAction,
    ] = useReducer<Reducer<UseFetchState, UseFetchAction>>(useFetchReducer, DEFAULT_INITIAL_STATE);

    useEffect(() => {
        let cancelRequest: boolean = false;
        if (!request) return;

        const fetchData = async () => {
            dispatchFetchAction({ type: 'START_FETCH' });

            try {
                const response = await axios(request);

                if (cancelRequest) return;

                if (response.status === 200) {
                    return dispatchFetchAction({
                        type: 'FETCH_SUCCESS',
                        payload: { data: response.data },
                    });
                }

                return dispatchFetchAction({
                    type: 'FETCH_ERROR',
                    payload: { error: 'Server could not return requested data' },
                });
            } catch (error) {
                return dispatchFetchAction({
                    type: 'FETCH_ERROR',
                    payload: { error: `${error}` },
                });
            }
        }

        if (!fetchState.isFetching && !fetchState.data) {
            fetchData();
        }
    }, [
        fetchState.data,
        fetchState.isFetching,
        request,
    ]);

    return {
        isFetching: fetchState.isFetching,
        error: fetchState.error,
        data: fetchState.data,
    }
}