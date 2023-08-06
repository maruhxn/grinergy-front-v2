import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import batteryImg from "../../assets/images/product_battery.jpg";
import leftImg from "../../assets/images/product_leftimg.jpg";
import rightImg from "../../assets/images/product_rightimg.jpg";

const ProductImg = styled(motion.img)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: filter;
`;

const CircleInfo = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 19.27vw;
  aspect-ratio: 1/1;
  border: 1px solid #fff;
  font-family: ${(props) => props.theme.font.eng.condensed};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #fff;
  h1 {
    text-align: center;
    font-size: 1.8229vw;
    line-height: 2.1875vw;
    letter-spacing: -0.005em;
    position: relative;
    top: 4%;
  }
  @media screen and (${(props) => props.theme.size.sm}) {
    top: 48%;
    width: 21vw;
    h1 {
      font-size: 9pt;
      line-height: 10pt;
      letter-spacing: 0.05em;
    }
  }
  @media screen and (${(props) => props.theme.size.xs}) {
    width: 24vw;
    h1 {
      font-size: 10px;
      line-height: 9pt;
      letter-spacing: 0.05em;
    }
  }
`;

const ImgWrapper = styled.div`
  margin-top: 7px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 7px;
  @media screen and (${(props) => props.theme.size.sm}) {
    margin-top: 5px;
    column-gap: 5px;
  }
`;

const SmallImg = styled(motion.img)`
  width: 100%;
  aspect-ratio: 478/458;
  object-fit: cover;
`;

const ProductBigImg = () => {
  return (
    <>
      <motion.div style={{ position: "relative" }}>
        <ProductImg src={batteryImg} loading="lazy" />
        <CircleInfo
          animate={{
            opacity: [1, 0, 1, 1, 1, 1],
            transition: { duration: 3, repeat: Infinity },
          }}
          initial={{ opacity: 1 }}
        >
          <h1>
            POTERE
            <br />
            S2 Battery
            <br />
            LTO
          </h1>
        </CircleInfo>
      </motion.div>
      <ImgWrapper>
        <SmallImg loading="lazy" src={leftImg}></SmallImg>
        <SmallImg loading="lazy" src={rightImg}></SmallImg>
      </ImgWrapper>
    </>
  );
};

export default ProductBigImg;
