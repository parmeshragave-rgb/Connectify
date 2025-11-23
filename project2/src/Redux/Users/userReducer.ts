import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from "./userActions";

export interface IntialStateUsers {
  loading: boolean;
  userdata: any[];
  error: "";
}

const intialStateUsers: IntialStateUsers = {
  loading: false,
  userdata: [],
  error: "",
};

const UserReducer = (state=intialStateUsers,action) => {
    switch(action.type){
        case FETCH_USERS:
            return{
                ...state,
                loading:true
            }
        
        case FETCH_USERS_SUCCESS:
            return{
                ...state,
                loading:false,
                userdata:action.payload,
                error:""
            }
       case FETCH_USERS_FAILURE:
        return{
              ...state,
                loading:false,
                userdata:[],
                error:action.payload,
        }     

             default:
      return state; 
    }
}

export default UserReducer