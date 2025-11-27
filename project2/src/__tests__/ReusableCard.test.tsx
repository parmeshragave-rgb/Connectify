import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import ReusableCard from "../Components/ReusableCard";

const mockStore = configureStore([]);

describe("ReusableCard", () => {
  const post = { id: 10, title: "Hello", body: "test body", views: 7, reactions: { likes: 2, dislikes: 1 }, userId: 2 };
  const userdata = [{ id: 2, firstName: "parmesh", image: "" }];

  test("renders title, views, and avatar initial", () => {
    const store = mockStore({ auth: { user: { username: "parmesh" } } });
    render(
      <Provider store={store}>
        <ReusableCard post={post} userdata={userdata} handleLike={() => {}} handleDislike={() => {}} isLiked={() => false} isDisLiked={() => false} clickhandler={() => {}} navigate={() => {}} />
      </Provider>
    );

    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
    expect(screen.getByText(/7 views/i)).toBeInTheDocument();
    expect(screen.getByText(/b/i)).toBeInTheDocument();
  });

  test("like/dislike counts", () => {
    const store = mockStore({ auth: { user: { username: "parmesh" } } });
    const handleLike = jest.fn();
    const handleDislike = jest.fn();
    const clickhandler = jest.fn();
    const navigate = jest.fn();

    render(
      <Provider store={store}>
        <ReusableCard post={post} userdata={userdata} handleLike={handleLike} handleDislike={handleDislike} isLiked={() => true} isDisLiked={() => false} clickhandler={clickhandler} navigate={navigate} />
      </Provider>
    );

    const likeBtn = screen.getByTestId("likeButton");
    const dislikeBtn = screen.getByTestId("dislikeButton");

    fireEvent.click(likeBtn);
    expect(handleLike).toHaveBeenCalledWith(post);

    fireEvent.click(dislikeBtn);
    expect(handleDislike).toHaveBeenCalledWith(post);

    fireEvent.click(screen.getByText(/test body/i));
    expect(clickhandler).toHaveBeenCalledWith(post.id);
  });

  // test("avatar click navigates to user profile and shows updated counts when liked/disliked", () => {
  //   const store = mockStore({ auth: { user: { username: "parmesh" } } });
  //   const navigate = jest.fn();

  //   render(
  //     <Provider store={store}>
  //       <ReusableCard post={post} userdata={userdata} handleLike={() => {}} handleDislike={() => {}} isLiked={() => true} isDisLiked={() => true} clickhandler={() => {}} navigate={navigate} />
  //     </Provider>
  //   );

  //   const avatar = screen.getByText(/b/i);
  //   fireEvent.click(avatar);
  //   expect(navigate).toHaveBeenCalledWith(`/userprofile/${userdata[0].id}`);

  //   expect(screen.getByText("3")).toBeInTheDocument();
  //   expect(screen.getByText("2")).toBeInTheDocument();
  // });

  test("delete button shows and calls onDelete when enabled", () => {
    const store = mockStore({ auth: { user: { username: "parmesh" } } });
    const onDelete = jest.fn();

    render(
      <Provider store={store}>
        <ReusableCard post={post} userdata={userdata} handleLike={() => {}} handleDislike={() => {}} isLiked={() => false} isDisLiked={() => false} clickhandler={() => {}} navigate={() => {}} showDelete={true} onDelete={onDelete} />
      </Provider>
    );

    const delBtn = screen.getByTestId("Delete");
    expect(delBtn).toBeInTheDocument();
    fireEvent.click(delBtn);
    expect(onDelete).toHaveBeenCalledWith(post);
  });
});