import { AppBar, IconButton, Rating, Typography, Box, Toolbar, Button, Menu } from "@mui/material";
import { useState } from "react";

export default function Playground() {
    
    //Deklariert eine Konstante mit dem Namen value und der Funktion setValue. useState definiert, dass die Seite reloaded wird on change
    const [value,setValue] = useState(2)
    //Neue Funktion mit dem Namen ratingChange, besitzt Parameter event und newValue 
    function ratingChange(event, newValue){
        setValue(newValue)
    }

    return(<>

    
    <Box sx={{ flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                     
            <Menu />
          </IconButton>
                 
                <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                    News
                </Typography>
                    <Button color="inherit">login></Button>
            </Toolbar>
        </AppBar>
    </Box>
    <Typography>
        Hallo Welt, Ihre Bewertung ist {value}
    </Typography>
    <Rating value={value} onChange={ratingChange} precision={0.5}>
        
    </Rating>   
    
    
    </>)
}