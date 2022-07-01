import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Input, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

export default function MultilineTextFields() {
    const [value, setValue] = React.useState('Geben Sie hier ihre Nachricht ein');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const Input = styled('input')({
        display: 'none',
      });

    return (
    <>

    <Typography variant= "h3"> Kontaktformular
    
    
    </Typography>

        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '60ch' },
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

    <Stack direction="row" alignItems="center" spacing={2}>
    <label htmlFor="icon-button-file">
      <Input accept="image/*" id="icon-button-file" type="file" />
      <IconButton color="primary" aria-label="upload picture" component="span">
        <PhotoCamera />
      </IconButton>
    </label>
    <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>

  </Stack>
  </>
  
  );



 }