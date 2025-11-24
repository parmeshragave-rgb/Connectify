export const LIKE_POST = "LIKE_POST";
export const DISLIKE_POST = "DISLIKE_POST";
export const REMOVE_POST="REMOVE_POST"


export interface LikedPosts{
    type:typeof LIKE_POST;
    payload:any []
}

export interface DisLikedPosts{
    type:typeof DISLIKE_POST;
    payload:any []
}

export interface RemovePosts{
    type:typeof REMOVE_POST;
    payload:any []
}

export const likePost = (post,userEmail) => ({
  type: LIKE_POST,
  payload: post,
  userEmail
});

export const dislikePost = (post,userEmail) => ({
  type: DISLIKE_POST,
  payload: post,
  userEmail
});

export const removePost = (post,userEmail) => ({
  type: DISLIKE_POST,
  payload: post,
  userEmail
});
