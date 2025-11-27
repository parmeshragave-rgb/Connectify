// import "./App.css";
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
import { Box, CircularProgress, Typography } from "@mui/material";
import ErrorBoundary from "./Components/ErrorBoundary";
import ProtectedRoute from "./Components/ProtectedRoute"

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Suspense fallback={
        <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><ErrorBoundary><ProtectedRoute><LazyHome/></ProtectedRoute></ErrorBoundary></Suspense>} />
          <Route path="search" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><ErrorBoundary><ProtectedRoute><LazySearchUsers/></ProtectedRoute></ErrorBoundary></Suspense>} />
          <Route path="/post/:id" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><ErrorBoundary><ProtectedRoute><LazyPostDetailPage/></ProtectedRoute></ErrorBoundary></Suspense>}  />
          <Route path="/userprofile/:id" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><ErrorBoundary><ProtectedRoute><LazyUserProfile/></ProtectedRoute></ErrorBoundary></Suspense>} />
          <Route path="liked" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><ErrorBoundary><ProtectedRoute><LazyLikedPage/></ProtectedRoute></ErrorBoundary></Suspense>}  />
          <Route path="quotes" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><ErrorBoundary><ProtectedRoute><LazyQuotesPage/></ProtectedRoute></ErrorBoundary></Suspense>}/>
          <Route path="profile" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><ErrorBoundary><ProtectedRoute><LazyProfile/></ProtectedRoute></ErrorBoundary></Suspense>} />
          <Route path="login" element={<Suspense fallback={
            <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><CircularProgress sx={{color:"black"}}/></Box>}><ErrorBoundary><LazyLogin/></ErrorBoundary></Suspense>}  />
            <Route path="*" element={<Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><Typography variant="h6">No Match Found</Typography></Box>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
