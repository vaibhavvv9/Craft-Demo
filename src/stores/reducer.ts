import { State } from "../helpers/types.ts";
import { ADD_TO_COMPARE, FETCH_CAR_DETAILS_FAILURE, FETCH_CAR_DETAILS_START, FETCH_CAR_DETAILS_SUCCESS, FETCH_CAR_LIST_FAILURE, FETCH_CAR_LIST_START, FETCH_CAR_LIST_SUCCESS, HANDLE_SEARCH, REMOVE_FROM_COMPARE } from "./actiontypes.ts";




const initialState: State = {
  search: '',
  list: {
    items: [],
    loading: false,
    error: false
  },
  details: {
    info: {},
    loading: false,
    error: false
  },
  compare: {},
}

export const carReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_CAR_LIST_START:
          return {
              ...state,
              list: {
                  ...state.list,
                  loading: true
              }
          };


      case FETCH_CAR_LIST_SUCCESS:
          return {
              ...state,
              list: {
                  items: action.payload,
                  loading: false,
                  error: false
              }
          };


      case FETCH_CAR_LIST_FAILURE:
          return {
              ...state,
              list: {
                  ...state.list,
                  loading: false,
                  error: true
              }
          };


       case FETCH_CAR_DETAILS_START: 
       return {
              ...state,
              details: {
                ...state.details,
                loading: true,
                error: false
              }
         };   


        case FETCH_CAR_DETAILS_SUCCESS:
            return {
                ...state,
                details: {
                    info: action.payload,
                    loading: false,
                    error: false
                }
                };
                
                
         case FETCH_CAR_DETAILS_FAILURE:
            return {
                ...state,
                details: {
                    ...state.details,
                    info: {},
                    loading: false,
                    error: true
                }
            };       


    

          case HANDLE_SEARCH:
          return {
              ...state,
              search: action.payload
          };


          case ADD_TO_COMPARE:
            return {
              ...state,
              compare: {
                ...state.compare,
                [action.payload.key]: action.payload.value,
              },
            };


         case REMOVE_FROM_COMPARE:
            const { [action.payload]: deletedKey, ...restCompare } = state.compare;
            return {
              ...state,
              compare: restCompare,
            };
         


      default:
          return state;
  }
};

// 5. Export the Reducer
export default carReducer;
