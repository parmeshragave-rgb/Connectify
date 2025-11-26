import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "../Pages/Profile";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { likePost,dislikePost } from "../Redux/LikedPost/LikedPostActions";

const mockStore = configureStore([]);

jest.mock("../Redux/LikedPost/LikedPostActions", () => ({
  likePost: jest.fn(() => ({ type: "LIKE_POST" })),
  dislikePost: jest.fn(() => ({ type: "DISLIKE_POST" })),
}));

jest.mock("../Components/ReusableCard", () => (props) => (
  <div data-testid="postcard">
    <p>{props.post.title}</p>
    <p>{props.post.body}</p>
     <button data-testid="like-btn" onClick={() => props.handleLike(props.post)}>Like</button>
    <button data-testid="dislike-btn" onClick={() => props.handleDislike(props.post)}>Dislike</button>
     <div data-testid="isLiked">{props.isLiked(props.post.id) ? "Liked" : "NotLiked"}</div>
    <div data-testid="isDisliked">{props.isDisLiked(props.post.id) ? "Disliked" : "NotDisliked"}</div>
    <button data-testid="Delete" onClick={() => props.onDelete(props.post)}>Delete</button>
  </div>
));

jest.mock("../Components/AddPostForm", () => () => (
  <div data-testid="addform">Add Form</div>
));


beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() =>
    JSON.stringify([{ id: 1, title: "Test Post",body:"qwerty" }])
  );
  Storage.prototype.setItem = jest.fn();
});

describe("Profile Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {
          username: "parmesh",
          email: "parmesh@gmail.com",
        },
      },
      like: {
        likedPosts: [],
        dislikedPosts: [],
      },
    });
  });

  const renderWithStore = () =>
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

  test("renders user profile info", () => {
    renderWithStore();

    expect(screen.getByText("parmesh")).toBeInTheDocument();
    expect(screen.getByText("parmesh@gmail.com")).toBeInTheDocument();
  });

  test("loads posts from localStorage", () => {
    renderWithStore();
     
    expect(screen.getByTestId("postcard")).toBeInTheDocument();
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  test("deletes a post", () => {
    renderWithStore();

    const deleteBtn = screen.getByTestId("Delete");
    fireEvent.click(deleteBtn);

    
    expect(screen.queryByTestId("postcard")).not.toBeInTheDocument();
  });

  test("likes and  dislikes", () => {
    renderWithStore();
    const likeBtn = screen.getByTestId("like-btn");

    const dislikeBtn = screen.getByTestId("dislike-btn");
    fireEvent.click(likeBtn)
    fireEvent.click(dislikeBtn)

    expect(likePost).toHaveBeenCalled()
    expect(dislikePost).toHaveBeenCalled()
   


  })
});