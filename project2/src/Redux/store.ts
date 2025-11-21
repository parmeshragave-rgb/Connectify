import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./index"
import { persistStore, persistReducer } from "redux-persist";



const storage = {
          getItem: (key: string) =>
            Promise.resolve(window.localStorage.getItem(key)),

          setItem: (key: string, value: string) => {
            window.localStorage.setItem(key, value);
            return Promise.resolve();
          },
          
          removeItem: (key: string) => {
            window.localStorage.removeItem(key);
            return Promise.resolve();
          },
        };

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
