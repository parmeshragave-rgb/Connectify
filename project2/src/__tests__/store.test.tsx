
import type { Persistor } from "redux-persist";

describe("redux store persist setup", () => {
  const ORIGINAL_LOCALSTORAGE = { ...window.localStorage };

  beforeEach(() => {
    jest.resetModules();

    const mockGetItem = jest.fn().mockImplementation((key: string) => {
      return `value-for-${key}`;
    });
    const mockSetItem = jest.fn().mockImplementation((_k: string, _v: string) => {});
    const mockRemoveItem = jest.fn().mockImplementation((_k: string) => {});

    window.localStorage = {
      getItem: mockGetItem,
      setItem: mockSetItem,
      removeItem: mockRemoveItem,
      length: 0,
      key: jest.fn(),
      clear: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
    
    window.localStorage = ORIGINAL_LOCALSTORAGE;
  });

  test("calls persistReducer with correct persistConfig ", async () => {
    const persistReducerMock = jest.fn((config: any, reducer: any) => reducer);
    const persistStoreMock = jest.fn(() => ({} as Persistor));

    jest.doMock("redux-persist", () => ({
      persistReducer: persistReducerMock,
      persistStore: persistStoreMock,
    }));

    jest.doMock("redux-thunk", () => ({
      thunk: () => (next: any) => (action: any) => next(action),
    }));

    
    const mod = await import("../Redux/store"); 

    const { store, persistor } = mod as {
      store: { dispatch: Function; getState: Function };
      persistor: any;
    };

    expect(persistReducerMock).toHaveBeenCalledTimes(1);
    const persistConfig = persistReducerMock.mock.calls[0][0];

    expect(persistConfig).toBeDefined();
    expect(persistConfig.key).toBe("root");
    expect(Array.isArray(persistConfig.whitelist)).toBe(true);
    expect(persistConfig.whitelist).toEqual(["auth", "like"]);
    expect(persistConfig.storage).toBeDefined();

    const getItemResult = await persistConfig.storage.getItem("my-key");
    expect(getItemResult).toBe("value-for-my-key");
    expect(window.localStorage.getItem).toHaveBeenCalledWith("my-key");

    await expect(persistConfig.storage.setItem("k", "v")).resolves.toBeUndefined();
    expect(window.localStorage.setItem).toHaveBeenCalledWith("k", "v");

    await expect(persistConfig.storage.removeItem("k")).resolves.toBeUndefined();
    expect(window.localStorage.removeItem).toHaveBeenCalledWith("k");

    expect(store).toBeDefined();
    expect(typeof store.dispatch).toBe("function");
    expect(persistStoreMock).toHaveBeenCalledTimes(1);
    expect(persistor).toBeDefined();
  });

  test("store dispatch ", async () => {
    
    const persistReducerMock = jest.fn((config: any, reducer: any) => reducer);
    const persistStoreMock = jest.fn(() => ({ purge: jest.fn() } as any));

    jest.doMock("redux-persist", () => ({
      persistReducer: persistReducerMock,
      persistStore: persistStoreMock,
    }));

    jest.doMock("redux-thunk", () => ({
      thunk: () => (next: any) => (action: any) => next(action),
    }));

    const { store } = await import("../Redux/store");

   
    expect(() => {
      store.dispatch({ type: "SOME_TEST_ACTION" });
    }).not.toThrow();

    
    expect(typeof store.getState).toBe("function");
    const state = store.getState();
    expect(state).toBeDefined();
  });
});