import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { CardContent, Grid, Card, CardHeader, Typography, CardActions, Stack, IconButton, Avatar,Box, Divider,CircularProgress, Toolbar, Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useNavigate } from 'react-router-dom';
import {useParams } from 'react-router-dom';

function UserProfile() {
    const navigate=useNavigate();
    const params = useParams();
        const id=params.id
    const [userPosts, setuserPosts] = useState([]);
    const [currentUser, setcurrentUser] = useState({});


     useEffect(() => {
        
        axios.get(`https://dummyjson.com/posts/user/${id}`)
        .then((res) => setuserPosts(res.data.posts))
        .catch((error) => console.log(error.message))
    },[])

     useEffect(() => {
        
        axios.get(`https://dummyjson.com/users/${id}`)
        .then((res) => setcurrentUser(res.data))
        .catch((error) => console.log(error.message))
    },[])

 console.log(userPosts)

 if (!userPosts || !currentUser) {
      return (
        <CircularProgress sx={{color:"black"}}/>
      );
    }
    
  return (
    <>
<Box sx={{ml:"16px"}}><Button variant='contained' size='small' sx={{color:"white",bgcolor:"black",fontWeight:"bold"}} onClick={() => navigate(-1)}>Back</Button></Box>
<Box sx={{p:2}}>

            <Grid container sx={{width:"100%"}} spacing={1}>
                <Stack>
                <Grid size={12}>
                    <Stack direction={"row"} spacing={1}>
                    <Avatar src={currentUser?.image} sx={{width:"120",height:"120"}}/>
                       <Typography variant='h4' fontWeight="bold" >{currentUser.firstName} {currentUser.lastName}</Typography>
                       </Stack>
                       <Stack sx={{ml:"55px"}} spacing={1}>
                    <Typography variant='h6'fontWeight={"bold"} color='grey'>{currentUser.username}</Typography>
                    <Typography variant='body1' fontWeight={"bold"} >Born at {currentUser.birthDate}</Typography>
                    <Typography variant='subtitle1' fontWeight={"bold"} fontStyle={"italic"} color='grey'>{currentUser?.company?.title} at {currentUser?.company?.name}</Typography>
                    </Stack>
                    
                </Grid>
                  <Divider/>
                     <Box sx={{ height: "15px" }} />
                
                    <Typography variant='h5'fontWeight={"bold"} gutterBottom>Posts by {currentUser.firstName}</Typography>
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                {userPosts.map((post) => (
                    <Grid  key={post.id} xs={12} md={6}>
                        <Card  sx={{ width: {xs:"320px",md:"400px"}, height: "100%",display:"flex",flexDirection:"column",justifyContent:"space-between",m:"10px" }}
                elevation={5} >
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        {currentUser?.firstName?.charAt(0)}
                                    </Avatar>
                                }

                                title={post.title}
                                subheader={<Typography>{post.views} views</Typography>}
                            />
                        
                            <CardContent>
                                <Typography>{post.body}</Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton>
                                    <Stack>
                                        <ThumbUpIcon />
                                        <Typography>{post.reactions.likes}</Typography>
                                    </Stack>
                                </IconButton>
                                <IconButton>
                                    <Stack>
                                        <ThumbDownIcon />
                                        <Typography>{post.reactions.dislikes}</Typography>
                                    </Stack>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>

                ))}
                </Box>
                </Stack>
            </Grid>
            </Box>
        </>
  )
}

export default UserProfile