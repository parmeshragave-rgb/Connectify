import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function Home() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("likedPosts");
    if (saved) {
      setLikes(JSON.parse(saved));
    }
  }, []);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/posts`)
      .then((res) => setPosts(res.data.posts))
      .catch((error) => console.log(error.message));
  },[])

//   useEffect(() => {
//     fetchPost();
//   }, [page]);

//   useEffect(() => {
//     if (loading == true) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   }, [loading]);

//   const handleScroll = () => {
//       if (document.body.scrollHeight - 300 < window.scrollY + window.innerHeight) {
//         setLoading(true);
//       }
//     };

//   window.addEventListener("scroll", handleScroll());

  const clickhandler = (id) => {
    navigate(`/post/${id}`);
  };


  

  const handleLike = (post) => {
    let updatedLikes = [...likes];

    if (updatedLikes.some((p) => p.id === post.id)) {
      updatedLikes = updatedLikes.filter((p) => p.id !== post.id);
    } else {
      updatedLikes.push(post);
    }

    setLikes(updatedLikes);
    localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));
  };

  const handleDislike = (post) => {
    let updatedLikes = likes.filter((p) => p.id !== post.id);
    setLikes(updatedLikes);
    localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));
  };

  const isLiked = (id) => likes.some((p) => p.id === id);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Posts
        </Typography>
        <Grid container spacing={2} display={"flex"} justifyContent={"center"}>
          {posts.map((post) => (
            <Grid item key={post.id} xs={12} md={6}>
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
                  sx={{ height: "80px", bgcolor: "lightgray" }}
                  avatar={
                    <Avatar sx={{ bgcolor: "black" }}>{post.userId}</Avatar>
                  }
                  title={
                    <Typography fontWeight="bold">{post.title}</Typography>
                  }
                  subheader={<Typography>{post.views} views</Typography>}
                />
                <CardContent onClick={() => clickhandler(post.id)}>
                  <Typography>{post.body}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleLike(post)}>
                    <Stack>
                      <ThumbUpIcon
                        color={isLiked(post.id) ? "black" : "disabled"}
                      />
                      <Typography>
                        {isLiked(post.id)
                          ? post.reactions.likes + 1
                          : post.reactions.likes}
                      </Typography>
                    </Stack>
                  </IconButton>
                  <IconButton onClick={() => handleDislike(post)}>
                    <Stack>
                      <ThumbDownIcon
                        color={!isLiked(post.id) ? "black" : "disabled"}
                      />
                      <Typography>
                        {!isLiked(post.id)
                          ? post.reactions.dislikes + 1
                          : post.reactions.dislikes}
                      </Typography>
                    </Stack>
                  </IconButton>
                </CardActions>
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
