import { render, screen, fireEvent } from "@testing-library/react";
import PostDetailPage from "../Pages/PostDetailPage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {thunk} from "redux-thunk";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { likePost, dislikePost } from "../Redux/LikedPost/LikedPostActions";

jest.mock("axios");

jest.mock("../Redux/LikedPost/LikedPostActions", () => ({
  likePost: jest.fn(() => ({ type: "LIKE_POST" })),
  dislikePost: jest.fn(() => ({ type: "DISLIKE_POST" })),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockStore = configureStore([thunk]);

const renderWithStore = (store, id = "1") =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <PostDetailPage />
      </BrowserRouter>
    </Provider>
  );

describe("PostDetailPage Test", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  test("renders post and comments", async () => {
    axios.get
      .mockResolvedValueOnce({
        data: { id: 1, title: "Test Post", body: "Post Body", reactions: { likes: 5, dislikes: 2 } }
      })
      .mockResolvedValueOnce({
        data: {
          comments: [
            {
              id: 1,
              body: "Backend comment",
              likes: 3,
              user: { id: 10, username: "john", fullName: "John Doe" }
            }
          ]
        }
      });

    const store = mockStore({
      like: { likedPosts: [], dislikedPosts: [] },
      auth: { user: { email: "test@gmail.com", username: "tester" } },
    });

    renderWithStore(store);

   
    expect(await screen.findByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Post Body")).toBeInTheDocument();

    expect(await screen.findByText("Backend comment")).toBeInTheDocument();
    expect(await screen.findByText("@john")).toBeInTheDocument();
    const userbtn=await screen.findByText("@john")
    fireEvent.click(userbtn)
  expect(mockNavigate).toHaveBeenCalledWith("/userprofile/10");
  const avatarbtn=await screen.findByTestId("avatar")
    fireEvent.click(avatarbtn)
  expect(mockNavigate).toHaveBeenCalledWith("/userprofile/10");

    const localuserbtn=await screen.findByTestId("usernamelocal")
    fireEvent.click(localuserbtn)

  expect(mockNavigate).toHaveBeenCalledWith("/profile");
   


  });

  test("like button calls likePost", async () => {
    axios.get.mockResolvedValueOnce({
      data: { id: 1, title: "Test Post", body: "Post Body", reactions: { likes: 5, dislikes: 2 } }
    });

    axios.get.mockResolvedValueOnce({ data: { comments: [] } });

    const store = mockStore({
      like: { likedPosts: [], dislikedPosts: [] },
      auth: { user: { email: "test@gmail.com", username: "tester" } },
    });

    renderWithStore(store);

    const likeBtn = screen.getByTestId("likeButton");
    fireEvent.click(likeBtn);

    expect(likePost).toHaveBeenCalledTimes(1);
  });

  test("dislike button calls dislikePost", async () => {
    axios.get.mockResolvedValueOnce({
      data: { id: 1, title: "Test Post", body: "Post Body", reactions: { likes: 5, dislikes: 2 } }
    });

    axios.get.mockResolvedValueOnce({ data: { comments: [] } });

    const store = mockStore({
      like: { likedPosts: [], dislikedPosts:[] },
      auth: { user: { email: "test@gmail.com", username: "tester" } },
    });

    renderWithStore(store);

    
    const dislikeBtn =screen.getByTestId("dislikeButton");
     

    fireEvent.click(dislikeBtn);

    expect(dislikePost).toHaveBeenCalledTimes(1);
  });

  test("add comment works", async () => {
    axios.get.mockResolvedValueOnce({
      data: { id: 1, title: "Test Post", body: "Post Body", reactions: { likes: 5, dislikes: 2 } }
    });

    axios.get.mockResolvedValueOnce({ data: { comments: [] } });

    const store = mockStore({
      like: { likedPosts: [], dislikedPosts: [] },
      auth: { user: { email: "test@gmail.com", username: "tester" } },
    });

    renderWithStore(store);

    const input = await screen.findByPlaceholderText("Add comment");
    fireEvent.change(input, { target: { value: "Nice post!" } });

    const addBtn = screen.getByText("Add Comment");
    fireEvent.click(addBtn);

    expect(screen.getByText("@tester")).toBeInTheDocument();
    expect(screen.getByText("Nice post!")).toBeInTheDocument();
  });
});