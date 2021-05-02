import React, { useState } from "react";
import "./KnowledgeBase.sass";

import myFetch from "../utils/myFetch";
import config from "../config";
import MyTableContol from "../utils/MyTableContol";
import MyTable from "../utils/MyTable";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MyButton from "../utils/MyButton";
import MyTextField from "../utils/MyTextField";

const getDecisionFetch = () => {
  return myFetch(config.decision, "GET");
};

const getDecisionSearchFetch = (data) => {
  return myFetch(config.decisionSearch, "POST", data);
};

function KnowledgeBase(props) {
  const [decision, setDecision] = useState([]);

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hasError, setHasError] = useState(false);
  const [search, setSearch] = useState("");
  const username = JSON.parse(localStorage.getItem("user"));

  const getDecision = () => {
    getDecisionFetch().then((res) => {
      console.log(res);
      setDecision(res);
    });
  };

  const getDecisionSearch = () => {
    getDecisionSearchFetch({search}).then((res) => {
      console.log(res);
      setDecision(res);
    });
  };

  if (!decision.length) {
    getDecision();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalType("");
    setName("");
    setDescription("");
    setHasError(false);
  };

  const clickAdd = () => {
    setModalType("add");
    handleClickOpen();
  };

  const addFetch = () => {
    myFetch(config.decision, "POST", { 
      name, 
      description, 
      creator: `${username.firstName} ${username.middleName}`, 
      creatorId: username._id, 
      dateCreate: new Date().toUTCString() 
    }).then(
      (res) => {
        if (res[0]?._id) {
          console.log(res);
          handleClose();
          getDecision();
        } else {
          console.log(res);
          setHasError(true);
        }
      }
    );
  };

  return (
    <div className="knowledgeBase">
      <div className="knowledgeBase-content">
        <div className="knowledgeBase-content-header">
          <MyTableContol
            isSearchable={true}
            isChecked={false}
            search={search}
            setSearch={setSearch}
            searchClick={getDecisionSearch}
            clickAdd={clickAdd}
            isActiveAdd={true}
          >
            <Dialog
              open={open}
              onClose={handleClose}
              className="tableContol-dialog"
            >
              <DialogTitle>
                {
                  {
                    add: "Добавление решения",
                  }[modalType]
                }
              </DialogTitle>

              <DialogContent>
               
                  <div>
                    <MyTextField
                      label={"Название"}
                      value={name}
                      change={(e) => {
                        setName(e.target.value);
                        setHasError(false);
                      }}
                      isError={hasError}
                      errorText={
                        "Решение с таким название уже существует"
                      }
                    />
                    <MyTextField
                      label={"Описание"}
                      value={description}
                      change={(e) => {
                        setDescription(e.target.value);
                        setHasError(false);
                      }}
                    />
                  </div>
              </DialogContent>

              <DialogActions>
                {
                  {
                    add: (
                      <>
                        <MyButton click={addFetch}>Создать</MyButton>
                        <MyButton click={handleClose}>Отмена</MyButton>
                      </>
                    ),
                  }[modalType]
                }
              </DialogActions>
            </Dialog>
          </MyTableContol>
        </div>
        <div className="knowledgeBase-content-table">
          <MyTable
            isChecked={false}
            headersName={["Наименование", "Описание", "Создатель", "Дата"]}
            headers={["name", "description", "creator", "dateCreate"]}
            data={decision}
          ></MyTable>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeBase;
