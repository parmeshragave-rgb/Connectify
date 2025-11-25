import { useEffect } from "react";
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
import type { RootState } from "../Redux";

import axios from "axios";
function SearchUsers() {
  const [limit, setLimit] = useState(30);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [usersdata, setUsersdata] = useState([]);
  const [debouncequery, setDebounceQuery] = useState("");

  const navigate = useNavigate();
  

  const { user } = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    const url=debouncequery.trim() ===""
    ? `https://dummyjson.com/users/?limit=${limit}&skip=${skip}`
    :   `https://dummyjson.com/users/&search?q=${debouncequery}`
    axios
      .get(url)
      .then((res) => {
        setUsersdata((prevData) => [...prevData, ...res.data.users]);
        setLoading(false);
      })

      .catch((error) => console.log(error.message));
  }, [debouncequery, skip]);

  useEffect(() => {
     const timer=setTimeout(() => {
      setDebounceQuery(query)
     },800)
  },[query])

  useEffect(() => {
    if (loading == true) {
      setLimit((prevPage) => prevPage + 10);
      setSkip((prevSkip) => prevSkip + 10);
    }
  }, [loading]);

  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    }
  };

  window.addEventListener("scroll", handleScroll);

  const clickhandler = (id) => {
    navigate(`/userprofile/${id}`);
  };


  if (!user) {
    navigate("/login");
    return;
  }

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
                      <Avatar
                        src={user.image}
                        sx={{
                          bgcolor: "black",
                          display: "flex",
                          alignItems: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {user.firstName.charAt(0).toUpperCase()}
                      </Avatar>
                      <Stack>
                        <Typography sx={{ ml: "12px" }}>
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography sx={{ ml: "12px", fontSize: "12px" }}>
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
