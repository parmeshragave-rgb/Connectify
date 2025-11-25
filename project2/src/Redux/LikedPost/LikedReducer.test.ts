import likeReducer from "./LikedPostReducer";
import { LIKE_POST, DISLIKE_POST } from "./LikedPostActions";

const post1 = { id: 1, title: "Test Post" };
const post2 = { id: 2, title: "Another Post" };

describe("Like Reducer", () => {
  test("should return initial state", () => {
    const state = likeReducer(undefined, {});
    expect(state).toEqual({
      likedPosts: [],
      dislikedPosts: [],
    });
  });

  test("LIKE_POST adds post to likedPosts", () => {
    const action = {
      type: LIKE_POST,
      payload: post1,
      userEmail: "test@mail.com",
    };

    const state = likeReducer(undefined, action);

    expect(state.likedPosts).toEqual([
      { ...post1, likedBy: "test@mail.com" },
    ]);
    expect(state.dislikedPosts).toEqual([]);
  });

  test("LIKE_POST toggles (removes if already liked)", () => {
    const initial = {
      likedPosts: [{ ...post1, likedBy: "a@mail.com" }],
      dislikedPosts: [],
    };

    const action = {
      type: LIKE_POST,
      payload: post1,
      userEmail: "a@mail.com",
    };

    const state = likeReducer(initial, action);

   
    expect(state.likedPosts).toEqual([]);
  });

  test("DISLIKE_POST adds post to dislikedPosts", () => {
    const action = {
      type: DISLIKE_POST,
      payload: post2,
      userEmail: "b@mail.com",
    };

    const state = likeReducer(undefined, action);

    expect(state.dislikedPosts).toEqual([
      { ...post2, dislikedBy: "b@mail.com" },
    ]);

    expect(state.likedPosts).toEqual([]);
  });

  test("DISLIKE_POST toggles (removes if already disliked)", () => {
    const initial = {
      likedPosts: [],
      dislikedPosts: [{ ...post2, dislikedBy: "c@mail.com" }],
    };

    const action = {
      type: DISLIKE_POST,
      payload: post2,
      userEmail: "c@mail.com",
    };

    const state = likeReducer(initial, action);

    expect(state.dislikedPosts).toEqual([]);
  });

  test("LIKE_POST removes post from dislikedPosts", () => {
    const initial = {
      likedPosts: [],
      dislikedPosts: [{ ...post1, dislikedBy: "xyz@mail.com" }],
    };

    const action = {
      type: LIKE_POST,
      payload: post1,
      userEmail: "xyz@mail.com",
    };

    const state = likeReducer(initial, action);

    expect(state.dislikedPosts).toEqual([]);
    expect(state.likedPosts.length).toBe(1);
  });

  test("DISLIKE_POST removes post from likedPosts", () => {
    const initial = {
      likedPosts: [{ ...post2, likedBy: "x@mail.com" }],
      dislikedPosts: [],
    };

    const action = {
      type: DISLIKE_POST,
      payload: post2,
      userEmail: "x@mail.com",
    };

    const state = likeReducer(initial, action);

    expect(state.likedPosts).toEqual([]);
    expect(state.dislikedPosts.length).toBe(1);
  });
});