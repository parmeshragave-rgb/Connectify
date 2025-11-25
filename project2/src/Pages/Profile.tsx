import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";

import PostCard from "../Components/ReusableCard";
import AddPostForm from "../Components/AddPostForm";
import type { RootState } from "../Redux";

const Profile = () => {
    const { user } = useSelector((s: RootState) => s.auth);
  

  const STORAGE_KEY = `user_posts_${user?.email}`;

  interface Post {
  id:number,
  title:string,
  body:string,
  reactions:{
        likes:number,
        dislikes:number,

  }
}

  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setUserPosts(saved);
  }, []);

  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userPosts));
  }, [userPosts]);

  const handleDeletePost = (Post:Post) => {
    let UpdateduserPosts=[...userPosts]
    UpdateduserPosts=UpdateduserPosts.filter((f) => f.id !== Post.id)
    setUserPosts(UpdateduserPosts)
  };



  const handleAddPost = (newPost:Post) => {
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

        <Button variant="contained" onClick={() => setOpenAdd(true)} sx={{bgcolor:"black",color:"white"}}>
          Add Post
        </Button>
      </Stack>

    
      <Box sx={{ mt: 4 }}>
        {userPosts.length === 0 ? (
          <Typography textAlign="center" mt={3} color="gray">
            No posts yet... Click "Add Post"
          </Typography>
        ) : (
          userPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              userdata={[{ id: Date.now(), image: "", firstName: user.username }]}
              handleLike={() => {}}
              handleDislike={() => {}}
              isLiked={() => false}
              isDisLiked={() => false}
              clickhandler={() => {}}
              navigate={() => {}}
              showDelete={true}
              onDelete={handleDeletePost}
            />
          ))
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