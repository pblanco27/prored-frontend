import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class SelectAuto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };
        this.onTagsChange = this.onTagsChange.bind(this);
    }

    onTagsChange = (event, values) => {
        this.setState({
            tags: values
        }, () => {
            // This will output an array of objects
            // given by Autocompelte options property.
            console.log(this.state.tags);
        });
    }

    render (){
        return (
            <Autocomplete
                id="combo-box-demo"
                options={this.props.list}
                getOptionLabel={option => option.title}
                style={{ width: "100%" }}
                onChange={this.onTagsChange}
                renderInput={params => <TextField {...params} label={this.props.label} variant="outlined" />}
            />
        );
    }    
}