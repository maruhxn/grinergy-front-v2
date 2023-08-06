import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Editor } from "../../../components/admin/index";
import API from "../../../configs/api";
import * as U from "../../../styles/admin/notice/noticeCreate.styles";

const NoticeUpdate = () => {
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  const { data: currData } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`${API.NOTICE}/${noticeId}`);
      return data.data;
    },
    queryKey: [`${API.NOTICE}/${noticeId}`],
  });

  const { mutate: updateNotice, isLoading } = useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.put(`${API.NOTICE}/${noticeId}`, payload, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: localStorage.getItem("token"),
        },
      });
      return data.data;
    },
    onSuccess: () => {
      toast.success("공지사항 수정 성공!");
      return navigate("/admin/notice");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.status === 400) return toast.error("올바른 값을 입력해주세요.");
        if (err.status === 401) return toast.error("로그인이 필요합니다.");

        return toast.error("서버 오류입니다. 잠시 후에 다시 시도해주세요.");
      }
    },
  });

  function handleChange(value) {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  }

  useEffect(() => {
    if (currData?.title) setValue("title", currData.title);
    if (currData?.contents) setValue("contents", currData.contents);
  }, [currData, setValue]);

  const onValid = async ({ files, title, contents, deletedFiles }) => {
    if (isLoading) return;
    const formData = new FormData();
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }
    if (deletedFiles && deletedFiles.length > 0) {
      let dfs = [];
      Array.isArray(deletedFiles)
        ? (dfs = deletedFiles)
        : dfs.push(deletedFiles);
      dfs.forEach((deletedFile) => {
        formData.append("deletedFiles", deletedFile);
      });
    }
    formData.append("title", title);
    formData.append("contents", contents);

    updateNotice(formData);
  };

  return (
    <U.StyledForm onSubmit={handleSubmit(onValid)}>
      <U.StyledLabel htmlFor="title">제목</U.StyledLabel>
      <U.StyledInput
        {...register("title", { required: true })}
        type="text"
        id="title"
      />
      <U.StyledLabel htmlFor="contents">내용</U.StyledLabel>
      <U.EditorBox>
        <Editor
          value={currData && currData.contents}
          handleChange={handleChange}
          id="contents"
        />
      </U.EditorBox>
      <U.StyledLabel htmlFor="files">첨부파일</U.StyledLabel>
      <U.StyledInput {...register("files")} type="file" id="files" multiple />
      {currData && currData.files.length > 0 && (
        <U.FileList>
          {currData.files.map((file) => (
            <li key={file._id}>
              <span>
                {file.fileName.length > 20
                  ? file.fileName.substring(0, 10) +
                    "..." +
                    file.fileName.substring(file.fileName.length - 10)
                  : file.fileName}
              </span>
              <div>
                <input
                  id={file._id}
                  {...register("deletedFiles")}
                  type="checkbox"
                  value={file.filePath}
                />
                <label htmlFor={file._id}>삭제</label>
              </div>
            </li>
          ))}
        </U.FileList>
      )}
      <U.StyledBtn disabled={isLoading}>수정</U.StyledBtn>
    </U.StyledForm>
  );
};

export default NoticeUpdate;
