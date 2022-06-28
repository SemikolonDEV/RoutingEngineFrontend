import { Favorite, Navigation } from "@mui/icons-material"
import { Box, Fab, Paper, TextField } from "@mui/material"
import dynamic from "next/dynamic"
import { useRef } from "react";
import { GraphHopper } from 'graphhopper-js-api-client'

export default function Map() {

    const LeafletMap = dynamic(() => import("../components/LeafletMap"), { ssr: false })

    const startDestination = "";

    const targetDestination = "";

    const NavigationClick = () => {
        console.log(startDestination)
        const key = "57a00f5e-520b-4b79-b371-5e915498f01b"
        let ghGeoencoding = new GraphHopper().Geocoding({key: key})

        ghGeoencoding.doRequest({query: startDestination, locale: "de", limit: 1})
            .then((json : string) => {
                console.log(json)

            });
    }

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
                <TextField id="outlined-basic" label="Startpunkt" value={startDestination} variant="outlined" />
                <TextField id="filled-basic" label="Zielort" value={targetDestination} variant="outlined" />
            </Box>

            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab variant="extended" >
                    <Navigation sx={{ mr: 1 }} onClick={NavigationClick} />
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