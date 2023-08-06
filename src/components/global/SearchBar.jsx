import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchFormWrap = styled.div`
  width: 29.5%;
  margin-bottom: 5px;
  @media screen and (${(props) => props.theme.size.sm}) {
    width: 50%;
  }
`;

const StyledSearchForm = styled.form`
  position: relative;
  height: 1.875rem;
  display: flex;
  @media screen and (${(props) => props.theme.size.sm}) {
    height: 1.5625rem;
  }
`;

const StyledSearchInput = styled.input`
  -webkit-appearance: none;
  -webkit-border-radius: 0;
  font-family: ${(props) => props.theme.font.kr.regular};
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-right: none;
  padding: 0 10px;
  height: 100%;
  border-radius: 0;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: rgba(0, 0, 0, 0.6);
`;

const StyledSearchBtn = styled.button`
  margin: 0;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.8);
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
  padding: 5px;
  :hover {
    border: 1px solid rgba(0, 0, 0, 0.6);
    background: rgba(0, 0, 0, 0.6);
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;

const SearchBar = ({ isAdmin = false, subject }) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onValid = ({ q }) => {
    isAdmin
      ? navigate(`/admin/${subject}?q=${q.trim()}&page=1`)
      : navigate(`/${subject}?q=${q.trim()}&page=1`);
  };

  return (
    <SearchFormWrap>
      <StyledSearchForm onSubmit={handleSubmit(onValid)}>
        <StyledSearchInput type="text" {...register("q", { required: true })} />
        <StyledSearchBtn>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </StyledSearchBtn>
      </StyledSearchForm>
    </SearchFormWrap>
  );
};

export default SearchBar;
