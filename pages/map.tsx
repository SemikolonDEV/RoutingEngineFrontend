import { Favorite, Navigation } from "@mui/icons-material"
import { Box, Fab, Paper, TextField } from "@mui/material"
import dynamic from "next/dynamic"
import { useRef, useState } from "react";
require('graphhopper-js-api-client')

export default function Map() {

    const LeafletMap = dynamic(() => import("../components/LeafletMap"), { ssr: false })

    const startDestination = useRef<HTMLInputElement>();

    const targetDestination = useRef<HTMLInputElement>();

    const [startCoord, setStartCoord] = useState();

    const [targetCoord, setTargetCoord] = useState();

    const NavigationClick = async (event : React.SyntheticEvent) => {
        event.preventDefault();

        const key = "55f4d516-09b7-4bc0-bc8a-76a07455b883"
        let ghGeoencoding = new GraphHopper.Geocoding({key: key})

        const startJson = await ghGeoencoding.doRequest({query: startDestination.current?.value, locale: "de", limit: 1})
        const targetJson = await ghGeoencoding.doRequest({query: targetDestination.current?.value, locale: "de", limit: 1})

        const startPoint  = startJson.hits[0].point
        const targetPoint = targetJson.hits[0].point

        setStartCoord(startPoint)
        setTargetCoord(targetPoint)

        let ghRouting = new GraphHopper.Routing({key: key})

        const routingRequestdata = {points: [[startPoint['lng'], startPoint['lat']], [targetPoint['lng'], targetPoint['lat']]], locale: 'de', profile: 'bike', elevation: false};

        const result = await ghRouting.doRequest(routingRequestdata)

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
                autoComplete="off"
                onSubmit={NavigationClick}
            >
                <TextField id="outlined-basic" label="Startpunkt" required inputRef={startDestination} variant="outlined" />
                <TextField id="filled-basic" label="Zielort" required inputRef={targetDestination} variant="outlined" />
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab variant="extended" type="submit">
                        <Navigation sx={{ mr: 1 }} />
                        Navigate
                    </Fab>
                    <Fab disabled aria-label="like">
                        <Favorite />
                    </Fab>
                </Box>
            </Box>
            </Paper>
            <LeafletMap startCoord={startCoord} targetCoord={targetCoord}/>
        </Box>          
        </>)
}