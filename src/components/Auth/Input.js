import React from 'react';
import { TextField, Grid, IconButton, InputAdornment } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({half, name, label, autoFocus, handleChange, type, handleShowChange}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
            name={name}
            label={label}
            variant="outlined"
            onChange={handleChange}
            required
            fullWidth
            autoFocus={autoFocus}
            type={type}
            InputProps={name === "password" ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowChange} >
                            {type === "password" ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
                )
            } : null }
            />
        </Grid>
    )
}

export default Input
