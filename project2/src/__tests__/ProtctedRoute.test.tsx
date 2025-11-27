import React from "react";
import { render, screen } from "@testing-library/react";
import ProtectedRoute from "../Components/ProtectedRoute";
import { useSelector } from "react-redux";


jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));


jest.mock("react-router-dom", () => ({
  Navigate: () => <div>Redirected</div>,
}));

describe("ProtectedRoute", () => {
  test("renders children when authenticated", () => {
    (useSelector as jest.Mock).mockReturnValue({ isAuthenticated: true });

    render(
      <ProtectedRoute>
        <div>Children component</div>
      </ProtectedRoute>
    );

    expect(screen.getByText("Children component")).toBeInTheDocument();
  });

  test("redirects to login when not authenticated", () => {
    (useSelector as jest.Mock).mockReturnValue({ isAuthenticated: false });

    render(
      <ProtectedRoute>
        <div>Children component</div>
      </ProtectedRoute>
    );

    expect(screen.getByText("Redirected")).toBeInTheDocument();
  });
});