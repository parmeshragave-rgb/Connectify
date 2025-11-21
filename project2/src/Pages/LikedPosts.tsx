import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardHeader, Avatar, Typography, CardContent, CardActions, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from '@mui/icons-material/Favorite';
function LikedPage() {
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("likedPosts");
    if (saved) setLikedPosts(JSON.parse(saved));
  }, []);

  const removePost = (id) => {
    const updated = likedPosts.filter((p) => p.id !== id);
    setLikedPosts(updated);
    localStorage.setItem("likedPosts", JSON.stringify(updated));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Liked Posts <FavoriteIcon sx={{color:"red",mt:"15px"}}/></Typography>

      {likedPosts.length === 0 ? (
        <Typography>No liked posts yet.</Typography>
      ) : (
        <Grid container spacing={2}  display={"flex"} justifyContent={"center"}>
          {likedPosts.map((post) => (
            <Grid item xs={12} md={6} key={post.id} display={"flex"} justifyContent={"center"}>
              <Card sx={{ width: "400px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }} elevation={5}>
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: "black" }}>{post.userId}</Avatar>}
                  title={<Typography fontWeight="bold">{post.title}</Typography>}
                  subheader={<Typography>{post.views} views</Typography>}
                />

                <CardContent>
                  <Typography>{post.body}</Typography>
                </CardContent>

                <CardActions>
                  <IconButton onClick={() => removePost(post.id)}>
                    <Stack alignItems="center">
                      <DeleteIcon color="error" />
                      <Typography>Remove</Typography>
                    </Stack>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default LikedPage;

