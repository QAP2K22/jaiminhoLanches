import NavBar from '@/components/NavBar/NavBar'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import axios from 'axios';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';

const index = () => {
  const [request, setRequests] = useState([])
  const [requestAndamentos, setRequestAndamentos] = useState([])
  const [requestFinalizados, setRequestFinalizados] = useState([])

  const [value, setValue] = useState(0)
  useEffect(() => {
    getRequests()
    getRequestsFinalizados()
    getRequestsAndamento()
  }, [])


  const getRequests = () => {
    axios.get("/api/pedidosAceitos/pedidosAceitos").then(result => (
      setRequests(result.data ?? [])
    ))
  }
  const getRequestsAndamento = () => {
    axios.get("/api/pedidosAndamento/pedidosAndamento").then(result => (
      setRequestAndamentos(result.data ?? [])
    ))
  }

  const getRequestsFinalizados = () => {
    axios.get("/api/pedidosFinalizados/pedidosFinalizados").then(result => (
      setRequestFinalizados(result.data ?? [])
    ))
  }
  const updateForAndamento = (id, dados) => {
    axios.post("/api/pedidosAndamento/pedidosAndamento", dados),
      axios.delete(`/api/pedidosAceitos/${id}`)
    getRequests()
    getRequestsAndamento()
  }

  const updateForFinalizado = (id, dados) => {
    axios.post("/api/pedidosFinalizados/pedidosFinalizados", dados),
    axios.delete(`/api/pedidosAndamento/${id}`)
    getRequestsAndamento()
    getRequestsFinalizados()
  }

  const updateRemove = (id) => {
    axios.delete(`/api/pedidosFinalizados/${id}`)
    getRequestsFinalizados()
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  function TabPanel({ children, value, index, ...other }) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {children}
      </div>
    );
  }


  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <NavBar>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Em espera" {...a11yProps(0)} />
            <Tab label="Em andamento" {...a11yProps(1)} />
            <Tab label="Finalizado" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {request.map(item => (
            <TableCell>
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <LunchDiningOutlinedIcon />
                </ListItemAvatar>
                <ListItemText primary={`Pedido N. #${item.id}`} secondary={`Pedido: ${item.compra_lanche} ${item.compra_combo}`} />

                <CheckCircleOutlineIcon color="warning" onClick={() => updateForAndamento(item.id, item)} sx={{ cursor: "pointer", marginLeft: 2, marginRight: 1 }} />
              </ListItem>
            </TableCell>
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {requestAndamentos.map(item => (
            <TableCell>
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <LunchDiningOutlinedIcon />
                </ListItemAvatar>
                <ListItemText primary={`Pedido N. #${item.id}`} secondary={`Pedido: ${item.compra_lanche} ${item.compra_combo}`} />

                <SoupKitchenIcon color="warning" onClick={() => updateForFinalizado(item.id, item)} sx={{ cursor: "pointer", marginLeft: 2, marginRight: 1 }} />
              </ListItem>
            </TableCell>
          ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {requestFinalizados.map(item => (
            <TableCell>
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <LunchDiningOutlinedIcon />
                </ListItemAvatar>
                <ListItemText primary={`Pedido N. #${item.id}`} secondary={`Pedido: ${item.compra_lanche} ${item.compra_combo}`} />

                <ElectricMopedIcon color="warning" onClick={() => updateRemove(item.id, item)} sx={{ cursor: "pointer", marginLeft: 2, marginRight: 1 }} />
              </ListItem>
            </TableCell>
          ))}
        </TabPanel>
      </Box>
    </NavBar>
  )
}

export default index