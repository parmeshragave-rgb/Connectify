import axios from "axios";
export const FETCH_QUERY="FETCH_QUERY"


export interface fetchQuerySucess{
    type: typeof FETCH_QUERY;
}
export const fetchQuery= () :fetchQuerySucess =>({
    type:FETCH_QUERY
})

