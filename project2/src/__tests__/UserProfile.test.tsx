import { render, screen ,fireEvent} from "@testing-library/react";
import UserProfile from "../Pages/UserProfile";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { likePost, dislikePost } from "../Redux/LikedPost/LikedPostActions";


jest.mock("axios");
jest.mock("../Redux/LikedPost/LikedPostActions", () => ({
  likePost: jest.fn(() => ({ type: "LIKE_POST" })),
  dislikePost: jest.fn(() => ({ type: "DISLIKE_POST" })),
}));
const mockStore = configureStore([]);
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
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


describe("UserProfile Component", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test("fetches user info and posts", async () => {
    const store = mockStore({
      auth: { user: { email: "demo@gmail.com", username: "tester" } },
      like: { likedPosts: [], dislikedPosts: [] },
    });

    (axios.get as jest.Mock)
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
    expect(screen.getByText("John Doe")).toBeInTheDocument();

  });


    test("like, dislike, clickhandler and liked/disliked helpers work", async () => {
    (axios.get as jest.Mock)
      .mockResolvedValueOnce({
        data: {
          posts: [
            {
              id: 1,
              title: "Post 1",
              body: "Body text",
              views: 42,
              reactions: { likes: 2, dislikes: 0 },
              userId: 99,
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          id: 99,
          firstName: "Test",
          lastName: "User",
          username: "test",
          image: "",
          company: { name: "X", title: "Dev" },
          birthDate: "1990-01-01",
        },
      });

    const store = mockStore({
      auth: { user: { email: "me@test.com" } },
      users: { userdata: [{ id: 99, firstName: "Test", image: "" }] },
      like: { likedPosts: [{ id: 1, likedBy: "me@test.com" }], dislikedPosts: [] },
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

    expect(await screen.findByText(/Post 1/i)).toBeInTheDocument();

   
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
