import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Link from 'next/link';
import { TableVirtuoso } from 'react-virtuoso';

const columns = {
    "ingredients": [
        {
            width: 140,
            label: 'Nome do ingrediente',
            dataKey: 'ingredient_name',
        },
        {
            width: 120,
            label: 'Quantidade em estoque',
            dataKey: 'ingredient_stock',
        },
        {
            width: 1,
            label: 'Editar',
            dataKey: 'id',

        },
        {
            width: 1,
            label: 'Excluir',
            dataKey: 'id',
        },
    ],
    "lanchs": [
        {
            width: 140,
            label: 'Nome do produto',
            dataKey: 'lanch_name',
        },
        {
            width: 120,
            label: 'Descrição do produto',
            dataKey: 'lanch_description',
        },
        {
            width: 60,
            label: 'Preço',
            dataKey: 'lanch_price',
        },
        {
            width: 60,
            label: 'Categoria',
            dataKey: 'lanch_category',
        },
        {
            width: 1,
            label: 'Editar',
            dataKey: 'id',

        },
        {
            width: 1,
            label: 'Excluir',
            dataKey: 'id',
        },
    ],
    "combination": [
        {
            width: 140,
            label: 'Itens do combo',
            dataKey: 'comb_selected_options',
        },
        {
            width: 60,
            label: 'Preço',
            dataKey: 'comb_price',
        },
        {
            width: 1,
            label: 'Editar',
            dataKey: 'id',

        },
        {
            width: 1,
            label: 'Excluir',
            dataKey: 'id',
        },
    ]
}


const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent(columnName) {

    return (
        <TableRow>
            {columns[columnName].map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'left'}
                    style={{ width: column.width }}
                    sx={{
                        backgroundColor: 'background.paper',
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}


const TableData = ({ columnName = "ingredients", array = [], reUpdate }) => {
    const [dataArray, setDataArray] = useState([])

    useEffect(() => {
        setDataArray(array)
    }, [array])


    function rowContent(_index, row, columnName) {
        const reactSwitch = (label, type, row, columnName) => {
            switch (label) {
                case "Editar":
                    return (
                        <Link href={`${columnName}/${row[type]}`}>
                            <ModeEditIcon color="primary" />
                        </Link>
                    )

                case "Excluir":
                    return (
                        <DeleteForeverIcon sx={{cursor: "pointer"}} color="error" onClick={() => reUpdate(row[type], columnName)} />
                    )
                default:
                    return row[type]
            }
        }

        return (
            <React.Fragment>
                {columns[columnName].map((column) => (
                    <TableCell
                        key={column.dataKey}
                        align={column.numeric || false ? 'right' : 'left'}
                    >
                        {reactSwitch(column.label, column.dataKey, row, columnName)}
                    </TableCell>
                ))}
            </React.Fragment>
        );
    }


    return (
        <Paper style={{ height: 400, width: '100%' }}>
            <TableVirtuoso
                data={dataArray}
                components={VirtuosoTableComponents}
                fixedHeaderContent={() => fixedHeaderContent(columnName)}
                itemContent={(index, groupIndex) => rowContent(index, groupIndex, columnName)}
            />
        </Paper>
    )
}

export default TableData