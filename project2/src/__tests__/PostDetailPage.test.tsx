
import { render, screen } from "@testing-library/react";
import PostDetailPage from "../Pages/PostDetailPage";
import axios from "axios";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("axios");
const mockStore = configureStore([]);

describe("PostDetailPage Component", () => {
  test("renders post & comments from mocked axios", async () => {
    const store = mockStore({
      auth: {
        user: { email: "test@mail.com", username: "tester" }
      }
    });

    
    axios.get.mockResolvedValueOnce({
      data: {
        id: 1,
        title: "Mock Post Title",
        body: "Mock post content",
        reactions: { likes: 5, dislikes: 2 }
      }
    });

 
    axios.get.mockResolvedValueOnce({
      data: {
        comments: [
          {
            id: 10,
            body: "Awesome post!",
            likes: 3,
            user: {
              id: 77,
              fullName: "John Doe",
              username: "john"
            }
          }
        ]
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/post/1"]}>
          <Routes>
            <Route path="/post/:id" element={<PostDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

   
    expect(await screen.findByText("Mock Post Title")).toBeInTheDocument();

   
    expect(screen.getByText("Mock post content")).toBeInTheDocument();

    
    expect(await screen.findByText("@john")).toBeInTheDocument();
    expect(screen.getByText("Awesome post!")).toBeInTheDocument();
  });
});