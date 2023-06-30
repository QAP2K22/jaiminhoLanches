import React, { useState } from 'react'
import { FormControl, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const currencies = [
  {
    value: 'simples',
    label: 'Simples',
  },
  {
    value: 'composto',
    label: 'Composto',
  },
];


const index = () => {
  const [composto, setComposto] = useState(false)



  const handleChange = (event) => {
    (event.target.value == "composto") ? setComposto(true) : setComposto(false)
  };

  return (
    <Container fixed>
      <FormControl>
        <TextField
          id="outlined-start-adornment"
          label="Nome do produto"
          placeholder="Placeholder"
          multiline
          sx={{ marginBottom: 10 }}
        />
        <TextField
          id="outlined-textarea"
          label="Descrição do produto"
          placeholder="Placeholder"
          multiline
          sx={{ marginBottom: 10 }}
        />

        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue={currencies[0].value}
          helperText="Please select your currency"
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Valor"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          }}
        />


        {composto &&
          <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
        }

        <Button>Submit</Button>
      </FormControl>
    </Container>

  )
}

export default index