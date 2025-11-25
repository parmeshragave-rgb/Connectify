import { render, screen, fireEvent } from "@testing-library/react";
import LikedPage from "../Pages/LikedPosts";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { likePost } from "../Redux/LikedPost/LikedPostActions";

jest.mock("../Redux/LikedPost/LikedPostActions", () => ({
  likePost: jest.fn(() => ({ type: "LIKE_POST" })),
}));
jest.mock("../Redux/Users/userActions", () => ({
  fetchUsersData: jest.fn(() => ({ type: "FETCH_USERS" })),
}));

const mockStore = configureStore([thunk]);

describe("LikedPage Component", () => {
  const renderLiked = (store) =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LikedPage />
        </BrowserRouter>
      </Provider>
    );

  test("shows 'No liked posts yet.' when empty", () => {
    const store = mockStore({
      like: { likedPosts: [] },
      auth: { user: { email: "parmesh@gmail.com" } },
      users: { userdata: [] },
    });

    renderLiked(store);

    expect(screen.getByText("No liked posts yet.")).toBeInTheDocument();
  });

  test("renders liked posts", () => {
    const store = mockStore({
      like: {
        likedPosts: [
          {
            id: 1,
            title: "Test Post",
            body: "Post Body",
            views: 20,
            likedBy: "parmesh@gmail.com",
            userId: 10,
          },
        ],
      },
      auth: { user: { email: "parmesh@gmail.com" } },
      users: { userdata: [{ id: 10, image: "" }] },
    });

    renderLiked(store);

    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Post Body")).toBeInTheDocument();
  });

  test("clicking Remove dispatches likePost", () => {
    const store = mockStore({
      like: {
        likedPosts: [
          {
            id: 1,
            title: "Test Post",
            body: "Post Body",
            likedBy: "parmesh@gmail.com",
            userId: 10,
          },
        ],
      },
      auth: { user: { email: "parmesh@gmail.com" } },
      users: { userdata: [{ id: 10, image: "" }] },
    });

    renderLiked(store);

    const removeBtn = screen.getByText("Remove");
    fireEvent.click(removeBtn);

    expect(likePost).toHaveBeenCalledTimes(1);
  });

  test("fetchUsersData should be dispatched on mount", () => {
    const store = mockStore({
      like: { likedPosts: [] },
      auth: { user: { email: "parmesh@gmail.com" } },
      users: { userdata: [] },
    });

    renderLiked(store);

    const actions = store.getActions();
    expect(actions.some((a) => a.type === "FETCH_USERS")).toBe(true);
  });
});