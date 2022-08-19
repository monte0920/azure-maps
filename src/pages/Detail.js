import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';

import AddMeasure from './AddMeasure';
import { BootstrapDialog } from "../components/Styled";

const columns = [
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'measure', headerName: 'Measure', width: 220, },
    { field: 'value', headerName: 'Value', width: 80 },
    {
        field: 'note',
        headerName: 'Note',
        width: 175,
    },
    {
        field: 'image',
        headerName: 'Image',
        sortable: false,
        width: 170,
        renderCell: (params) => {
            return (
                <img src={require(`../assets/img/${params.row.img}`).default} width="150" height="100" />
            )
        }
    }
];



const Detail = (props) => {
    const [addDrawer, setAddDrawer] = useState(false);
    const { open, close, data, block } = props;

    const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };

    return (
        <Stack>
            <BootstrapDialog
                onClose={close}
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={close}>
                    {block.name} - Crop Measure Instances
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Stack
                        sx={{
                            height: 400,
                            width: 780,
                            '& .MuiDataGrid-cell': {
                                '&:focus': {
                                    outline: 'none !important'
                                }
                            },
                            '& .MuiDataGrid-columnHeader': {
                                '&:focus': {
                                    outline: 'none !important'
                                }
                            }
                        }}>
                        <DataGrid
                            rows={data || []}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            rowHeight={100}
                            // checkboxSelection
                            disableColumnMenu
                            disableSelectionOnClick
                            disableColumnSelector
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ pr: '16px !important' }}>
                    <Button variant="contained" onClick={() => setAddDrawer(true)}>
                        Add Measure
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <AddMeasure state={addDrawer} onClose={() => setAddDrawer(false)} />
        </Stack>
    );
}

export default Detail;
