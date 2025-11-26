import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersData } from "../Redux/Users/userActions";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { likePost, dislikePost } from "../Redux/LikedPost/LikedPostActions";
import type { RootState } from "../Redux";
import PostCard from "../Components/ReusableCard";

function Home() {

  const dispatch = useDispatch();
  const { user } = useSelector((s: RootState) => s.auth);
  const { userdata } = useSelector((s: RootState) => s.users);
  const { likedPosts, dislikedPosts } = useSelector((s: RootState) => s.like);
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

interface Post {
  id:number,
  title:string,
  body:string,
  reactions:{
        likes:number,
        dislikes:number,

  }
}
  const fetchPost = () => {
    axios
      .get(`https://dummyjson.com/posts/?limit=${limit}&skip=${skip}`)
      .then((res) => {
        setPosts((prevData) => [...prevData, ...res.data.posts]);
        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  };

  // useEffect(() => {
  //  throw new error
  // },[])
  useEffect(() => {
    dispatch(fetchUsersData());
  }, []);

  useEffect(() => {
    fetchPost();
  }, [skip]);

  useEffect(() => {
    if (loading) {
      setLimit((prevPage) => prevPage + 10);
      setSkip((prevSkip) => prevSkip + 10);
    }
  }, [loading]);
  

useEffect(() => {
const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
},[])
  

  const handleLike = (post:Post) => {
    dispatch(likePost(post, user?.email));
  };

  const handleDislike = (post:Post) => {
    dispatch(dislikePost(post, user?.email));
  };

  const isLiked = (id: number) => likedPosts.some((p) => p.id === id && p.likedBy===user?.email);
  const isDisLiked = (id:number) => dislikedPosts.some((p) => p.id === id && p.dislikedBy===user?.email);

  const clickhandler = (id:number) => {
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
              <PostCard
                post={post}
                userdata={userdata}
                handleLike={handleLike}
                handleDislike={handleDislike}
                isLiked={isLiked}
                isDisLiked={isDisLiked}
                clickhandler={clickhandler}
                navigate={navigate}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {loading && (
        <Typography
          sx={{ display: "flex", justifyContent: "center", color: "black" }}
        >
          <CircularProgress sx={{ color: "black" }} />
        </Typography>
      )}
    </>
  );
}

export default Home;


