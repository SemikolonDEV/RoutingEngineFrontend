import { Favorite, Navigation } from "@mui/icons-material"
import { Box, Fab, Paper, TextField } from "@mui/material"
import dynamic from "next/dynamic"
import { useRef } from "react";
require('graphhopper-js-api-client')

export default function Map() {

    const LeafletMap = dynamic(() => import("../components/LeafletMap"), { ssr: false })

    const startDestination = useRef();

    const targetDestination = useRef();

    const NavigationClick = () => {
        console.log(startDestination.current.value)
        const key = "57a00f5e-520b-4b79-b371-5e915498f01b"
        let ghGeoencoding = new GraphHopper().Geocoding({key: key})

        ghGeoencoding.doRequest({query: startDestination.current.value, locale: "de", limit: 1})
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
                <TextField id="outlined-basic" label="Startpunkt" inputRef={startDestination} variant="outlined" />
                <TextField id="filled-basic" label="Zielort" inputRef={targetDestination} variant="outlined" />
            </Box>

            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab variant="extended" onClick={NavigationClick}>
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