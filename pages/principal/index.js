import NavBarPrincipal from '../../components/NavBarPrincipal/NavBarPrincipal'
import React, { Fragment, useEffect } from 'react'
import { useState } from "react";
import { useRouter } from 'next/router';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios';
import errosData from '@/functions/validator';
import { mask } from 'remask'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const index = () => {
  const { push } = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [lanchs, setLanchs] = useState([])
  const [combos, setCombos] = useState([])



  const [selectedCombos, setSelectedCombos] = useState([])
  const [selectedLanchs, setSelectedLanchs] = useState([])

  useEffect(() => {
    getAllLanchs()
    getAllCombs()
  }, [])

  function getAllLanchs() {
    axios.get("/api/lanchs/lanchs").then(result => (
      setLanchs(result.data)
    ))
  }
  function getAllCombs() {
    axios.get("/api/combination/combination").then(result => (
      setCombos(result.data)
    ))
  }

  function Save(dados) {
    axios.post("/api/pedidos/pedidos", dados)

    alert("Compra feita com sucesso! Em breve entregaremos seu pedido!")
    push("/")
  }


  function handleChange(event) {
    const name = event.target.name
    const valor = event.target.value
    const mascara = event.target.getAttribute("mask")
    setValue(name, mask(valor, mascara))
  }


  return (
    <NavBarPrincipal>
      <Fragment>
        <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
          <Box sx={{ padding: 5 }}>
            <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5, textAlign: "center" }}>
              FAÇA SEU PEDIDO AGORA MESMO!!
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", alingItens: "center", flexDirection: "column", marginBottom: 6 }}>
              <TextField
                id="outlined-start-adornment"
                label="Digite seu nome"
                required={true}
                error={errors.compra_nome}
                helperText={errors.compra_nome?.message}
                multiline
                {...register("compra_nome", errosData["Compra"]["compra_nome"])}
                sx={{ marginBottom: 5 }}
              />

              <TextField
                id="outlined-basic"
                label="Digite seu número"
                required={true}
                error={errors.compra_numero}
                helperText={errors.compra_numero?.message}
                controlId="compra_numero"
                inputProps={{ mask: "(99) 9 9999-9999" }}
                {...register("compra_numero", errosData["Compra"]["compra_numero"])}
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: 5 }}
              />

              <TextField
                id="outlined-start-adornment"
                label="Digite seu endereço"
                required={true}
                error={errors.compra_endereco}
                helperText={errors.compra_endereco?.message}
                {...register("compra_endereco", errosData["Compra"]["compra_endereco"])}
                multiline
                sx={{ marginBottom: 5 }}
              />

              <TextField
                id="outlined-start-adornment"
                label="Complemento"
                required={true}
                error={errors.compra_complemento}
                helperText={errors.compra_complemento?.message}
                {...register("compra_complemento", errosData["Compra"]["compra_complemento"])}
                multiline
                sx={{ marginBottom: 5 }}
              />

              <TextField
                id="outlined-basic"
                label="Digite seu CEP"
                required={true}
                error={errors.compra_cep}
                helperText={errors.compra_cep?.message}
                controlId="compra_cep"
                inputProps={{ mask: "99999-999" }}
                {...register("compra_cep", errosData["Compra"]["compra_cep"])}

                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: 5 }}
              />

              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={lanchs}
                disableCloseOnSelect
                getOptionLabel={(option) => option.lanch_name}
                {...register("compra_lanche")}
                onChange={(event, filterValue) => {
                  setValue("compra_lanche", filterValue[0])

                }}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.lanch_name}
                  </li>
                )}
                style={{ width: 300 }}
                multiline
                renderInput={(params) => (
                  <TextField {...params} label="Lanches/Bebidas" placeholder="Escolha seu lanche/bebida" />
                )}
              />

              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={combos}
                disableCloseOnSelect
                getOptionLabel={(option) => option.comb_description}
                {...register("compra_combo")}
                onChange={(event, filterValue) => {
                  setValue("compra_combo",filterValue[0])
                }}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.comb_description}
                  </li>
                )}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Combos" placeholder="Escolha seu combo" />
                )}
              />
            </Box>
            <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button onClick={() => push("/administrative/ingredients")} variant="outlined" color={"error"} startIcon={<ReplyIcon />} sx={{ marginRight: "10px" }}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit(Save)} variant="outlined" color={"success"} startIcon={<SendIcon />}>
                Comprar lanche
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Box>
        </Paper>
      </Fragment>


    </NavBarPrincipal>
  )
}

export default index