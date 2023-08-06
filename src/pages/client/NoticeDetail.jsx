import DOMPurify from "dompurify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API from "../../configs/api";
import * as N from "../../styles/client/noticeDetail.styles";

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [fileData, setFileData] = useState([]);

  const { data: getNoticeDetail, error } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`${API.NOTICE}/${noticeId}`);
      return data.data;
    },
    queryKey: [`${noticeId}`],
    retry: 1,
  });

  useEffect(() => {
    if (getNoticeDetail) setFileData(getNoticeDetail.files);
  }, [getNoticeDetail]);

  useEffect(() => {
    if (error) {
      const status = error.response.status;
      if (status === 404 || status === 422) {
        alert(error.response.data.msg);
        navigate("/notice");
      }
    }
  }, [error, navigate]);

  const downloadFile = async (filePath, fileName) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <N.Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -window.innerHeight / 2 }}
    >
      <N.StyledTitle>notice</N.StyledTitle>
      {getNoticeDetail && (
        <N.PostDetailContainer>
          <N.SmallContainer>
            <N.PostTitle>{getNoticeDetail.title}</N.PostTitle>
            <N.PostDate>
              {moment(getNoticeDetail.createdAt).format("YYYY-MM-DD")}
            </N.PostDate>
          </N.SmallContainer>
          <div className="ql-snow">
            {typeof window !== "undefined" && (
              <N.PostContent
                className="ql-editor"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(getNoticeDetail.contents),
                }}
              />
            )}
          </div>
          <N.AttachmentData>
            <N.AttachmentTitle>첨부파일</N.AttachmentTitle>
            {fileData && fileData.length > 0 ? (
              <N.FileList>
                {fileData.map((file, i) => (
                  <li key={i}>
                    <span
                      onClick={() => downloadFile(file.filePath, file.fileName)}
                    >
                      {file.fileName.length > 20
                        ? file.fileName.substring(0, 10) +
                          "..." +
                          file.fileName.substring(file.fileName.length - 10)
                        : file.fileName}
                    </span>
                  </li>
                ))}
              </N.FileList>
            ) : (
              "첨부파일 없음"
            )}
          </N.AttachmentData>
          <N.NavigateBtn onClick={() => navigate("/notice")}>
            목록
          </N.NavigateBtn>
        </N.PostDetailContainer>
      )}
    </N.Container>
  );
};

export default NoticeDetail;
