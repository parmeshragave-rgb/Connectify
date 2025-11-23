import axios from "axios"

export const FETCH_USERS="FETCH_USERS"
export const FETCH_USERS_SUCCESS="FETCH_USERS_SUCCESS"
export const FETCH_USERS_FAILURE="FETCH_USERS_FAILURE"

export interface FetchUsers{
    type:typeof FETCH_USERS
}
export interface FetchUsersSuccess{
    type:typeof FETCH_USERS_SUCCESS,
    payload:any []
}

export interface FetchUsersFailure{
    type:typeof FETCH_USERS_FAILURE
    payload:string
}

export const fetchUsersSucess =(usersdata) :FetchUsersSuccess => {
    return{
       type:FETCH_USERS_SUCCESS,
       payload:usersdata
    }
}

export const fetchUsersFailure =(error) :FetchUsersFailure => {
    return{
       type:FETCH_USERS_FAILURE,
       payload:error
    }
}
export const fetchUsers =() :FetchUsers => {
    return{
       type:FETCH_USERS,
      
    }
}

export const fetchUsersData = () => {
    return (dispatch) => {
        dispatch(fetchUsers())
        axios.get(`https://dummyjson.com/users/?limit=0`)
        .then((res) => {
            const usersdata=res.data.users
            dispatch(fetchUsersSucess(usersdata))
        })
        .catch((error) => {
            const err=error.message
            dispatch(fetchUsersFailure(err))
        })
    }
}