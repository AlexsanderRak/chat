import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: 15,
    '&:hover': {
        "& .MuiInput-underline:before": {
            borderBottomColor: "#56ACE0",
        }
    },
    '& label': {
        color: '#fff'
    },
    '& div': {
      color: '#fff'
    },
    '& svg': {
      color: '#fff'
    },
    "& input": {
        color: '#fff'
    },
    "& label.Mui-focused": {
        color: "#fff",
    },
    "& .MuiInput-underline:before": {
        borderBottomColor: "#fff",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#fff",
    },
    
  },
}));

export default function MySelect(props) {
  const classes = useStyles();

  return (
    <FormControl className={classes.root} disabled={props.isDisabled} error={props.isError}>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          onChange={props.change}
        >
          {props.valueList.map((el, index) =>
          <MenuItem key={index} value={el}>{el}</MenuItem>
          )}
        </Select>
        { props.isError && 
          <FormHelperText>{props.errorText}</FormHelperText>
        }
       
      </FormControl>
  );
}
