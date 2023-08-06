import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/header_logo.png";
import { NavItemList } from "../../data/admin-nav-items";

const Container = styled.aside`
  z-index: 30;
  background-color: white;
  width: 250px;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  position: fixed;
  transition: 300ms ease-in-out all;
  transform: ${(props) =>
    !props.isOpen ? "translateX(-100%)" : "translateX(0)"};

  @media screen and (${(props) => props.theme.size.md}) {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
  }
`;

const MenuBtn = styled.svg`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-bottom: 2rem;
  margin-left: 2rem;
`;

const Logo = styled.img`
  cursor: pointer;
  width: 125px;
  margin-bottom: 2rem;
  margin-left: 2rem;
`;

const NavItems = styled.ul`
  width: 100%;
  margin-top: 1.125rem;
  padding: 1rem 0.5rem;
  display: flex;
  font-size: 1rem;
  flex-direction: column;
  gap: 10px;
  @media screen and (${(props) => props.theme.size.sm}) {
    font-size: 0.9rem;
  }
`;

const NavItem = styled.li`
  cursor: pointer;
  width: 100%;
  border-radius: 10px;
  padding: 0.5rem 1.5rem;
  font-family: ${(props) => props.theme.font.kr.medium};
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }
`;

const Sidebar = ({ isOpen, setIsOpen, windowSize }) => {
  const navigate = useNavigate();
  return (
    <Container isOpen={isOpen}>
      {isOpen &&
        (windowSize > 1059 ? (
          <Logo src={logo} onClick={() => navigate("/")} />
        ) : (
          <MenuBtn
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            onClick={() => setIsOpen((curr) => !curr)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </MenuBtn>
        ))}
      <NavItems>
        {NavItemList.map((item) => (
          <NavItem key={item.id} onClick={() => navigate(item.link)}>
            {item.title}
          </NavItem>
        ))}
      </NavItems>
    </Container>
  );
};

export default Sidebar;
