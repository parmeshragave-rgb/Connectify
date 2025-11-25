import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "../Pages/Profile";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

jest.mock("../Components/ReusableCard", () => (props) => (
  <div data-testid="postcard">
    <p>{props.post.title}</p>
    <button onClick={() => props.onDelete(props.post)}>Delete</button>
  </div>
));

jest.mock("../Components/AddPostForm", () => () => (
  <div data-testid="addform">Add Form</div>
));


beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() =>
    JSON.stringify([{ id: 1, title: "Test post" }])
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

    const deleteBtn = screen.getByText("Delete");
    fireEvent.click(deleteBtn);

    
    expect(screen.queryByTestId("postcard")).not.toBeInTheDocument();
  });
});