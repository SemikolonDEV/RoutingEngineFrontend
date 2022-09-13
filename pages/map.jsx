import { Favorite, Navigation, RestoreOutlined } from "@mui/icons-material"
import { Alert, Box, Fab, Paper, Snackbar, TextField, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { useRef, useState , useCallback} from "react";
import * as React from 'react';


require('graphhopper-js-api-client')

export default function Map() {

    const LeafletMap = dynamic(() => import("../components/LeafletMap"), { ssr: false })

    const origin = useRef();

    const destination = useRef();

    const [startCoord, setStartCoord] = useState();

    const [targetCoord, setTargetCoord] = useState();

    const [price, setPrice] = useState(null);

    const [open, setOpen] = React.useState(false);

    const handleClose = useCallback( (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false)
      }, [open]);

    const NavigationClick = async (event ) => {
        event.preventDefault();

        const key = "55f4d516-09b7-4bc0-bc8a-76a07455b883"
        let ghGeoencoding = new GraphHopper.Geocoding({key: key})

        const startJson = await ghGeoencoding.doRequest({query: origin.current?.value, locale: "de", limit: 1})
        const targetJson = await ghGeoencoding.doRequest({query: destination.current?.value, locale: "de", limit: 1})

        const startPoint  = startJson.hits[0].point
        const targetPoint = targetJson.hits[0].point

        setStartCoord(startPoint)
        setTargetCoord(targetPoint)

        let ghRouting = new GraphHopper.Routing({key: key})

        const routingRequestdata = {points: [[startPoint['lng'], startPoint['lat']], [targetPoint['lng'], targetPoint['lat']]], locale: 'de', profile: 'bike', elevation: false};

        const result = await ghRouting.doRequest(routingRequestdata)

        const minutes = Math.ceil(result.paths[0].time / 60000)

        const price = Math.round(((minutes * 0.15 + 1) + Number.EPSILON) *100) / 100;

        setPrice(price)

        setOpen(true)

        // Send Log to Backend
        fetch("http://localhost:5257/api/Logging", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                origin: origin.current?.value,
                destination: destination.current?.value,
                distance: result.paths[0].distance,
                price: price,
                travelTime: minutes
            })
        }).then(response => console.log(response.json()))



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
                        <TextField id="outlined-basic" label="Startpunkt" required inputRef={origin} variant="outlined" />
                        <TextField id="filled-basic" label="Zielort" required inputRef={destination} variant="outlined" />
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Fab variant="extended" type="submit">
                                <Navigation sx={{ mr: 1 }} />
                                Navigate
                            </Fab>
                            <Fab disabled aria-label="like">
                                <Favorite />
                            </Fab>
                        </Box>
                        {price != null &&  <Typography>Der Fahrpreis beträgt: {price.toFixed(2).toString().replace(".", ",")} €</Typography>}
                    </Box>
                </Paper>
                <LeafletMap startCoord={startCoord} targetCoord={targetCoord}/>
            </Box>          
        </>)
}