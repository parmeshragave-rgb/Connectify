import { Card,CardActions,CardHeader,Avatar,Typography,CardContent,IconButton,Stack } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DeleteIcon from '@mui/icons-material/Delete';
const PostCard=( {post,userdata,handleLike,handleDislike,isLiked,isDisLiked,clickhandler,navigate,showDelete=false,onDelete=() => {}}) => {
return (
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
        sx={{ bgcolor: "black", fontWeight: "bold",cursor:"pointer" }}
        onClick={() =>
          navigate(
            `/userprofile/${userdata.find((u) => post.userId === u.id).id}`
          )
        }
      >
        {userdata?.find((u) => post.userId === u.id)?.firstName?.charAt(0)}
      </Avatar>
    }

    action={showDelete && (<IconButton onClick={() => onDelete(post)}><DeleteIcon sx={{color:"whitesmoke"}}/></IconButton>)}
    title={<Typography fontWeight="bold">{post.title}</Typography>}
    subheader={<Typography>{post.views} views</Typography>}
  />
  <CardContent onClick={() => clickhandler(post.id)} sx={{cursor:"pointer"}}>
    <Typography>{post.body}</Typography>
  </CardContent>
 
    <CardActions>
      <IconButton
        onClick={() => handleLike(post)}
        sx={{ color: isLiked(post.id) ? "black" : "default" }}
      >
        <Stack>
          <ThumbUpIcon />
          <Typography>
            {isLiked(post.id) ? post.reactions.likes + 1 : post.reactions.likes}
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
 
</Card>)}
export default PostCard
