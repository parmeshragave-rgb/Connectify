
import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import Quotereducer from "./Quotes/QuotesReducer";
import UserReducer from "./Users/userReducer";
import likeReducer from "./LikedPost/LikedPostReducer";



const rootReducer = combineReducers({
  auth: authReducer,
  quotes:Quotereducer,
  users:UserReducer,
  like:likeReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof rootReducer;
export default rootReducer;
