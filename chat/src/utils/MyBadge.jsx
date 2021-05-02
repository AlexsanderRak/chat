import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles({
  root: {
    color: "#fff",
    height: 24,
    padding: "0 15px",
    '& .MuiBadge-badge': {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
  },
  
});

export default function MyBadge(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge badgeContent={props.messages} showZero>
        <MailIcon />
      </Badge>
    </div>
  );
}
