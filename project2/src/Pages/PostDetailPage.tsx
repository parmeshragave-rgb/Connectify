import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
//   const { user, isAuthenticated } = useSelector((s: RootState) => s.auth);

import {
  Stack,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  ButtonGroup,
  Avatar,
  Divider
} from "@mui/material";
function PostDetailPage(props) {
  const [post, setpost] = useState({});
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();

  console.log(id);
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


  console.log(post);
  console.log(comments);

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
        <Grid cointainer>
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
                    <ThumbUpIcon/>
                  <Typography variant="h6" fontWeight={"bold"}>
                    {post.reactions?.likes}
                  </Typography>
                </Stack>
                <Stack>
                    <ThumbDownIcon/>
                  <Typography variant="h6" fontWeight={"bold"}>
                    {post.reactions?.dislikes}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid>
              <Typography variant="h6" fontWeight={"bold"} gutterBottom>Add Comments</Typography>
              <Stack direction={"row"} sx={{width:"100%"}}>
                <ButtonGroup>
                <TextField
                  value={userComment}
                  type="text"
                  placeholder="Add comment"
                
                />
                <Button variant="contained" sx={{bgcolor:"black",fontWeight:"bold"}}>Add Comment</Button>
                  </ButtonGroup>

              </Stack>
            </Grid>
<Typography variant="h6" fontWeight={"bold"} fontStyle={"italic"} gutterBottom>Comments</Typography>
              
            {comments.length===0 ? (<Typography>No Comments</Typography>) : (comments.map((comment)  => (
              <Grid spacing={1} xs={12}>

                <Box
                  sx={{
                    height: "50px",
                    width: "100%",
                    p: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    mt:1
                  }}
                >
                  <Stack direction={"row"} spacing={2}>
                    <Box sx={{display:"flex",alignItems:"center"}}>
                    <Avatar sx={{ bgcolor: "black",mt:"10px" }}>
                      {comment.user.fullName.charAt(0).toUpperCase()}
                    </Avatar>
                    </Box>
                     <Stack sx={{p:"1px"}}>
                      <Typography sx={{ mt: "10px",fontWeight:"bold" }}>
                      @{comment.user.username}
                    </Typography>

                    <Typography>
                      {comment.body}
                    </Typography>
                    
                    <Typography sx={{ mt: "2px" }}>
                      <ThumbUpOutlinedIcon sx={{fontSize:"15px"}}/> {comment.likes}
                      </Typography>
                    </Stack>
                  </Stack>
                    <Divider/>

                </Box>
              </Grid>
            )))}

          </Stack>
        </Grid>
      </Box>
    </>
  );
}

export default PostDetailPage;
