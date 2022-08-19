import React from "react";
import Dialog from '@mui/material/Dialog';
import InputBase from "@mui/material/InputBase";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

export const CInput = styled((props) => (
    <InputBase {...props} />
))(() => ({
    height: 45,
    borderRadius: 6,
    border: '1px solid rgb(118, 118, 118)',
    padding: 12,
}))

export const CTextField = styled((props) => (
    <TextField {...props} size="small" />
))(() => ({

}))

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialog-paper': {
        maxWidth: '100%'
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiBackdrop-root': {
        background: 'transparent'
    }
}));