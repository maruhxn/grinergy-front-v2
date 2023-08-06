import React, { useContext, useEffect } from "react";

import human from "../../assets/images/human.jpg";
import greeny from "../../assets/images/ourstory_greeny.png";
import clip from "../../assets/videos/promotionClip.mp4";
import engClip from "../../assets/videos/promotionClipEng.mp4";
import {
  Banner,
  BannerSlider,
  LoadMap,
  Paragraph,
  Phrase,
  VideoClip,
} from "../../components";
import LanguageContext from "../../context/language";
import {
  m_story1,
  m_story2,
  m_story3,
  m_story4,
  m_story5,
  m_story6,
  story1,
  story2,
  story3,
  story4,
  story5,
  story6,
} from "../../data/paragraph-data";
import * as O from "../../styles/client/ourstory.styles";

const OurStory = () => {
  const { isENG } = useContext(LanguageContext);
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Our Story`;
  }, []);

  return (
    <O.Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ height: "100vh", opacity: 0, y: -window.innerHeight / 2 }}
      transition={{ duration: 0.5 }}
    >
      {isENG ? (
        <Phrase>
          {window.matchMedia("(orientation: landscape)").matches ? (
            <>
              Connecting <br />
              humanity
              <br />
              to future energy
            </>
          ) : (
            <>
              Connecting humanity
              <br />
              to future energy
            </>
          )}
        </Phrase>
      ) : (
        <Phrase>
          인간과
          <br />
          미래 에너지를 잇다
        </Phrase>
      )}
      <BannerSlider />

      <Paragraph
        data={
          window.matchMedia("(orientation: landscape)").matches
            ? story1
            : m_story1
        }
      />

      <O.Promotion>
        <VideoClip src={isENG ? engClip : clip} />
      </O.Promotion>
      <O.Wrapper>
        <Paragraph
          noMargin
          isOurstoryNoMargin
          data={
            window.matchMedia("(orientation: landscape)").matches
              ? story2
              : m_story2
          }
        />
        <Paragraph
          noMargin
          isOurstoryNoMargin
          data={
            window.matchMedia("(orientation: landscape)").matches
              ? story3
              : m_story3
          }
        />
        <Paragraph
          noMargin
          isOurstoryNoMargin
          data={
            window.matchMedia("(orientation: landscape)").matches
              ? story4
              : m_story4
          }
        />
      </O.Wrapper>
      <div
        style={{
          marginBottom: window.matchMedia("(orientation: landscape)").matches
            ? "7px"
            : "5px",
          fontSize: 0,
        }}
      >
        <Banner src={human} full />
      </div>
      <O.LoadMapCover>
        <LoadMap />
        <Paragraph
          data={
            window.matchMedia("(orientation: landscape)").matches
              ? story5
              : m_story5
          }
          color={["white", "white"]}
          isOurStoryNoBottom
        />
      </O.LoadMapCover>
      <O.Greeny src={greeny}></O.Greeny>
      <Paragraph
        data={
          window.matchMedia("(orientation: landscape)").matches
            ? story6
            : m_story6
        }
        color={"rgba(0,0,0,0.95)"}
        isOurStoryNoBottom
      />
    </O.Container>
  );
};

export default OurStory;
