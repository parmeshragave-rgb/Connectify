import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";


(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder as any;


// import { render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";

// jest.mock("react-redux", () => ({
//   useSelector: jest.fn(),
// }));

// const mockUseSelector = require("react-redux").useSelector;

// jest.mock("./Components/Navbar", () => () => <div>Mock Navbar</div>);
// jest.mock("./Pages/Home", () => () => <div>Mock Home</div>);
// jest.mock("./Pages/SearchUsers", () => () => <div>Mock Search Users</div>);
// jest.mock("./Pages/PostDetailPage", () => () => <div>Mock Post Detail</div>);
// jest.mock("./Pages/UserProfile", () => () => <div>Mock User Profile</div>);
// jest.mock("./Pages/LikedPosts", () => () => <div>Mock Liked Posts</div>);
// jest.mock("./Pages/QuotesPage", () => () => <div>Mock Quotes</div>);
// jest.mock("./Pages/Profile", () => () => <div>Mock Profile</div>);
// jest.mock("./Pages/Login", () => () => <div>Mock Login</div>);

// import App from "./App";

// describe("App with Protected Routes", () => {
//   test("renders navbar", () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: true });

//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(screen.getByText("Mock Navbar")).toBeInTheDocument();
//   });

//   test("authenticated: renders home page", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: true });

//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Home")).toBeInTheDocument();
//   });

//   test("unauthenticated: redirects home → login", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: false });

//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Login")).toBeInTheDocument();
//   });

//   test("authenticated: search users", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: true });

//     render(
//       <MemoryRouter initialEntries={["/search"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Search Users")).toBeInTheDocument();
//   });

//   test("unauthenticated: search users → login", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: false });

//     render(
//       <MemoryRouter initialEntries={["/search"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Login")).toBeInTheDocument();
//   });

//   test("authenticated: post detail", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: true });

//     render(
//       <MemoryRouter initialEntries={["/post/10"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Post Detail")).toBeInTheDocument();
//   });

//   test("unauthenticated: post detail → login", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: false });

//     render(
//       <MemoryRouter initialEntries={["/post/10"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Login")).toBeInTheDocument();
//   });

//   test("authenticated: user profile", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: true });

//     render(
//       <MemoryRouter initialEntries={["/userprofile/5"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock User Profile")).toBeInTheDocument();
//   });

//   test("unauthenticated: user profile → login", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: false });

//     render(
//       <MemoryRouter initialEntries={["/userprofile/5"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Login")).toBeInTheDocument();
//   });

//   test("authenticated: liked posts", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: true });

//     render(
//       <MemoryRouter initialEntries={["/liked"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Liked Posts")).toBeInTheDocument();
//   });

//   test("unauthenticated: liked posts → login", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: false });

//     render(
//       <MemoryRouter initialEntries={["/liked"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Login")).toBeInTheDocument();
//   });

//   test("authenticated: quotes", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: true });

//     render(
//       <MemoryRouter initialEntries={["/quotes"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Quotes")).toBeInTheDocument();
//   });

//   test("unauthenticated: quotes → login", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: false });

//     render(
//       <MemoryRouter initialEntries={["/quotes"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Login")).toBeInTheDocument();
//   });

//   test("authenticated: profile", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: true });

//     render(
//       <MemoryRouter initialEntries={["/profile"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Profile")).toBeInTheDocument();
//   });

//   test("unauthenticated: profile → login", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: false });

//     render(
//       <MemoryRouter initialEntries={["/profile"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Login")).toBeInTheDocument();
//   });

//   test("renders login page directly", async () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: false });

//     render(
//       <MemoryRouter initialEntries={["/login"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(await screen.findByText("Mock Login")).toBeInTheDocument();
//   });

//   test("renders no match page", () => {
//     mockUseSelector.mockReturnValue({ isAuthenticated: true });

//     render(
//       <MemoryRouter initialEntries={["/unknown"]}>
//         <App />
//       </MemoryRouter>
//     );

//     expect(screen.getByText("No Match Found")).toBeInTheDocument();
//   });
// });