import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {
    const [value, setValue] = React.useState('Geben Sie hier ihre Nachricht ein');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (

        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '90ch' },
        }}
        noValidate
        autoComplete="off"
      >


  <div>

  <TextField
          id="outlined-textarea"
          label="Kontaktformular"
          placeholder="Ihre Nachricht hier"
          multiline
          maxRows={10}
   

    />

    </div >

    </Box>

  );

 }