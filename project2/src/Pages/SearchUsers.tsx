import React, { useEffect } from "react";
import { useState } from "react";
import {
  Grid,
  TextField,
  Card,
  Avatar,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";


import axios from "axios";
function SearchUsers() {
  const [query, setQuery] = useState("");
  const [usersdata, setUsersdata] = useState([]);
  const navigate = useNavigate();
  // const [debounceQuery, setdebounceQuery] = useState("");
  
  const { user } = useSelector((s: RootState) => s.auth);


  if (!user) {
    navigate("/login");
    return;
  }

  useEffect(() => {
    axios
        .get(`https://dummyjson.com/users/search?q=${query}`)
        .then((res) => setUsersdata(res.data.users))
        .catch((error) => console.log(error.message));
  }, [query]);

  const clickhandler = (id) => {
    navigate(`/userprofile/${id}`);
  };

  // const handleSearch=(value) => {debounce((value) =>{setdebounceQuery(value)},800)}
  

  return (
    <>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Stack spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={(event) => setQuery(event.target.value)}
              variant="outlined"
              placeholder="Search"
              type="search"
              value={query}
              sx={{ width: { xs: "380px", sm: "600px", md: "900px" } }}
            />
          </Box>

          <Grid
            container
            spacing={2}
            sx={{ mt: 2, maxWidth: "900px" }}
            justifyContent="center"
          >
            {usersdata?.map((user) => (
              <Grid key={user.id} xs={12} onClick={() => clickhandler(user.id)}>
                <Card
                  sx={{
                    height: "50px",
                    width: "180px",
                    p: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  
                  <Stack direction={"row"} spacing={2}>
<Box sx={{ display: "flex", alignItems: "center" }}>

                    <Avatar src={user.image} sx={{ bgcolor: "black",display:"flex",alignItems:"center",fontWeight:"bold" }}>
                      {user.firstName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Stack>
                    <Typography sx={{ ml: "12px" }}>
                      {user.firstName} {user.lastName}
                    </Typography>
                     <Typography sx={{ ml: "12px",fontSize:"12px"}}>
                      @{user.username}
                    </Typography>
                  </Stack>
                  </Box>

                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>
    </>
  );
}

export default SearchUsers;
