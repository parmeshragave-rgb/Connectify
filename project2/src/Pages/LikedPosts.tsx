import { useEffect} from "react";
import { Box, Grid, Card, CardHeader, Avatar, Typography, CardContent, CardActions, IconButton, Stack,Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import type { RootState } from "../Redux";
import { fetchUsersData } from "../Redux/Users/userActions";
import { likePost } from "../Redux/LikedPost/LikedPostActions";

function LikedPage() {
  const { likedPosts} = useSelector((s: RootState) => s.like);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user} = useSelector((s: RootState) => s.auth);
  const { userdata} =useSelector((s:RootState) => s.users)
 
  useEffect(() => {

    dispatch(fetchUsersData())

  }, []);
  const clickhandler = (id:number) => {
    navigate(`/post/${id}`);
  };
  
 
  
  const userLikedPosts=likedPosts.filter(p => p.likedBy === user.email)

  const removePosthandler = (post) => {
    dispatch(likePost(post,user?.email));

    
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
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Liked Posts <FavoriteIcon sx={{color:"red",mt:"15px"}}/></Typography>

      {userLikedPosts.length === 0 ? (
        <Typography>No liked posts yet.</Typography>
      ) : (
        <Grid container spacing={2}  display={"flex"} justifyContent={"center"}>
          {userLikedPosts.map((post) => (
            <Grid item xs={12} md={6} key={post.id} display={"flex"} justifyContent={"center"}>
              <Card sx={{ width: "400px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }} elevation={5}>
                <CardHeader sx={{bgcolor:"black",color:"whitesmoke",height:"100px"}}
                  avatar={<Avatar src={userdata.find((u) => post?.userId === u?.id)?.image || user?.username?.charAt(0)?.toUpperCase()} sx={{ bgcolor: "black",cursor:"pointer" }}></Avatar>}
                  title={<Typography fontWeight="bold" sx={{ wordBreak:"break-word",whiteSpace:"normal"}}>{post.title}</Typography>}
                  subheader={<Typography>{post?.views || 0} views</Typography>}
                />

                <CardContent sx={{cursor:"pointer",flex:1 }}>
                  <Typography sx={{ wordBreak:"break-word",whiteSpace:"normal"}} >{post.body.substring(0,180)}

                    <Box
                component="span"
                onClick={()=> clickhandler(post.id)}
                sx={{
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'inline',
                }}
              >
                ...See More
              </Box>
                  </Typography>
                </CardContent>

                <CardActions>
                  <IconButton onClick={() => removePosthandler(post)}>
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
    </>
  );
}

export default LikedPage;

