import {LIKE_POST, DISLIKE_POST,REMOVE_POST, likePost} from "./LikedPostActions";
export interface Post {
  id: number;
  [key: string]: any;
}

interface LikesState {
  likedPosts: Post[];
  dislikedPosts: Post[];
}

const initialState: LikesState = {
  likedPosts: [],
  dislikedPosts: [],
};

const likeReducer = (state = initialState, action): LikesState => {
  switch (action.type) {
    case LIKE_POST:
      return {
        ...state,
        likedPosts: state.likedPosts.some(p => p.id === action.payload.id)
          ? state.likedPosts.filter(p => p.id !== action.payload.id)
          : [...state.likedPosts, {...action.payload,likedBy:action.userEmail}],
        dislikedPosts: state.dislikedPosts.filter(p => p.id !== action.payload.id),
      };

    case DISLIKE_POST:
      return {
        ...state,
        dislikedPosts: state.dislikedPosts.some(p => p.id === action.payload.id)
          ? state.dislikedPosts.filter(p => p.id !== action.payload.id)
          : [...state.dislikedPosts, {...action.payload,dislikedBy:action.userEmail}],
        likedPosts: state.likedPosts.filter(p => p.id !== action.payload.id),
      };
   
      case REMOVE_POST:
        return{
          ...state,
          likedPosts:state.likedPosts.filter((p) => p.id !== action.payload.id),
        dislikedPosts: state.dislikedPosts.filter(p => p.id !== action.payload.id),

        }
   

    default:
      return state;
  }
};

export default likeReducer;