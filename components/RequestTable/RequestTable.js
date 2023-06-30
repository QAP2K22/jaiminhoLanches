import React from 'react'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { TableVirtuoso } from 'react-virtuoso'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import TableCell from '@mui/material/TableCell'


const RequestTable = ({array , remItem, AcceptItem}) => {
    return (
        <Box sx={{ marginInline: "auto", width: "50%", height: "40%", boxShadow: 2 }}>
            <TableVirtuoso
                style={{ height: 400 }}
                data={array}
                itemContent={(index, user) => (
                    <TableCell>
                        <ListItem key={index + user.person}>
                            <ListItemAvatar>
                                <LunchDiningOutlinedIcon />
                            </ListItemAvatar>
                            <ListItemText primary={`Pedido N. #${user.id}`} secondary={`Pedido: ${user.compra_lanche} ${user.compra_combo}`} />

                            <CheckCircleOutlineIcon color="success" onClick={()=> AcceptItem(user.id,user)}  sx={{ cursor: "pointer", marginLeft: 2, marginRight: 1 }} />
                            <CancelIcon color="error" onClick={()=> remItem(user.id)} sx={{ cursor: "pointer" }}/>
                        </ListItem>
                    </TableCell>
                )}
            />
        </Box>
    )
}

export default RequestTable

