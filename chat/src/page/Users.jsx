import React, { useState } from "react";
import MyTable from "../utils/MyTable";
import "./Users.sass";

import myFetch from "../utils/myFetch";
import config from "../config";
import MyTableContol from "../utils/MyTableContol";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MyButton from "../utils/MyButton";
import MyTextField from "../utils/MyTextField";
import MySelect from "../utils/MySelect";

const getUsersFetch = () => {
  return myFetch(config.user, "GET");
};

function Users(props) {
  const [users, setUsers] = useState([]);
  const [checking, setChecking] = useState([]);

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [hasError, setHasError] = useState(false);
  const [role, setRole] = useState('');

  const getUsers = () => {
    getUsersFetch().then((res) => {
      console.log(res);
      setUsers(res);
    });
  };

  const clearChecking = () => {
    setChecking([]);
  };

  if (!users.length) {
    getUsers();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalType("");
    setLogin("");
    setPass("");
    setFirstName("");
    setMiddleName("");
    setHasError(false);
    setRole("");
  };

  const clickAdd = () => {
    setModalType("add");
    handleClickOpen();
  };

  const addFetch = () => {
    myFetch(config.user, "POST", { login, pass, firstName, middleName }).then(
      (res) => {
        if (res[0]?._id) {
          console.log(res);
          handleClose();
          getUsers();
        } else {
          console.log(res);
          setHasError(true);
        }
      }
    );
  };

  const clickEdit = () => {
    setModalType("edit");
    setLogin(users[checking[0]].login);
    setPass(users[checking[0]].pass);
    setFirstName(users[checking[0]].firstName);
    setMiddleName(users[checking[0]].middleName);
    setRole(users[checking[0]].role);
    handleClickOpen();
  };

  const editFetch = () => {
    myFetch(config.user, "PUT", {
      id: users[checking[0]]._id,
      new: { login, pass, firstName, middleName, role },
    }).then((res) => {
      if (res.n > 0) {
        console.log(res);
        handleClose();
        getUsers();
      } else {
        console.log(res);
        setHasError(true);
      }
    });
  };

  const clickDelete = () => {
    console.log("clickDelete");
    setModalType("delete");
    handleClickOpen();
  };

  const deleteFetch = () => {
    myFetch(config.user, "DELETE", {
      id: users[checking[0]]._id,
    }).then((res) => {
      if (res.n > 0) {
        console.log(res);
        handleClose();
        clearChecking();
        getUsers();
      } else {
        console.log(res);
      }
    });
  };

  return (
    <div className="users">
      <div className="users-content">
        <div className="users-content-header">
          <MyTableContol
            checking={checking}
            isChecked={true}
            clickAdd={clickAdd}
            isActiveAdd={true}
            clickEdit={clickEdit}
            isActiveEdit={true}
            clickDelete={clickDelete}
            isActiveDelete={true}
          >
            <Dialog
              open={open}
              onClose={handleClose}
              className="tableContol-dialog"
            >
              <DialogTitle>
                {
                  {
                    add: "???????????????????? ????????????????????????",
                    edit: "???????????????????????????? ????????????????????????",
                    delete: "???? ?????????? ???????????? ?????????????? ?????????? ???????????????????????? ?",
                  }[modalType]
                }
              </DialogTitle>

              <DialogContent>
                {modalType !== "delete" && (
                  <div>
                    <MyTextField
                      label={"??????????"}
                      value={login}
                      change={(e) => {
                        setLogin(e.target.value);
                      }}
                      isError={hasError}
                    />
                    <MyTextField
                      label={"????????????"}
                      value={pass}
                      change={(e) => {
                        setPass(e.target.value);
                      }}
                      isError={hasError}
                      errorText={
                        "???????????????????????? ?? ?????????? ?????????????? ?????? ?????????????? ????????????????????"
                      }
                    />
                    <MyTextField
                      label={"??????"}
                      value={firstName}
                      change={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                    <MyTextField
                      label={"????????????????"}
                      value={middleName}
                      change={(e) => {
                        setMiddleName(e.target.value);
                      }}
                    />
                    <MySelect
                      label={"????????"}
                      value={role}
                      valueList= {[{id:'0', title: '??????????????????????????'}, {id:'1', title: '??????????????????'}, {id:'13', title: '????????????????????????'}]}
                      change={(e) => {
                        setRole(e.target.value);
                      }}
                    />
                  </div>
                )}
              </DialogContent>

              <DialogActions>
                {
                  {
                    add: (
                      <>
                        <MyButton click={addFetch}>??????????????</MyButton>
                        <MyButton click={handleClose}>????????????</MyButton>
                      </>
                    ),
                    edit: (
                      <>
                        <MyButton click={editFetch}>??????????????????????????</MyButton>
                        <MyButton click={handleClose}>????????????</MyButton>
                      </>
                    ),
                    delete: (
                      <>
                        <MyButton click={deleteFetch}>??????????????</MyButton>
                        <MyButton click={handleClose}>????????????</MyButton>
                      </>
                    ),
                  }[modalType]
                }
              </DialogActions>
            </Dialog>
          </MyTableContol>
        </div>
        <div className="users-content-table">
          <MyTable
            isChecked={true}
            headersName={["??????????", "????????????", "??????", "????????????????", "????????"]}
            headers={["login", "pass", "firstName", "middleName", "role"]}
            data={users}
            checking={checking}
            setChecking={setChecking}
          ></MyTable>
        </div>
      </div>
    </div>
  );
}

export default Users;
