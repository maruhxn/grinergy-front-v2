import axios, { AxiosError } from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Pagination, SearchBar } from "../../../components/index";
import API from "../../../configs/api";
import { calcTotalPage } from "../../../libs/uilts";
import * as I from "../../../styles/admin/news/newsIndex.styles";

const NewsIndex = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [newsResult, setNewsResult] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const q = searchParams.get("q");
  const page = searchParams.get("page");
  const url = q
    ? `${API.SEARCH_NEWS}?page=${currentPage}&q=${q}`
    : `${API.NEWS}?page=${currentPage}`;

  const { refetch } = useQuery({
    queryFn: async () => {
      const queryResult = await (await axios.get(url)).data;
      setNewsResult(queryResult.data);
      return queryResult.data;
    },
    queryKey: [url],
  });

  const totalPage = calcTotalPage(newsResult, "news");
  // useEffect(() => {
  //   if (!page) return navigate("/admin/news");

  //   if (currentPage !== page.toString()) {
  //     navigate(`/admin/news?page=${currentPage}`);
  //   }
  // }, []);

  const { mutate: deleteNews } = useMutation({
    mutationFn: async (newsId) => {
      const { data } = await axios.delete(`${API.NEWS}/${newsId}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      return data;
    },
    onSuccess: () => {
      toast.success("뉴스 삭제 성공!");
      refetch();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.status === 404) return toast.error("뉴스 정보가 없습니다.");
        if (err.status === 401) return toast.error("로그인이 필요합니다.");

        return toast.error("서버 오류입니다. 잠시 후에 다시 시도해주세요.");
      }
    },
  });

  return (
    <I.Container>
      <I.FlexBox>
        <I.StyledSpan>
          전체 {newsResult && newsResult.total}건 | {currentPage} 페이지
        </I.StyledSpan>
        <SearchBar isAdmin subject="news" />
      </I.FlexBox>
      <I.Table>
        <colgroup>
          <col style={{ width: "40%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>제목</th>
            <th>내용</th>
            <th>작성일</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {newsResult &&
            newsResult.news?.map((news) => {
              const contentsText = news.contents.replace(/<[^>]*>?/g, "");
              return (
                <tr key={news._id}>
                  <td>
                    <a href={news.url} target="_blank" rel="noreferrer">
                      {news.title.length > 20
                        ? news.title.substring(0, 20) + "..."
                        : news.title}
                    </a>
                  </td>
                  <td>
                    <a href={news.url} target="_blank" rel="noreferrer">
                      {contentsText.length > 30
                        ? contentsText.substring(0, 30) + "..."
                        : contentsText}
                    </a>
                  </td>
                  <td>{moment(news.createdAt).format("YYYY-MM-DD")}</td>
                  <td
                    onClick={() => navigate(`/admin/news/${news._id}/update`)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </td>
                  <td onClick={() => deleteNews(news._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </I.Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={setCurrentPage}
      />
    </I.Container>
  );
};

export default NewsIndex;
