import { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Stack,
  Avatar,
  Box,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import { likePost, dislikePost } from "../Redux/LikedPost/LikedPostActions";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import PostCard from "../Components/ReusableCard";
import type { RootState } from "../Redux";
function UserProfile() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { likedPosts, dislikedPosts } = useSelector((s: RootState) => s.like);

  const [userPosts, setuserPosts] = useState([]);
  const [currentUser, setcurrentUser] = useState({});
 
  const { user } = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/posts/user/${id}`)
      .then((res) => setuserPosts(res.data.posts))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users/${id}`)
      .then((res) => setcurrentUser(res.data))
      .catch((error) => console.log(error.message));
  }, []);

  

  interface Post {
  id:number,
  title:string,
  body:string,
  reactions:{
        likes:number,
        dislikes:number,

  }
}
  const dispatch = useDispatch();

  const handleLike = (post:Post) => {
    dispatch(likePost(post, user?.email));
  };

  const handleDislike = (post:Post) => {
    dispatch(dislikePost(post, user?.email));
  };

  const isLiked = (id: number) => likedPosts.some((p) => p.id === id);
  const isDisLiked = (id:number) => dislikedPosts.some((p) => p.id === id);


  if (!userPosts || !currentUser) {
    return <CircularProgress sx={{ color: "black" }} />;
  }

  const clickhandler = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <>
      <Box sx={{ ml: "16px" }}>
        <Button
          variant="contained"
          size="small"
          sx={{ color: "white", bgcolor: "black", fontWeight: "bold" }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
      <Box sx={{ p: 2 }}>
        <Grid container sx={{ width: "100%" }} spacing={1}>
          <Stack>
            <Grid size={12}>
              <Stack direction={"row"} spacing={1}>
                <Avatar
                  src={currentUser?.image}
                  sx={{ width: "120", height: "120" }}
                />
                <Typography variant="h4" fontWeight="bold">
                  {currentUser.firstName} {currentUser.lastName}
                </Typography>
              </Stack>
              <Stack sx={{ ml: "55px" }} spacing={1}>
                <Typography variant="h6" fontWeight={"bold"} color="grey">
                  {currentUser.username}
                </Typography>
                <Typography variant="body1" fontWeight={"bold"}>
                  Born at {currentUser.birthDate}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={"bold"}
                  fontStyle={"italic"}
                  color="grey"
                >
                  {currentUser?.company?.title} at {currentUser?.company?.name}
                </Typography>
              </Stack>
            </Grid>
            <Divider />
            <Box sx={{ height: "15px" }} />

            <Typography variant="h5" fontWeight={"bold"} gutterBottom>
              Posts by {currentUser.firstName}
            </Typography>
            {userPosts.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "lightgray",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h5">No Posts Yet</Typography>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                mb: "20px",
                mr:"10px"
              }}
            >
              {userPosts.map((post) => (
                <Grid key={post.id} xs={12} md={6} marginBottom={2} marginRight={2}>
                  <PostCard
                    post={post}
                    userdata={[currentUser]}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                    isLiked={isLiked}
                    isDisLiked={isDisLiked}
                    clickhandler={clickhandler}
                    navigate={navigate}
                  />
                </Grid>
              ))}
            </Box>
          </Stack>
        </Grid>
      </Box>
    </>
  );
}

export default UserProfile;
