import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";



  const mockUseSelector=jest.fn()

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
  useSelector:() => mockUseSelector,
}));



jest.mock("../Components/Navbar.tsx", () => () => <div>Mock Navbar</div>);
jest.mock("../Pages/Home.tsx", () => () => <div>Mock Home</div>);
jest.mock("../Pages/SearchUsers.tsx", () => () => <div>Mock Search Users</div>);
jest.mock("../Pages/PostDetailPage.tsx", () => () => <div>Mock Post Detail</div>);
jest.mock("../Pages/UserProfile.tsx", () => () => <div>Mock User Profile</div>);
jest.mock("../Pages/LikedPosts.tsx", () => () => <div>Mock Liked Posts</div>);
jest.mock("../Pages/QuotesPage.tsx", () => () => <div>Mock Quotes</div>);
jest.mock("../Pages/Profile.tsx", () => () => <div>Mock Profile</div>);
jest.mock("../Pages/Login.tsx", () => () => <div>Mock Login</div>);


describe("App with Protected Routes", () => {
  test("renders navbar", () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Navbar")).toBeInTheDocument();
  });

  test("renders home page", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Home")).toBeInTheDocument();
  });

  test("redirects login", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Login")).toBeInTheDocument();
  });

  test("search users", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/search"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Search Users")).toBeInTheDocument();
  });

  test("redirects login", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/search"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Login")).toBeInTheDocument();
  });

  test("post detail", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/post/10"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Post Detail")).toBeInTheDocument();
  });

  test("redirect login", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/post/10"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Login")).toBeInTheDocument();
  });

  test("user profile", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/userprofile/5"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock User Profile")).toBeInTheDocument();
  });

  test("redirect login", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/userprofile/5"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Login")).toBeInTheDocument();
  });

  test("liked posts", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/liked"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Liked Posts")).toBeInTheDocument();
  });

  test("reirects login", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/liked"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Login")).toBeInTheDocument();
  });

  test("quotes", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/quotes"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Quotes")).toBeInTheDocument();
  });

  test("redirects login", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/quotes"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Login")).toBeInTheDocument();
  });

  test("profile", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Profile")).toBeInTheDocument();
  });

  test("redirets login", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Login")).toBeInTheDocument();
  });

  test("renders login page directly", async () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText("Mock Login")).toBeInTheDocument();
  });

  test("renders no match page", () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("No Match Found")).toBeInTheDocument();
  });
});