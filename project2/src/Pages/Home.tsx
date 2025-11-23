import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersData } from "../Redux/Users/userActions";
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
  CardActionArea,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function Home() {
  const dispatch = useDispatch();

  const { user } = useSelector((s: RootState) => s.auth);
  const { userdata } = useSelector((s: RootState) => s.users);

  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [likes, setLikes] = useState([]);
  const [disLikes, setdisLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  

  

  const fetchPost = () => {
    axios
      .get(`https://dummyjson.com/posts/?limit=${limit}&skip=${skip}`)
      .then((res) => {
        setPosts((prevData) => [...prevData, ...res.data.posts]);
        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    dispatch(fetchUsersData());
  }, []);

  useEffect(() => {
    fetchPost();
  }, [skip]);

  useEffect(() => {
    if (loading == true) {
      setLimit((prevPage) => prevPage + 10);
      setSkip((prevSkip) => prevSkip + 10);
    }
  }, [loading]);

  // console.log(posts.length);

  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    }
  };

  window.addEventListener("scroll", handleScroll);

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

  const clickhandler = (id) => {
    navigate(`/post/${id}`);
  };

  if (!user) {
    navigate("/login");
    return;
  }
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Posts
        </Typography>
        <Grid container spacing={2} justifyContent={"center"}>
          {posts.map((post) => (
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  width: { xs: "350px", md: "400px" },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                elevation={5}
              >
                <CardHeader
                  sx={{ height: "80px", bgcolor: "black", color: "whitesmoke" }}
                  avatar={
                    <Avatar
                      src={userdata?.find((u) => post.userId === u.id)?.image}
                      sx={{ bgcolor: "black", fontWeight: "bold" }}
                      onClick={() =>
                        navigate(
                          `/userprofile/${
                           userdata.find((u) => post.userId === u.id).id
                          }`
                        )
                      }
                    >
                      {userdata?.find(
                        (u) => post.userId === u.id
                      )?.firstName?.charAt(0)}
                    </Avatar>
                  }
                  title={
                    <Typography fontWeight="bold">{post.title}</Typography>
                  }
                  subheader={<Typography>{post.views} views</Typography>}
                />
                <CardContent onClick={() => clickhandler(post.id)}>
                  <Typography>{post.body}</Typography>
                </CardContent>
                <CardActionArea
                  component="section"
                  sx={{ bgcolor: "lightgrey" }}
                >
                  <CardActions>
                    <IconButton
                      onClick={() => handleLike(post)}
                      sx={{ color: isLiked(post.id) ? "black" : "default" }}
                    >
                      <Stack>
                        <ThumbUpIcon />
                        <Typography>
                          {isLiked(post.id)
                            ? post.reactions.likes + 1
                            : post.reactions.likes}
                        </Typography>
                      </Stack>
                    </IconButton>

                    <IconButton
                      onClick={() => handleDislike(post)}
                      sx={{ color: isDisLiked(post.id) ? "black" : "default" }}
                    >
                      <Stack>
                        <ThumbDownIcon />
                        <Typography>
                          {isDisLiked(post.id)
                            ? post.reactions.dislikes + 1
                            : post.reactions.dislikes}
                        </Typography>
                      </Stack>
                    </IconButton>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {loading && <Typography>Loading....</Typography>}
    </>
  );
}

export default Home;
