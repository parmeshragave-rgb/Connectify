import { useEffect, useState, useCallback } from "react";
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
import axios from "axios";
import type { RootState } from "../Redux";
import { debounce } from "lodash";

function SearchUsers() {
  const [limit, setLimit] = useState(30);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [usersdata, setUsersdata] = useState([]);
  const [noResult, setnoResult] = useState(0);

  const navigate = useNavigate();
  const { user } = useSelector((s: RootState) => s.auth);

  const debouncedQueryUpdate = useCallback(
    debounce((value) => {
      setDebouncedQuery(value);
      setSkip(0);
      setLimit(30);
    }, 800),
    []
  );

  useEffect(() => {
    debouncedQueryUpdate(query);
  }, [query]);

  const fetchUsers = async (searchValue, newSkip = skip) => {
    const url =
      searchValue.trim() === ""
        ? `https://dummyjson.com/users?limit=${limit}&skip=${newSkip}`
        : `https://dummyjson.com/users/search?q=${searchValue}`;

    try {
      const res = await axios.get(url);

      setUsersdata((prev) =>
        newSkip === 0 ? res.data.users : [...prev, ...res.data.users]
      );
      setnoResult(res.data.total);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(debouncedQuery, 0);
  }, [debouncedQuery]);

  useEffect(() => {
    if (loading) {
      const nextSkip = skip + 10;
      setSkip(nextSkip);
      fetchUsers(debouncedQuery, nextSkip);
    }
  }, [loading]);

  useEffect(() => {
    const onScroll = () => {
      if (
        document.body.scrollHeight - 300 <
        window.scrollY + window.innerHeight
      ) {
        setLoading(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clickhandler = (id) => navigate(`/userprofile/${id}`);

  if (!user) {
    navigate("/login");
    return null;
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

          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            {!noResult && (
              <Typography variant="h5" color="error" fontWeight={"bold"}>
                No Result Found !!!
              </Typography>
            )}
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
