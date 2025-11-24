
import { useSelector } from 'react-redux'
import type { RootState } from '../Redux'
import { Avatar, Card, CardContent, Grid } from '@mui/material';
function Profile() {
    const { user } = useSelector((s: RootState) => s.auth);
    
  return (
    <>
     <Grid>
        <Card>
            <CardContent><Avatar>{user.username.charAt(0).toUpperCase()}</Avatar></CardContent>
        </Card>
     </Grid>
    </>
  )
}

export default Profile