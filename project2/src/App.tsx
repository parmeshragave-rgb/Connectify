import "./App.css";
import { lazy,Suspense} from 'react';
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const LazySearchUsers=lazy(() => import('./Pages/SearchUsers'))
const LazyPostDetailPage=lazy(() => import('./Pages/PostDetailPage'))
const LazyLikedPage =lazy(() => import('./Pages/LikedPosts'))
const LazyQuotesPage =lazy(() => import('./Pages/QuotesPage'))
const LazyProfile =lazy(() => import('./Pages/Profile'))
const LazyUserProfile = lazy(() => import('./Pages/UserProfile'));
const LazyLogin = lazy(() => import('./Pages/Login'));
const LazyHome = lazy(() => import('./Pages/Home'));





import { Box, CircularProgress } from "@mui/material";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><LazyHome/></Suspense>} />
          <Route path="search" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><LazySearchUsers/></Suspense>} />
          <Route path="/post/:id" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><LazyPostDetailPage/></Suspense>}  />
          <Route path="/userprofile/:id" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><LazyUserProfile/></Suspense>} />
          <Route path="liked" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><LazyLikedPage/></Suspense>}  />
          <Route path="quotes" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><LazyQuotesPage/></Suspense>}/>
          <Route path="profile" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><LazyProfile/></Suspense>} />
          <Route path="login" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><LazyLogin/></Suspense>}  />
        </Routes>
      </Router>
    </>
  )
}

export default App;
