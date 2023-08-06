import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BreadcrumbContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  height: 3rem;
  background-color: white;
  font-size: 1.125rem;
  line-height: 1.75rem;
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${(props) => props.theme.font.eng.bold};
  @media screen and (${(props) => props.theme.size.sm}) {
    padding: 0 1.5rem;
  }
`;

const MenuBtn = styled.svg`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const Logout = styled.span`
  cursor: pointer;
  font-size: 1rem;
  font-family: ${(props) => props.theme.font.eng.condensed};
`;

const Breadcrumb = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("token");
    toast.success("로그아웃");
    navigate("/admin/login");
  };

  return (
    <BreadcrumbContainer>
      {!isOpen ? (
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </MenuBtn>
      ) : (
        <div></div>
      )}
      <Logout onClick={onClick}>Logout</Logout>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
