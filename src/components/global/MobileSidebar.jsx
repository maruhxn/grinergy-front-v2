import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import close from "../../assets/images/close.png";
import { headerMenuList } from "../../data/header-menus";

const SidebarItems = styled.ul`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  gap: 25px;
  background-color: #fff;
  overflow-y: scroll;
  font-size: 40px;
  font-family: ${(props) => props.theme.font.eng.condensed};
  @media screen and (${(props) => props.theme.size.xs}) {
    font-size: 30px;
    gap: 15px;
  }
`;

const Item = styled.li`
  width: 100%;
  text-align: center;
  letter-spacing: -0.018em;
  color: ${(props) => (props.isMatch ? "rgba(0,0,0,0.5)" : "#000")};
  font-size: ${(props) => props.isSub && "33px"};
  @media screen and (${(props) => props.theme.size.xs}) {
    font-size: ${(props) => props.isSub && "23px"};
  }
`;

const ToggleBtn = styled.img`
  position: absolute;
  top: 18px;
  right: 23px;
  width: 23px;
`;

const MobileSidebar = ({ setIsOpen, isSubVisible, setIsSubVisible }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <SidebarItems>
      {headerMenuList.map((menuItem, idx) =>
        menuItem.title.toLowerCase() === "our story" ||
        menuItem.title.toLowerCase() === "history" ? (
          isSubVisible && (
            <Item
              isSub
              isMatch={pathname === menuItem.link}
              key={idx}
              onClick={() => navigate(menuItem.link)}
            >
              {menuItem.title}
            </Item>
          )
        ) : menuItem.title.toLowerCase() === "about" ? (
          <Item
            key={idx}
            isMatch={pathname === menuItem.link}
            onClick={() => setIsSubVisible(!isSubVisible)}
          >
            {menuItem.title}
          </Item>
        ) : (
          <Item
            key={idx}
            isMatch={pathname === menuItem.link}
            onClick={() => navigate(menuItem.link)}
          >
            {menuItem.title}
          </Item>
        )
      )}
      <ToggleBtn
        src={close}
        alt="close-button"
        onClick={() => setIsOpen(false)}
      />
    </SidebarItems>
  );
};

export default MobileSidebar;
