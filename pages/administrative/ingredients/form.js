import React from 'react'
import { FormControl, Button, Container } from "@mui/material";
import TextField from '@mui/material/TextField';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import NavBar from '@/components/NavBar/NavBar';
import errosData from '@/functions/validator';


const index = () => {
  const { push } = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm();


  function Save(dados) {
    axios.post("/api/ingredients/ingredients", dados)
    push("/administrative/ingredients")
  }


  return (
    <NavBar>
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh", flexDirection: "column" }}>
        <FormControl onSubmit={handleSubmit(Save)}>
          <TextField
            id="outlined-start-adornment"
            label="Nome do ingrediente"
            multiline
            required={true}
            error={errors.ingredient_name}
            helperText={errors.ingredient_name?.message}
            sx={{ marginBottom: 5 }}
            {...register("ingredient_name",errosData["Ingredients"]["ingredient_name"])}
          />
          <TextField
            id="outlined-number"
            label="Quantidade em estoque"
            type="number"
            required={true}
            error={errors.ingredient_stock}
            helperText={errors.ingredient_stock?.message}
            sx={{ marginBottom: 2 }}
            {...register("ingredient_stock",errosData["Ingredients"]["ingredient_stock"])}
          />
          <div sx={{ display: "flex" }}>
            <Button onClick={() => push("/administrative/ingredients")} variant="outlined" color={"error"} startIcon={<ReplyIcon />} sx={{ marginRight: "10px" }}>
              Voltar
            </Button>
            <Button onClick={handleSubmit(Save)} variant="outlined" color={"success"} startIcon={<SendIcon />}>
              Enviar
            </Button>
          </div>
        </FormControl>
      </Container>
    </NavBar>
  )
}

export default index