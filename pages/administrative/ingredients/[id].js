import React, { useEffect, useState } from 'react'
import { Button, Container, FormControl } from "@mui/material";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import NavBar from '@/components/NavBar/NavBar';
import errosData from '@/functions/validator';

const index = () => {
  const { push, query } = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (query.id) {
      axios.get(`/api/ingredients/${query.id}`).then(result => {
        const ingredients = result.data

        for (let atributo in ingredients) {
          setValue(atributo, ingredients[atributo])
        }
      })
    }
  }, [query.id])

  function Save(dados) {
    axios.put(`/api/ingredients/${query.id}`, dados)
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
            sx={{ marginBottom: 5 }}
            controlId="ingredient_name"
            required={true}
            error={errors.ingredient_name}
            helperText={errors.ingredient_name?.message}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("ingredient_name",errosData["Ingredients"]["ingredient_name"])}
          />
          <TextField
            id="outlined-number"
            label="Quantidade em estoque"
            type="number"
            placeholder="Digite a quantidade"
            sx={{ marginBottom: 2 }}
            controlId="ingredient_stock"
            required={true}
            error={errors.ingredient_stock}
            helperText={errors.ingredient_stock?.message}
            InputLabelProps={{
              shrink: true,
            }}
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