import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: '#fff',
    height: 24,
    padding: '0 15px',
  },
});

export default function MyIcons(props) {
  const classes = useStyles();
  return <IconButton onClick={props.click} disabled={props.disabled} className={classes.root}>{props.children}</IconButton>;
}