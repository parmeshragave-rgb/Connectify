import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../Components/ErrorBoundary";


const Boom = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  test("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <div>Child OK</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Child OK")).toBeInTheDocument();
  });

  test("renders fallback UI when error occurs", () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );

    expect(
      screen.getByText("Something went Wrong!!!")
    ).toBeInTheDocument();
  });

  test("componentDidCatch is called", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );

    expect(spy).toHaveBeenCalled(); 
    spy.mockRestore();
  });
});