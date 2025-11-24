import { render, screen } from "@testing-library/react";
import UserProfile from "../Pages/UserProfile";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

jest.mock("axios");
const mockStore = configureStore([]);
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("UserProfile Component", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test("fetches user info and posts", async () => {
    const store = mockStore({
      auth: { user: { email: "demo@gmail.com", username: "tester" } },
    });

    axios.get
      .mockResolvedValueOnce({
        data: {
          posts: [
            {
              id: 101,
              title: "Post 1",
              body: "Body 1",
              views: 5,
              reactions: { likes: 2, dislikes: 1 },
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          username: "john",
          image: "",
          company: { name: "ABC Corp", title: "Developer" },
          birthDate: "1990-01-01",
        },
      });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/userprofile/1"]}>
          <Routes>
            <Route path="/userprofile/:id" element={<UserProfile />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Body 1")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();

  });
});
