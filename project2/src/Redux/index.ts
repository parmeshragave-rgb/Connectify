
import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import Quotereducer from "./Quotes/QuotesReducer";
import UserReducer from "./Users/userReducer";



const rootReducer = combineReducers({
  auth: authReducer,
  quotes:Quotereducer,
  users:UserReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
