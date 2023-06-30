import NavBar from '@/components/NavBar/NavBar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react'
import { FormControl, Button } from "@mui/material";
import { currency } from 'remask'
import {  useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import errosData from '@/functions/validator';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const form = () => {
    const [lanchs, setLanchs] = useState([])
    const { push, query } = useRouter()
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();


    useEffect(() => {
        if (query.id) {
            axios.get(`/api/combination/${query.id}`).then(result => {
                const combination = result.data

                for (let atributo in combination) {
                    setValue(atributo, combination[atributo])
                }
            })
        }
    }, [query.id])

    useEffect(() => {
        getAllLanchs()
    }, [])

    function getAllLanchs() {
        axios.get("/api/lanchs/lanchs").then(result => (
            setLanchs(result.data)
        ))
    }

    function Save(dados) {
        axios.put(`/api/combination/${query.id}`, dados)
        push("/administrative/combination")
    }

    function handleChangeMask(event) {
        const name = event.target.name
        const valor = event.target.value
        const unmask = currency.unmask({ locale: 'pt-BR', currency: 'BRL', value: valor })
        const value = currency.mask({ locale: 'pt-BR', currency: 'BRL', value: unmask })
        setValue(name, value)
    }


    return (
        <NavBar>
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh", flexDirection: "column" }}>
                <FormControl onSubmit={handleSubmit(Save)} style={{ marginBottom: "20px" }}>

                    <TextField
                        id="outlined-start-adornment"
                        label="Descrição do produto"
                        required={true}
                        error={errors.comb_description}
                        helperText={errors.comb_description?.message}
                        multiline
                        sx={{ marginBottom: 5 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register("comb_description", errosData["Comb"]["comb_description"])}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Valor"
                        required={true}
                        error={errors.comb_price}
                        helperText={errors.comb_price?.message}
                        sx={{ marginBottom: 5, width: '25ch' }}
                        onChange={(e) => handleChangeMask(e)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register("comb_price", errosData["Comb"]["comb_price"])}
                    />

                    {lanchs.map(item => (
                        <FormControlLabel control={<Checkbox   />} controlId={item.lanch_name} label={item.lanch_name} value={item.lanch_name}   {...register("comb_selected_options")} />
                    ))}


                </FormControl>
                <div sx={{ display: "flex" }}>
                    <Button onClick={() => push("/administrative/combination")} variant="outlined" color={"error"} startIcon={<ReplyIcon />} sx={{ marginRight: "10px" }}>
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

export default form