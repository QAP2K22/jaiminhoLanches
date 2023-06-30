import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';
import NavBar from '@/components/NavBar/NavBar'
import TableData from '@/components/Table/Table'
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const index = () => {
  const [lanchs, setLanchs] = useState([])
  const [confirm, setConfirm] = useState(false)
  const [itemId, setItemId] = useState(0)

  useEffect(() => {
    getLanchs()
  }, [])

  const activeConfirm = (Id) => {
    setConfirm(true)
    setItemId(Id)
  }

  const closeConfirm = () => {
    setConfirm(false)
  }

  const confirmRem = () => {
    axios.delete(`/api/lanchs/${itemId}`)
    setItemId(0)
    setConfirm(false)
    getLanchs()
  }


  function getLanchs() {
    axios.get("/api/lanchs/lanchs").then(result => (
      setLanchs(result.data)
    ))
  }

  return (
    <NavBar>
      <Container>
        <Link href={"/administrative/lanchs/form"}>
          <Button variant="outlined" sx={{ marginBottom: "10px" }}>Cadastrar produtos</Button>
        </Link>
        <TableData array={lanchs} columnName="lanchs" reUpdate={activeConfirm} />

        {confirm &&
          <ConfirmDialog setConfirm={confirmRem} setClose={closeConfirm} title="Remover produto?" />
        }
      </Container>
    </NavBar>
  )
}

export default index