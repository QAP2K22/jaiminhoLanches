import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';
import NavBar from '@/components/NavBar/NavBar'
import TableData from '@/components/Table/Table'
import Button from '@mui/material/Button';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material';

const index = () => {
  const [combination, setCombination] = useState([])
  const [confirm, setConfirm] = useState(false)
  const [itemId, setItemId] = useState(0)

  useEffect(() => {
    getCombination()
  }, [])

  const activeConfirm = (Id) => {
    setConfirm(true)
    setItemId(Id)
  }

  const closeConfirm = () => {
    setConfirm(false)
  }

  const confirmRem = () => {
    axios.delete(`/api/combination/${itemId}`)
    getCombination()
    setItemId(0)
    setConfirm(false)
  }


  function getCombination() {
    axios.get("/api/combination/combination").then(result => (
      setCombination(result.data)
    ))
  }

  return (
    <NavBar>
      <Container>
        <Link href={"/administrative/combination/form"}>
          <Button variant="outlined" sx={{ marginBottom: "10px" }}>Cadastrar combos</Button>
        </Link>
        <TableData array={combination} columnName="combination" reUpdate={activeConfirm} />

        {confirm &&
          <ConfirmDialog setConfirm={confirmRem} setClose={closeConfirm} title="Remover combo?" />
        }
      </Container>
    </NavBar>
  )
}

export default index