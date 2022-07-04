import { Favorite, Navigation } from "@mui/icons-material"
import { Alert, Box, Fab, Paper, Snackbar, TextField } from "@mui/material"
import dynamic from "next/dynamic"
import { useRef, useState } from "react";
import * as React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import Stack from '@mui/material/Stack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
require('graphhopper-js-api-client')

export default function Map() {

    const LeafletMap = dynamic(() => import("../components/LeafletMap"), { ssr: false })

    const startDestination = useRef<HTMLInputElement>();

    const targetDestination = useRef<HTMLInputElement>();

    const [startCoord, setStartCoord] = useState();

    const [targetCoord, setTargetCoord] = useState();

    const [open, setOpen] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false)
      };

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

        setOpen(true)
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Route wurde berechnet
                </Alert>
            </Snackbar>
            <Box sx={{display: 'flex'}}>
                <Paper sx={{zIndex:'1', margin: '5px'}}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { display: 'flex', flexDirection:'row' , m: 1, width: '25ch'  },
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