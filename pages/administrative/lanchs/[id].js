import React, { useEffect, useState } from 'react'
import { FormControl, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import NavBar from '../../../components/NavBar/NavBar';
import PreviewLanch from '../../../components/LanchCard/PreviewLanch';
import errosData from '@/functions/validator';
import { currency } from 'remask'
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';

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

const category = [
  {
    value: 'hamburguer',
    label: 'Hamburguer',
  },
  {
    value: 'cachorroquente',
    label: 'Cachorro quente',
  },
  {
    value: 'acompanhamentos',
    label: 'Acompanhamentos',
  },
  {
    value: 'bebidas',
    label: 'Bebidas',
  },
  {
    value: 'sobremesas',
    label: 'Sobremesas',
  },
];


const ids = () => {
  const { push, query } = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [composto, setComposto] = useState(false)
  const [ingredients, setIngredients] = useState([])


  useEffect(() => {
    getIngredients()
  }, [])


  function getIngredients() {
    axios.get("/api/ingredients/ingredients").then(result => (
      setIngredients(result.data)
    ))
  }

  useEffect(() => {
    if (query.id) {
      axios.get(`/api/lanchs/${query.id}`).then(result => {
        const lanchs = result.data

        for (let atributo in lanchs) {
          setValue(atributo, lanchs[atributo])
        }
      })
    }
  }, [query.id])

  function Save(dados) {
    axios.put(`/api/lanchs/${query.id}`, dados)
    push("/administrative/lanchs")
  }

  function handleChangeMask(event) {
    const name = event.target.name
    const valor = event.target.value
    const unmask = currency.unmask({ locale: 'pt-BR', currency: 'BRL', value: valor })
    const value = currency.mask({ locale: 'pt-BR', currency: 'BRL', value: unmask })
    setValue(name, value)
  }

  const handleChangeInput = (event) => {
    (event.target.value == "composto") ? setComposto(true) : setComposto(false)
  }


  return (
    <NavBar>
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh", flexDirection: "column" }}>
        <FormControl onSubmit={handleSubmit(Save)} style={{marginBottom: "20px"}}>
          <TextField
            id="outlined-start-adornment"
            label="Nome do produto"
            required={true}
            error={errors.lanch_name}
            helperText={errors.lanch_name?.message}
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginBottom: 5 }}
            {...register("lanch_name", errosData["Lanchs"]["lanch_name"])}
          />

          <TextField
            id="outlined-start-adornment"
            label="Descrição do produto"
            required={true}
            error={errors.lanch_description}
            helperText={errors.lanch_description?.message}
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            {...register("lanch_description", errosData["Lanchs"]["lanch_description"])}
            sx={{ marginBottom: 5 }}
          />
          <TextField
            id="outlined-basic"
            type="file"
            required={true}
            variant="outlined"
            inputProps={{
              multiple: true
            }}
            sx={{ marginBottom: 5 }}
          />

          <TextField
            id="outlined-basic"
            label="Valor"
            required={true}
            error={errors.lanch_price}
            helperText={errors.lanch_price?.message}
            sx={{ marginBottom: 5, width: '25ch' }}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("lanch_price", errosData["Lanchs"]["lanch_price"])}
            onChange={(e) => handleChangeMask(e)}
          />

          <TextField
            id="outlined-select-currency"
            label="Categoria"
            required={true}
            select
            defaultValue={category[0].value}
            onChange={handleChangeInput}
            {...register("lanch_category")}
            sx={{ marginBottom: 5, width: '25ch' }}
          >
            {category.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            label="Tipo"
            required={true}
            select
            defaultValue={currencies[0].value}
            onChange={handleChangeInput}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {composto &&
            ingredients.map(item => (
              <FormControlLabel control={<Checkbox />} label={item.ingredient_name} value={item.ingredient_name}  {...register("lanch_selected_options")}
              />
            ))
          }
        </FormControl>
        <div sx={{ display: "flex" }}>
          <Button onClick={() => push("/administrative/lanchs")} variant="outlined" color={"error"} startIcon={<ReplyIcon />} sx={{ marginRight: "10px" }}>
            Voltar
          </Button>
          <Button onClick={handleSubmit(Save)} variant="outlined" color={"success"} startIcon={<SendIcon />}>
            Enviar
          </Button>
        </div>


        {/*  <PreviewLanch image={backgroundImage} title={title} description={description} ingredients={selectedIngredients} /> */}
      </Container>
    </NavBar>
  )
}

export default ids