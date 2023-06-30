import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';
import NavBar from '@/components/NavBar/NavBar'
import TableData from '@/components/Table/Table'
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const index = () => {
  const [ingredients, setIngredients] = useState([])
  const [confirm, setConfirm] = useState(false)
  const [itemId,setItemId] = useState(0)

  useEffect(() => {
    getIngredients()
  }, [])

  const activeConfirm = (Id) => {
    setConfirm(true)
    setItemId(Id)
  }

  const closeConfirm = () => {
    setConfirm(false)
  }

  const confirmRem = () => {
    axios.delete(`/api/ingredients/${itemId}`)
    getIngredients() 
    setItemId(0)
    setConfirm(false)
  }


  function getIngredients() {
    axios.get("/api/ingredients/ingredients").then(result => (
      setIngredients(result.data)
    ))
  }

  return (
    <NavBar>
      <Container>
        <Link href={"/administrative/ingredients/form"}>
          <Button variant="outlined" sx={{ marginBottom: "10px" }}>Cadastrar ingredientes</Button>
        </Link>
        <TableData array={ingredients} reUpdate={activeConfirm} />

        {confirm &&
          <ConfirmDialog setConfirm={confirmRem} setClose={closeConfirm} title="Remover ingrediente?"/>
        }
      </Container>
    </NavBar>
  )
}

export default index