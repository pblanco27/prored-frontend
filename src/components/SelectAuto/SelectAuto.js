import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class SelectAuto extends Component {
    render (){
        if (this.props.value === null){
            return (
                <Autocomplete
                    value={null}
                    id={this.props.id}
                    options={this.props.list}
                    getOptionLabel={option => option.title}
                    style={{ width: "100%" }}
                    onChange={this.props.onChange}
                    renderInput={params => <TextField {...params} label={this.props.label} variant="outlined" />}
                />  
            );
        } else {
            return (
                <Autocomplete
                    id={this.props.id}
                    options={this.props.list}
                    getOptionLabel={option => option.title}
                    style={{ width: "100%" }}
                    onChange={this.props.onChange}
                    renderInput={params => <TextField {...params} label={this.props.label} variant="outlined" />}
                />  
            );
        }        
    }    
}