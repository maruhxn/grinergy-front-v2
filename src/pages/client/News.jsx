import DOMPurify from "dompurify";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pagination, SearchBar } from "../../components/index";
import API from "../../configs/api";
import { calcTotalPage } from "../../libs/uilts";
import * as N from "../../styles/client/news.styles";

const News = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [newsResult, setNewsResult] = useState(null);
  const q = searchParams.get("q");
  const page = searchParams.get("page");
  const url = q
    ? `${API.SEARCH_NEWS}?page=${currentPage}&q=${q}`
    : `${API.NEWS}?page=${currentPage}`;

  const query = useQuery({
    queryFn: async () => {
      const queryResult = await (await axios.get(url)).data;
      setNewsResult(queryResult.data);
      return queryResult.data;
    },
    queryKey: [url],
  });

  const totalPage = calcTotalPage(newsResult, "news");

  // useEffect(() => {
  //   if (!page) return navigate("/news");

  //   if (currentPage !== page.toString()) {
  //     navigate(`/news?page=${currentPage}`);
  //   }
  // }, []);

  return (
    <N.Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -window.innerHeight / 2 }}
      transition={{ duration: 0.5 }}
    >
      <N.StyledTitle>
        Innovation for tomorrow,
        <br />
        changes for next generation
      </N.StyledTitle>
      <N.MobileStyledTitle>
        Innovation,
        <br />
        for next generation
      </N.MobileStyledTitle>
      <N.FlexBox>
        <N.StyledSpan>
          전체 {newsResult ? newsResult.total : 0}건 | {currentPage} 페이지
        </N.StyledSpan>
        <SearchBar subject="news" />
      </N.FlexBox>
      <N.NewsGrid>
        {newsResult &&
          newsResult.news?.map((news) => (
            <a key={news._id} href={news.url} target="_blank" rel="noreferrer">
              <N.NewsCard>
                <img src={`${news?.image.filePath}`} alt={news.title} />
                <N.NewsTitle>{news.title}</N.NewsTitle>
                <N.NewsDescription
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(news.contents.slice(0, 150)),
                  }}
                />
              </N.NewsCard>
            </a>
          ))}
      </N.NewsGrid>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={setCurrentPage}
      />
    </N.Container>
  );
};

export default News;
