import axios from "axios";
export const FETCH_QUERY="FETCH_QUERY"
export const FETCH_QUERY_SUCCESS="FETCH_QUERY_SUCCESS"
export const FETCH_QUERY_FAILURE="FETCH_QUERY_FAILURE"


export interface FetchQuerySucess{
    type: typeof FETCH_QUERY_SUCCESS;
    payload:any [];
}


export interface FetchQueryFailure{
    type: typeof FETCH_QUERY_FAILURE;
    payload:string
}

export interface FetchQuery{
    type: typeof FETCH_QUERY;
    
}

export const fetchQuerySuccess = (quotes):FetchQuerySucess => {
    return {
        type:FETCH_QUERY_SUCCESS,
        payload:quotes
}
}

export const fetchQueryFailure = (error):FetchQueryFailure => {
    return {
        type:FETCH_QUERY_FAILURE,
        payload:error
}
}

export const fetchQuery = ():FetchQuery => {
    return {
        type:FETCH_QUERY,
       
}
}

export const fetchQuerydata = () => {
   return (dispatch) => {
         dispatch(fetchQuery())
         axios.get("https://dummyjson.com/quotes")
         .then((res) => {
            const quotes=res.data.quotes
            dispatch(fetchQuerySuccess(quotes))
         })
         .catch((error) => {
            const err=error.message
            dispatch(fetchQueryFailure(err))

         })
    }
};