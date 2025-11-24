
jest.mock("axios");

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Pages/Home";
import axios from "axios";
import configureStore from "redux-mock-store";
import {thunk} from "redux-thunk";
import { Provider } from "react-redux";


jest.mock("../Redux/Users/userActions", () => ({
  fetchUsersData: () => jest.fn(),
}));


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.setItem = jest.fn();
});

describe("Home Component", () => {
  test("renders posts from axios mock", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        posts: [
          {
            id: 1,
            title: "Mock Post 1",
            body: "Body text",
            views: 20,
            reactions: { likes: 5, dislikes: 1 },
            userId: 100,
          },
        ],
      },
    });

    const store = mockStore({
      auth: { user: { email: "test@test.com" } },
      users: { userdata: [{ id: 100, firstName: "T", image: "" }] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/mock post 1/i)).toBeInTheDocument();
  });
});