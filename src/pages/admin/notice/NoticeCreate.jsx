import axios, { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Editor } from "../../../components/admin/index";
import API from "../../../configs/api";
import * as C from "../../../styles/admin/notice/noticeCreate.styles";

const NoticeCreate = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  function handleChange(value) {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  }

  const { mutate: createNotice, isLoading } = useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post(`${API.NOTICE}`, payload, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: localStorage.getItem("token"),
        },
      });
      return data.data;
    },
    onSuccess: () => {
      toast.success("공지사항 생성 성공!");
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

  const onValid = async ({ files, title, contents }) => {
    if (isLoading) return;
    const formData = new FormData();
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }
    formData.append("title", title);
    formData.append("contents", contents);

    createNotice(formData);
  };

  return (
    <C.StyledForm onSubmit={handleSubmit(onValid)}>
      <C.StyledLabel htmlFor="title">제목</C.StyledLabel>
      <C.StyledInput
        {...register("title", { required: true })}
        type="text"
        id="title"
      />
      <C.StyledLabel htmlFor="contents">내용</C.StyledLabel>
      <C.EditorBox>
        <Editor handleChange={handleChange} id="contents" />
      </C.EditorBox>
      <C.StyledLabel htmlFor="files">첨부파일(100MB 이하)</C.StyledLabel>
      <C.StyledInput {...register("files")} type="file" id="files" multiple />
      <C.StyledBtn disabled={isLoading}>등록</C.StyledBtn>
    </C.StyledForm>
  );
};

export default NoticeCreate;
