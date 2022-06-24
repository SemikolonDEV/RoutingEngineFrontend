import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import TextField from '@mui/material/TextField'

export default function FloatingActionButtons() {
    return (
<>
<Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended">
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab>
      <Fab disabled aria-label="like">
        <FavoriteIcon />
      </Fab>
    </Box>

<Box
component="form"
sx={{
  '& > :not(style)': { m: 1, width: '25ch' },
}}
noValidate
autoComplete="off"
>
<TextField id="outlined-basic" label="Startpunkt" variant="outlined" />
<TextField id="filled-basic" label="Zielort" variant="outlined" />
</Box>
</>




    );
}

