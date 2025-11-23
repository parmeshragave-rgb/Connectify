import { FETCH_QUERY,FETCH_QUERY_FAILURE,FETCH_QUERY_SUCCESS } from "./QuotesActions"

interface QuotesInitialState{
    loading:boolean,
    quotes:any[],
    error:string
}

const quotesInitialState :QuotesInitialState ={
    loading:false,
    quotes:[],
    error:""
}

const Quotereducer =(state=quotesInitialState,action) => {
    switch(action.type){
        case FETCH_QUERY :
            return{
                ...state,loading:true
            }

        case FETCH_QUERY_SUCCESS:
            return{
                   ...state,loading:false,
                   quotes:action.payload,
                   error:''
            }

        case FETCH_QUERY_FAILURE:
            return{
                ...state,
                loading:false,
                quotes:[],
                error:action.payload
            }    
           default:
      return state; 
    }
}

export default Quotereducer
