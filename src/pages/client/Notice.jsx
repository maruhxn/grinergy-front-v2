import moment from "moment";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pagination, SearchBar } from "../../components/index";
import API from "../../configs/api";
import { calcTotalPage } from "../../libs/uilts";
import * as N from "../../styles/client/notice.styles";

const Notice = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [noticeResult, setNoticeResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const q = searchParams.get("q");
  const page = searchParams.get("page");
  const url = q
    ? `${API.SEARCH_NOTICE}?page=${currentPage}&q=${q}`
    : `${API.NOTICE}?page=${currentPage}`;

  const query = useQuery({
    queryFn: async () => {
      const queryResult = await (await axios.get(url)).data;
      setNoticeResult(queryResult.data);
      return queryResult.data;
    },
    queryKey: [url],
  });

  const totalPage = calcTotalPage(noticeResult, "notice");

  // useEffect(() => {
  //   if (!page) return navigate("/notice");
  //   // page 일치
  //   if (currentPage !== page.toString()) {
  //     navigate(`/notice?page=${currentPage}`);
  //   }
  // }, []);

  return (
    <N.Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -window.innerHeight / 2 }}
      transition={{ duration: 0.5 }}
    >
      <N.StyledTitle>Notice</N.StyledTitle>
      <N.FlexBox>
        <N.StyledSpan>
          전체 {noticeResult ? noticeResult.total : 0}건 | {currentPage} 페이지
        </N.StyledSpan>
        <SearchBar subject="notice" />
      </N.FlexBox>
      <N.Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {noticeResult &&
            noticeResult?.notices?.map((notice, i) => (
              <tr
                key={notice._id}
                onClick={() => navigate(`/notice/${notice._id}`)}
              >
                <td>{i + 1}</td>
                <td>{notice.title}</td>
                <td>{moment(notice.createdAt).format("YYYY-MM-DD")}</td>
              </tr>
            ))}
        </tbody>
      </N.Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={setCurrentPage}
      />
    </N.Container>
  );
};

export default Notice;
