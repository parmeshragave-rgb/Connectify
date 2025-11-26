import { useEffect, useState } from "react";
import { Avatar, Box, Typography, Button, Stack,Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import PostCard from "../Components/ReusableCard";
import AddPostForm from "../Components/AddPostForm";
import type { RootState } from "../Redux";
import { likePost, dislikePost } from "../Redux/LikedPost/LikedPostActions";

const Profile = () => {
  const { user } = useSelector((s: RootState) => s.auth);
  const { likedPosts, dislikedPosts } = useSelector((s: RootState) => s.like);
  const dispatch = useDispatch();

  const handleLike = (post: Post) => {
    dispatch(likePost(post, user?.email));
  };

  const handleDislike = (post: Post) => {
    dispatch(dislikePost(post, user?.email));
  };

  const isLiked = (id: number) => likedPosts.some((p) => p.id === id);
  const isDisLiked = (id: number) => dislikedPosts.some((p) => p.id === id);

  interface Post {
    id: number;
    title: string;
    body: string;
    reactions: {
      likes: number;
      dislikes: number;
    };
  }

  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    const item = localStorage.getItem(`user_posts_${user?.email}`);
    const saved = item ? JSON.parse(item) : [];
    setUserPosts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `user_posts_${user?.email}`,
      JSON.stringify(userPosts)
    );
  }, [userPosts]);

  const handleDeletePost = (Post: Post) => {
    let UpdateduserPosts = [...userPosts];
    UpdateduserPosts = UpdateduserPosts.filter((f) => f.id !== Post.id);
    setUserPosts(UpdateduserPosts);
  };

  const handleAddPost = (newPost: Post) => {
    setUserPosts([newPost, ...userPosts]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack alignItems="center" spacing={2}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            bgcolor: "black",
            fontSize: 40,
          }}
        >
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>

        <Typography variant="h4" fontWeight="bold">
          {user?.username}
        </Typography>

        <Typography variant="body1">{user?.email}</Typography>

        <Button
          variant="contained"
          onClick={() => setOpenAdd(true)}
          sx={{ bgcolor: "black", color: "white" }}
        >
          Add Post
        </Button>
      </Stack>

      <Box sx={{ mt: 4 }}>
        {userPosts.length === 0 ? (
          <Typography textAlign="center" mt={3} color="gray">
            No posts yet... Click "Add Post"
          </Typography>
        ) : (
           <Grid container spacing={2} justifyContent={"flex-start"}>
          {userPosts.map((post) => (
             <Grid item xs={12} md={6}>
            <PostCard
              key={post.id}
              post={post}
              userdata={[
                { id: Date.now(), image: "", firstName: user?.username },
              ]}
              handleLike={handleLike}
              handleDislike={handleDislike}
              isLiked={isLiked}
              isDisLiked={isDisLiked}
              clickhandler={() => {}}
              navigate={() => {}}
              showDelete={true}
              onDelete={handleDeletePost}
              user={user}
              data-testid="postcard"
            />
            </Grid>
           
          ))}
           </Grid>
        )}
      </Box>

      <AddPostForm
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={handleAddPost}
      />
    </Box>
  );
};

export default Profile;
