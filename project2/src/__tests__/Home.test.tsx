import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Pages/Home";
import axios from "axios";
import configureStore from "redux-mock-store";
import { likePost, dislikePost } from "../Redux/LikedPost/LikedPostActions";

import { Provider } from "react-redux";

jest.mock("axios");

jest.mock("../Redux/Users/userActions", () => ({
 
  fetchUsersData: () => ({ type: "FETCH_USERS" }),
}));

jest.mock("../Redux/LikedPost/LikedPostActions", () => ({
  likePost: jest.fn(() => ({ type: "LIKE_POST" })),
  dislikePost: jest.fn(() => ({ type: "DISLIKE_POST" })),
}));


jest.mock("../Components/ReusableCard", () => (props: any) => (
  <div data-testid="postcard-mock">
    <div>{props.post.title}</div>
    <button data-testid="like-btn" onClick={() => props.handleLike(props.post)}>Like</button>
    <button data-testid="dislike-btn" onClick={() => props.handleDislike(props.post)}>Dislike</button>
    <button data-testid="open-btn" onClick={() => props.clickhandler(props.post.id)}>Open</button>
    <div data-testid="isLiked">{props.isLiked(props.post.id) ? "Liked" : "NotLiked"}</div>
    <div data-testid="isDisliked">{props.isDisLiked(props.post.id) ? "Disliked" : "NotDisliked"}</div>
  </div>
));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));


const mockStore = configureStore([]);

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.setItem = jest.fn();
});

describe("Home Component", () => {
  test("renders posts ", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        posts: [
          {
            id: 1,
            title: "title",
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
      users: { userdata: [{ id: 100, firstName: "Tknendwdw", image: "" }] },
      like: { likedPosts: [], dislikedPosts: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
 
    expect(await screen.findByText(/title/i)).toBeInTheDocument();
    expect(screen.getByTestId("postcard-mock")).toBeInTheDocument();
    


  });

 

  test("like, dislike, clickhandler and liked/disliked helpers work", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        posts: [
          {
            id: 1,
            title: "Integration Post",
            body: "Body text",
            views: 42,
            reactions: { likes: 2, dislikes: 0 },
            userId: 99,
          },
        ],
      },
    });

    const store = mockStore({
      auth: { user: { email: "me@test.com" } },
      users: { userdata: [{ id: 99, firstName: "Test", image: "" }] },
      like: { likedPosts: [{ id: 1, likedBy: "me@test.com" }], dislikedPosts: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/integration post/i)).toBeInTheDocument();

   
    expect(screen.getByTestId("isLiked").textContent).toBe("Liked");
    expect(screen.getByTestId("isDisliked").textContent).toBe("NotDisliked");

    const likeBtn = screen.getByTestId("like-btn");
    const dislikeBtn = screen.getByTestId("dislike-btn");
    const openBtn = screen.getByTestId("open-btn");

    fireEvent.click(likeBtn);
    fireEvent.click(dislikeBtn);
    fireEvent.click(openBtn);

    expect(likePost).toHaveBeenCalled();
    expect(dislikePost).toHaveBeenCalled();

    
    expect(mockNavigate).toHaveBeenCalledWith("/post/1");
  });


});