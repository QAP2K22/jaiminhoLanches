import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { FormControl, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { push } = useRouter()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const users = [
    {  name: "Joao Carlos", email: "joao", password: 1124 },
    {  name: "Jaiminho", email: "Jaiminho", password: 1234},

  ];

  const teste = (teste) => {
    const user = users.find((user) => user.email === teste.login & user.password == teste.password);
    if (user) {
      alert(`Bem-vindo, ${user.name}!`)
      push("/administrative/requests")
    } else {
      alert("Login inexistente, favor contatar a equipe seu Jaiminha lanches")
    }
  }


  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column" }}>
      <Typography variant="h3" sx={{marginBottom: 10, fontSize: 30}}>Jaiminho Lanches - Painel administrativo</Typography>
      <FormControl onSubmit={handleSubmit(teste)}>
        <TextField
          id="outlined-start-adornment"
          label="Login"
          name="Login"
          placeholder="Digite seu login"
          multiline
          sx={{ marginBottom: 5, width: '25ch' }}
          {...register("login")}
        />

        <FormControl sx={{ marginBottom: 2, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }

            placeholder="Digite sua senha"
            label="Password"
            name="Password"
            {...register("password")}
          />
        </FormControl>

        <Button onClick={handleSubmit(teste)} variant="contained">Entrar</Button>
        
        <Button onClick={() => push("/")} variant="contained" sx={{marginTop: "15px"}}>Voltar</Button>
      </FormControl>
    </Box>
  )
}

export default index