import { Rating, Typography } from "@mui/material";
import { useState } from "react";

export default function Playground() {
    
    //Deklariert eine Konstante mit dem Namen value und der Funktion setValue. useState definiert, dass die Seite reloaded wird on change
    const [value,setValue] = useState(2)
    //Neue Funktion mit dem Namen ratingChange, besitzt Parameter event und newValue 
    function ratingChange(event, newValue){
        setValue(newValue)
    }

    return(<>
    <Typography>
        Hallo Welt, Ihre Bewertung ist {value}
    </Typography>
    <Rating value={value} onChange={ratingChange} precision={0.5}>
        
    </Rating>
    
    
    
    
    </>)
}