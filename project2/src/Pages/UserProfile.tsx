
import { useState, useEffect } from "react";
import axios from "axios";
import {
  CardContent,
  Grid,
  Card,
  CardHeader,
  Typography,
  CardActions,
  Stack,
  IconButton,
  Avatar,
  Box,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostCard from "../Components/ReusableCard";
function UserProfile() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [userPosts, setuserPosts] = useState([]);
  const [currentUser, setcurrentUser] = useState({});
  const [likes, setLikes] = useState([]);
  const [disLikes, setdisLikes] = useState([]);
  const { user} = useSelector((s: RootState) => s.auth);

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

  useEffect(() => {
    const saved = localStorage.getItem(`likedPosts${user.email}`);
    if (saved) {
      setLikes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(`dislikedPosts${user.email}`);
    if (saved) {
      setdisLikes(JSON.parse(saved));
    }
  }, []);

  const handleLike = (post) => {
    let updatedLikes = [...likes];
    let updatedDisLikes = [...disLikes];

    if (updatedLikes.some((p) => p.id === post.id)) {
      updatedLikes = updatedLikes.filter((p) => p.id !== post.id);
    } else {
      updatedLikes.push(post);
      updatedDisLikes = updatedDisLikes.filter((p) => p.id !== post.id);
      setdisLikes(updatedDisLikes);
      localStorage.setItem(
        `dislikedPosts${user.email}`,
        JSON.stringify(updatedDisLikes)
      );
    }

    setLikes(updatedLikes);
    localStorage.setItem(
      `likedPosts${user.email}`,
      JSON.stringify(updatedLikes)
    );
  };

  const handleDislike = (post) => {
    let updatedDisLikes = [...disLikes];
    let updatedLikes = [...likes];

    if (updatedDisLikes.some((p) => p.id === post.id)) {
      updatedDisLikes = updatedDisLikes.filter((p) => p.id !== post.id);
    } else {
      updatedDisLikes.push(post);
      updatedLikes = updatedLikes.filter((p) => p.id !== post.id);
      setLikes(updatedLikes);
      localStorage.setItem(
        `likedPosts${user.email}`,
        JSON.stringify(updatedLikes)
      );
    }

    setdisLikes(updatedDisLikes);
    localStorage.setItem(
      `dislikedPosts${user.email}`,
      JSON.stringify(updatedDisLikes)
    );
  };

  const isLiked = (id) => likes.some((p) => p.id === id);
  const isDisLiked = (id) => disLikes.some((p) => p.id === id);

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
            {userPosts.length===0 && <Box sx={{display:"flex",justifyContent:"center",color:"lightgray",alignItems:"center" ,height:"100%"}}><Typography variant="h5">No Posts Yet</Typography></Box>}
            

            <Box sx={{ display: "flex", flexDirection: {xs:"column",md:"row"},mb:"20px" }}>
              {userPosts.map((post) => (
                <Grid key={post.id} xs={12} md={6} marginBottom={2}>
             <PostCard post={post} userdata={[currentUser]} handleLike={handleLike} handleDislike={handleDislike} isLiked={isLiked} isDisLiked={isDisLiked} clickhandler={clickhandler} navigate={navigate} />
                  
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



