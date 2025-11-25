import { useEffect } from "react";
import { fetchQuerydata } from "../Redux/Quotes/QuotesActions";
import { connect } from "react-redux";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
  Box,
  CircularProgress
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function QuotesPage({ fetchQuerydata, quotesdata }) {
  const navigate=useNavigate()
  const { user } = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    fetchQuerydata();
  }, []);

  if (!user) {
    navigate("/login");
    return;
  } 
  return quotesdata.loading ? (
     <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>
  ) : quotesdata.error ? (
    <Typography>{quotesdata.error}</Typography>
  ) : (
    <>
    <Box sx={{ p: 2 }}>
    <Typography variant="h4" fontWeight="bold" gutterBottom>
              Quotes Library
            </Typography>
    <Grid container spacing={2} justifyContent="center">
      {quotesdata.quotes.map((quote) => (
        <>
          
            <Grid item xs={12}>
              <Card
               
                sx={{
                  width: { xs: "380px",sm:"700px", md: "800px" },
                  height: { xs: "100%", sm:"100%", md: "100%" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                elevation={5}
              >
                <CardHeader
                  sx={{ height: { xs:"70px",sm:"60px",md:"60px"},bgcolor: "black", color: "whitesmoke" }}
                  avatar={
                    <Avatar
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                        bgcolor: "whitesmoke",
                      }}
                    >
                      {quote.author.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={
                    <Typography fontWeight="bold">{quote.author}</Typography>
                  }
                />
                <CardContent>
                  <Stack>
                    <Typography
                      sx={{
                        fontFamily: "fantasy",
                        fontStyle: "italic",
                        fontSize: "20px",
           sm:"350px",           }}
                    >
                      "{quote.quote}"
                    </Typography>
                    <Typography sx={{ ml: {xs:"240px",sm:"440px",md:"500px"}, mt: "5px",fontFamily: "fantasy",fontStyle: "italic",fontSize: "18px"}}>By</Typography>
                    <Typography sx={{ ml: {xs:"250px",sm:"450px",md:"520px"},fontFamily: "fantasy",fontStyle: "italic",fontSize: "18px" }}>
                      -{quote.author}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
        </>
      ))}
          </Grid>
</Box>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    quotesdata: state.quotes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuerydata: () => dispatch(fetchQuerydata()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotesPage);