import React from "react";

import MyIcons from "../utils/MyIcons";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import "./MyTableContol.sass";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import MyTextField from "./MyTextField";

export default function MyTableContol(props) {
  return (
    <>
      {props.children}

      <div className="tableContol">
        <div className="tableContol-chacked">
          {props.isChecked && (
            <span>
              {" "}
              {props.checking?.length > 0 &&
                `${props.checking?.length} Выбранно`}
            </span>
          )}
          {props.isSearchable && (
            <div className="tableContol-search">
              <MyTextField
                label="Поиск"
                change={(e) => props.setSearch(e.target.value)}
                value={props.search}
              />
              <MyIcons click={()=>props?.searchClick()}>
                <SearchRoundedIcon />
              </MyIcons>
            </div>
          )}
        </div>
        <div className="tableContol-content">
          <div className="tableContol-content-item">
            <MyIcons disabled={!props.isActiveAdd} click={props.clickAdd}>
              <AddBoxRoundedIcon />
            </MyIcons>
          </div>
          <div className="tableContol-content-item">
            <MyIcons
              click={props.clickEdit}
              disabled={
                !props.isActiveEdit ||
                (props.isActiveEdit &&
                  (props.checking?.length === 0 || props.checking?.length > 1))
              }
            >
              <EditRoundedIcon />
            </MyIcons>
          </div>
          <div className="tableContol-content-item">
            <MyIcons
              click={props.clickDelete}
              disabled={
                !props.isActiveDelete ||
                (props.isActiveDelete &&
                  (props.checking?.length === 0 || props.checking?.length > 1))
              }
            >
              <DeleteRoundedIcon />
            </MyIcons>
          </div>
        </div>
      </div>
    </>
  );
}
