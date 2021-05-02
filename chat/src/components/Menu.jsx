import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.sass";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import MyIcons from "../utils/MyIcons";

function Menu(props) {
  const [isOpen, setIsOpen] = useState(true);

  const linkArray = [
    { url: "/users", guard: ["0"], title: GroupRoundedIcon },
    { url: "/chats", guard: ["0", "1"], title: ForumRoundedIcon },
    { url: "/knowledgeBase", guard: ["0", "1"], title: MenuBookRoundedIcon },
  ];

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("clientName");
    localStorage.removeItem("activeRoomName");
  };

  return (
    <>
      {user?._id && (
        <div className={"menu " + (isOpen ? "menu-open" : "menu-close")}>
          <div className="menu-content">
            <div className="menu-content-links">
              {linkArray.map((el, index) => (
                <>
                  {(el.guard.findIndex((item) => item === user.role) + 1) ? 
                    <Link key={index} to={el.url}>
                      <MyIcons>{React.createElement(el.title)}</MyIcons>
                    </Link>
                  :
                  ''
                }
                </>
              ))}
            </div>

            <div className="menu-content-collapse">
              <Link to="/" onClick={logout}>
                <MyIcons>
                  <ExitToAppRoundedIcon />
                </MyIcons>
              </Link>
              <MyIcons click={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <ArrowBackRoundedIcon />
                ) : (
                  <ArrowForwardRoundedIcon />
                )}
              </MyIcons>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
