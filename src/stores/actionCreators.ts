import { fetchCarDataByMake, fetchCarListFromJson } from "../helpers/index.ts";
import {  FETCH_CAR_DETAILS_FAILURE, FETCH_CAR_DETAILS_START, FETCH_CAR_DETAILS_SUCCESS, FETCH_CAR_LIST_FAILURE, FETCH_CAR_LIST_START, FETCH_CAR_LIST_SUCCESS, HANDLE_SEARCH } from "./actiontypes.ts";


interface HandleSearchAction {
    type: typeof HANDLE_SEARCH;
    payload: string;
}


export const fetchCarDetails = (key: string) => dispatch => {
dispatch({ type: FETCH_CAR_DETAILS_START})
    fetchCarDataByMake(key).then((payload) => {
        dispatch({ type: FETCH_CAR_DETAILS_SUCCESS, payload });
    }).catch((error) => {
        dispatch({ type: FETCH_CAR_DETAILS_FAILURE, payload: {} });
        console.error(error);
    })

}


export const fetchCarList = () => dispatch => {
    dispatch({ type: FETCH_CAR_LIST_START });
    fetchCarListFromJson().then((payload) => {
            dispatch({ type: FETCH_CAR_LIST_SUCCESS, payload });
        }).catch((error) => {
            dispatch({ type: FETCH_CAR_LIST_FAILURE });
            console.error(error);
        })
}


export const handleSearch = (searchTerm: string): HandleSearchAction => ({
    type: HANDLE_SEARCH,
    payload: searchTerm,
});


