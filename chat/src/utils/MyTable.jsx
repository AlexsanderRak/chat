import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
  root: {
    minWidth: 650,
    background:
      "linear-gradient(-135deg, rgba(255, 255, 255, .5) 60%,  rgba(255, 255, 255, .0))",
    borderRadius: "5px",
    boxShadow:
      "2px 2px 0px 0px rgba(255, 255, 255, .1), 2px 2px 0px 0px rgba(255, 255, 255, .1)",
    "& th": {
      fontFamily: "'Oswald', sans-serif !important",
      color: "rgba(0, 0, 0, 0.8) !important",
      borderColor: "#fff",
    },

    "& td": {
      fontFamily: "'Oswald', sans-serif !important",
      color: "rgba(0, 0, 0, 0.5) !important",
      borderColor: "#fff",
    },
    "& tbody tr": {
      transition: "all 0.3s",
      "&:hover": {
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, .5) 60%,  rgba(255, 255, 255, .0))",
        cursor: 'pointer',
      },
    },
  },
  checkbox: {
    color: "#fff",
    "&.Mui-checked": {
      color: "#fff !important",
    },
  },
});

export default function MyTable(props) {
  const classes = useStyles();

  const isChecked = (index) => {
    return !!(props.checking.findIndex((el) => el == index) + 1);
  };

  const checking = (index) => {
    const newArray = [...props.checking];

    if (!props.checking.length) {

      newArray.push(index);

    } else {

      let ind = props.checking.findIndex((el) => el == index);

      if (ind + 1) {
        newArray.splice(ind, 1);
      } else {
        newArray.push(index);
      }

    }

    props.setChecking(newArray);
  };

  const checkingAll = () => {
    let newArray = [...props.checking];
    if (props.data.length === props.checking.length ) {
      newArray = [];
    } else {
      newArray = [];
      props.data.forEach((element, index) => {
        newArray.push(index);
      });
    }
    props.setChecking(newArray);
  };

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table size="small" aria-label="a dense table">

        {/* TableHead  */}
        <TableHead>
          <TableRow>
            {props.isChecked && (
              <TableCell padding="checkbox">
                <Checkbox
                  className={classes.checkbox}
                  onChange={checkingAll}
                  indeterminate={props.checking.length > 0 && props.checking.length < props.data.length}
                  checked={props.data.length > 0 && props.data.length === props.checking.length}
                />
              </TableCell>
            )}
            {props.headers.map((el, index) => (
              <TableCell key={index}>{props.headersName[index]}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* TableBody  */}
        <TableBody>
          {props.data.map((row, index) => (
            <TableRow key={index} onClick={() => checking(index)}>
              {props.isChecked && (
                <TableCell padding="checkbox">
                  <Checkbox
                    className={classes.checkbox}
                    checked={isChecked(index)}
                  />
                </TableCell>
              )}
              {props.headers.map((el, index) => (
                <TableCell key={index}>{row[el]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
