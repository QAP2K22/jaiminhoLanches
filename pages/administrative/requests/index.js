import NavBar from '@/components/NavBar/NavBar'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RequestTable from '@/components/RequestTable/RequestTable';
import axios from 'axios';


const index = () => {
  const [kitchenStatus, setKitchenStatus] = useState(false)
  const [request, setRequests] = useState([])

  useEffect(() => {
    getOpenStatus()
    getRequests()
  }, [])


  const getOpenStatus = () => {
    setKitchenStatus(JSON.parse(window.localStorage.getItem("kitchenStatus")) ?? false)
  }

  const setOpenStatus = (value) => {
    setKitchenStatus(value)
    window.localStorage.setItem("kitchenStatus", JSON.stringify(value))
  }


  const getRequests = () => {
    axios.get("/api/pedidos/pedidos").then(result => (
      setRequests(result.data)
    ))
  }

  const IsAcceptItem = (id,dados) => {
     axios.post("/api/pedidosAceitos/pedidosAceitos", dados),
    axios.delete(`/api/pedidos/${id}`)
    getRequests() 

  }
  const IsRemoveItem = (id) => {
    axios.delete(`/api/pedidos/${id}`)
    getRequests()
  }


  return (
    <NavBar>
      <Button variant="outlined" color={kitchenStatus ? "error" : "success"} onClick={() => setOpenStatus(!kitchenStatus)} sx={{ float: "right" }}>{kitchenStatus ? "Fechar" : "Abrir"}</Button>
      <Typography variant="h3" sx={{ textAlign: "center", marginBottom: 10, fontSize: 30 }}>Últimos pedidos</Typography>
      <RequestTable array={request} remItem={IsRemoveItem} AcceptItem={IsAcceptItem} />
    </NavBar>
  )
}

export default index