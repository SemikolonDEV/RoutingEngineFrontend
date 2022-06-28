import { Favorite, Navigation } from "@mui/icons-material"
import { Box, Fab, Paper, TextField } from "@mui/material"
import dynamic from "next/dynamic"
import Head from "next/head"

export default function Map() {

    const LeafletMap = dynamic(() => import("../components/LeafletMap"), { ssr: false })

    return (
        <>
        <Box sx={{display: 'flex'}}>
            <Paper sx={{zIndex:'1', margin: '5px'}}>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { display: 'flex', flexDirection:'row' , m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Startpunkt" variant="outlined" />
                <TextField id="filled-basic" label="Zielort" variant="outlined" />
            </Box>

            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab variant="extended" >
                    <Navigation sx={{ mr: 1 }} />
                    Navigate
                </Fab>
                <Fab disabled aria-label="like">
                    <Favorite />
                </Fab>
            </Box>
            </Paper>
            <LeafletMap></LeafletMap>
        </Box>
             
        </>)
}