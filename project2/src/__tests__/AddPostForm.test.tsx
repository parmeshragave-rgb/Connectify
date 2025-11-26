import { render, screen, fireEvent } from "@testing-library/react";
import AddPostForm from "../Components/AddPostForm";

describe("AddPostForm Component", () => {
  test("shows validation errors when empty and does not submit", () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();

    render(<AddPostForm open={true} onClose={onClose} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByText(/Add Post/i));

    expect(screen.getByText(/Enter title/i)).toBeInTheDocument();
    expect(screen.getByText(/Enter content/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  test("shows length validation and prevents submit", () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();

    render(<AddPostForm open={true} onClose={onClose} onSubmit={onSubmit} />);

    const titleInput = screen.getByPlaceholderText(/Enter title/i);
    const bodyInput = screen.getByPlaceholderText(/Post Body/i);

    fireEvent.change(titleInput, { target: { value: "x".repeat(40) } });
    fireEvent.change(bodyInput, { target: { value: "y".repeat(200) } });

    fireEvent.click(screen.getByText(/Add Post/i));

    expect(screen.getByText(/Title must be within 30 chars/i)).toBeInTheDocument();
    expect(screen.getByText(/Body must be within 180 chars/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("submits valid data and closes dialog", () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();

    render(<AddPostForm open={true} onClose={onClose} onSubmit={onSubmit} />);

    const titleInput = screen.getByPlaceholderText(/Enter title/i);
    const bodyInput = screen.getByPlaceholderText(/Post Body/i);

    fireEvent.change(titleInput, { target: { value: "My title" } });
    fireEvent.change(bodyInput, { target: { value: "some body text" } });

    fireEvent.click(screen.getByText(/Add Post/i));

    expect(onSubmit).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
    const submitted = onSubmit.mock.calls[0][0];
    expect(submitted).toMatchObject({ title: "My title", body: "some body text" });
  });
});
