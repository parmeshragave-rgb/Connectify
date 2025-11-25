import {
  LIKE_POST,
  DISLIKE_POST,
  likePost,
  dislikePost,
} from "../Redux/LikedPost/LikedPostActions";

describe("LikedPost Actions", () => {
  test("likePost returns correct object", () => {
    const post = { id: 1, title: "Post 1" };
    const email = "parmesh@mail.com";

    const action = likePost(post, email);

    expect(action).toEqual({
      type: LIKE_POST,
      payload: post,
      userEmail: email,
    });
  });

  test("dislikePost returns correct action object", () => {
    const post = { id: 2, title: "Post 2" };
    const email = "parmesh@mail.com";

    const action = dislikePost(post, email);

    expect(action).toEqual({
      type: DISLIKE_POST,
      payload: post,
      userEmail: email,
    });
  });
});