import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import InvestorList from "../../data/investors";

const GridTemplate = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 7vh;
  column-gap: 2.8vw;
`;

const Img = styled.img`
  width: 12vw;
  @media screen and (${(props) => props.theme.size.sm}) {
    width: 26vw;
  }
`;

const Investor = styled(motion.li)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 1,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const InvestorGrid = () => {
  return (
    <GridTemplate variants={list} animate={"show"} initial={"hidden"}>
      {InvestorList.map((investor, index) => (
        <Investor key={index} variants={item}>
          <Img src={investor} />
        </Investor>
      ))}
    </GridTemplate>
  );
};

export default InvestorGrid;
