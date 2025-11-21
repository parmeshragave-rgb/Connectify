import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

//   const { user, isAuthenticated } = useSelector((s: RootState) => s.auth);

import {
  Stack,
  Box,
  Typography,
  Grid,
  CardHeader,
  Card,
  CardContent,
  CardActionArea,
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
              
            {comments.map((comment)  => (
              <Grid  xs={12}>

                <Box
                  sx={{
                    height: "50px",
                    width: "90%",
                    p: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Stack direction={"row"} spacing={2}>
                    <Avatar sx={{ bgcolor: "black" }}>
                      {comment.user.fullName.charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography sx={{ mt: "10px" }}>
                      {comment.body}
                    </Typography>
                    
                    <Typography sx={{ mt: "10px" }}>
                      {comment.likes}
                    </Typography>
                    <Divider/>
                  </Stack>
                </Box>
              </Grid>
            ))}

          </Stack>
        </Grid>
      </Box>
    </>
  );
}

export default PostDetailPage;
