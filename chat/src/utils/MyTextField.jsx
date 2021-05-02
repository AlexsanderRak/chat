import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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

export default function MyTextField(props) {
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      error={props.isError}
      onChange={props.change}
      value={props.value}
      helperText={props.isError && props.errorText}
      label={props.label}
      type={props.type ? props.type : 'text'}
    />
  );
}
