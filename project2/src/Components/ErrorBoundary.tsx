import { Component, ErrorInfo, ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
      super(props)
    
      this.state = {
         hasError: false
      }
    }
    static getDerivedStateFromError(error: unknown): Partial<State> | null {
        return {
            hasError: true
        }
   
    }
    componentDidCatch(error: Error, info: ErrorInfo): void {
      console.log(error)
      console.log(info)
    }

  render() {
      if(this.state.hasError){
        return(
            <>
          <Box display={"flex"} justifyContent={"center"} sx={{mt:"220px"}}><Typography>Something went Wrong!!!</Typography></Box>
            </>
        )
      }
 else{
  return this.props.children
 }
    
  }
}
