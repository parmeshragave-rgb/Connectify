import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import {
  Stack,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  ButtonGroup,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";


function PostDetailPage() {
  const { user, isAuthenticated } = useSelector((s: RootState) => s.auth);
  const [post, setpost] = useState({});
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setdisLikes] = useState([]);
  const [userComment, setUserComment] = useState([]);
  const [commentQuery, setcommentQuery] = useState("");
  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();

  console.log(id);

  console.log(userComment);

  

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/posts/${id}`)
      .then((res) => setpost(res.data))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/comments/post/${id}`)
      .then((res) => setComments(res.data.comments))
      .catch((error) => console.log(error.message));
  }, []);


useEffect(() => {
    const saved = localStorage.getItem(`userComments${id}`);
    if (saved) {
      setUserComment(JSON.parse(saved));
    }
  }, []);


interface AddComment {
  Username?: string;
  query?: string;

}
const currentComment:AddComment={
  Username:user?.username,
  query:commentQuery
}

const AddComments = (currentComment) => {
  if(!currentComment.query?.trim()) return;
    let UpdatedComments=[...userComment]
    UpdatedComments.push(currentComment)
    setUserComment(UpdatedComments)
    localStorage.setItem(`userComments${id}`,JSON.stringify(UpdatedComments))
    setcommentQuery("")

}


  useEffect(() => {
    const saved = localStorage.getItem("likedPosts");
    if (saved) {
      setLikes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const saved=localStorage.getItem("dislikedPosts")
    if(saved){
      setdisLikes(JSON.parse(saved))
    }
  },[])

  const handleLikes = (post) => {
    let updatedLikes = [...likes];
   let updatedDisLikes = [...dislikes];


    if (updatedLikes.some((p) => p.id === post.id)) {
      updatedLikes = updatedLikes.filter((p) => p.id !== post.id);
    } else {
      updatedLikes.push(post);
      updatedDisLikes = updatedDisLikes.filter((p) => p.id !== post.id);
        setdisLikes(updatedDisLikes);
    localStorage.setItem("dislikedPosts", JSON.stringify(updatedDisLikes));

    }

    setLikes(updatedLikes);
    localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));
  };


 const handleDisLikes= (post) => {
  let UpdatedDisLikes=[...dislikes]
  let  UpdatedLikes=[...likes]

  if(UpdatedDisLikes.some((p) => p.id===post.id)){
    UpdatedDisLikes=UpdatedDisLikes.filter((f) => f.id!== post.id)
  }
  else{
    UpdatedDisLikes.push(post)
    UpdatedLikes=UpdatedLikes.filter((f) => f.id !== post.id)
    setLikes(UpdatedLikes)
   localStorage.setItem("likedPosts",JSON.stringify(UpdatedLikes))
    
  }
  setdisLikes(UpdatedDisLikes)
  localStorage.setItem("dislikedPosts",JSON.stringify(UpdatedDisLikes))
 }

 const isLiked = (id) => likes.some((p) => p.id === id);
  const isDisLiked = (id) => dislikes.some((p) => p.id === id);


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
        <Grid cointainer >
          <Stack spacing={1}>
            <Grid>
              <Typography variant="h3" fontWeight={"bold"} gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="h6" fontStyle={"italic"} gutterBottom>
                {post.body}
              </Typography>

              <Stack direction={"row"} spacing={2}>
                <Stack>
                  <IconButton onClick={() =>{handleLikes(post)}} sx={{color:isLiked(post.id) ? "black" : "default"}}>
                  <ThumbUpIcon />
                    </IconButton  >         
                  <Typography variant="h6" fontWeight={"bold"}>
                    {isLiked(post.id) ? post.reactions?.likes + 1 : post.reactions?.likes}
                  </Typography>
                </Stack>
                <Stack>
                  <IconButton onClick={() =>{handleDisLikes(post)}} sx={{color:isDisLiked(post.id) ? "black" : "default" }}>
                  <ThumbDownIcon/>
                  </IconButton>
                  <Typography variant="h6" fontWeight={"bold"}>
                    {isDisLiked(post.id)
                          ? post.reactions?.dislikes + 1 : post.reactions?.dislikes }
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid width={"100%"}>
              <Typography variant="h6" fontWeight={"bold"} gutterBottom>
                Add Comments
              </Typography>
              <Stack direction={"row"} sx={{ width: "100%" }}>
                <ButtonGroup>
                  <TextField
                    value={commentQuery}
                    type="text"
                    placeholder="Add comment"
                    onChange={(e) => setcommentQuery(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "black", fontWeight: "bold" }}
                    onClick={() => { (user) ? AddComments(currentComment) : alert("login to comment")}}
                  >
                    Add Comment
                  </Button>
                </ButtonGroup>
              </Stack>
            </Grid>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              fontStyle={"italic"}
              gutterBottom
            >
              Comments
            </Typography>
{/* 
            {(comments.length === 0 && userComment.length===0) ?(
              <Typography>No Comments</Typography>
            ) : ( */}
               {userComment.map((comment) => (
                <Grid spacing={1} xs={12}>
                  <Box
                    sx={{
                      height: "50px",
                      width: "100%",
                      p: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      mt: 1,
                    }}
                  >
                    <Stack direction={"row"} spacing={2}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: "black", mt: "10px" }}>
                          {comment?.Username?.charAt(0).toUpperCase()}
                        </Avatar>
                      </Box>
                      <Stack sx={{ p: "1px" }}>
                        <Typography sx={{ mt: "10px", fontWeight: "bold" }}>
                          @{comment.Username}
                        </Typography>

                        <Typography>{comment.query}</Typography>

                        <Typography sx={{ mt: "2px" }}>
                          <ThumbUpOutlinedIcon sx={{ fontSize: "15px" }} />
                          {/* {comment.likes} */}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Divider />
                  </Box>
                </Grid>
              ))}

              {comments.map((comment) => (
                <Grid spacing={1} xs={12}>
                  <Box
                    sx={{
                      height: "50px",
                      width: "100%",
                      p: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      mt: 1,
                    }}
                  >
                    <Stack direction={"row"} spacing={2}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{ bgcolor: "black", mt: "10px" }}
                          onClick={() =>
                            navigate(`/userprofile/${comment.user.id}`)
                          }
                        >
                          {comment.user.fullName.charAt(0).toUpperCase()}
                        </Avatar>
                      </Box>
                      <Stack sx={{ p: "1px" }}>
                        <Typography sx={{ mt: "10px", fontWeight: "bold" }}>
                          @{comment.user.username}
                        </Typography>

                        <Typography>{comment.body}</Typography>

                        <Typography sx={{ mt: "2px" }}>
                          <ThumbUpOutlinedIcon sx={{ fontSize: "15px" }} />{" "}
                          {comment.likes}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Divider />
                  </Box>
                </Grid>
              ))}
            {/* )} */}
          </Stack>
        </Grid>
      </Box>
    </>
  );
}

export default PostDetailPage;
