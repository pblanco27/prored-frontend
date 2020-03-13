import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox() {
    return (
        <Autocomplete
            id="combo-box-demo"
            options={persons}
            getOptionLabel={option => option.title}
            style={{ width: "100%" }}
            renderInput={params => <TextField {...params} label="Vinculados" variant="outlined" />}
        />
    );
}

const persons = [
    { title: 'Paolo Blanco Núñez', dni: 117250365 },
    { title: 'Gabriel Solórzano Chanto', dni: 116920331 },
    { title: 'Carlos Gómez Segura', dni: 402430534 },
    { title: 'Luis Cordero Barona', dni: 0 }
];