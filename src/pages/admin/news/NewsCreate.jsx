import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Editor } from "../../../components/admin/index";
import API from "../../../configs/api";
import * as C from "../../../styles/admin/news/newsCreate.styles";

const NewsCreate = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const { register, handleSubmit, setValue, trigger, watch } = useForm({
    mode: "onChange",
  });

  const photo = watch("file");

  useEffect(() => {
    const uploadImage = async () => {
      if (photo?.length > 0) {
        const file = photo[0];
        setPreviewImage(URL.createObjectURL(file));
      }
    };
    uploadImage();
  }, [photo]);

  function handleChange(value) {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  }

  const { mutate: createNews, isLoading } = useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post(`${API.NEWS}`, payload, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: localStorage.getItem("token"),
        },
      });
      return data.data;
    },
    onSuccess: () => {
      toast.success("뉴스 생성 성공!");
      return navigate("/admin/news");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.status === 400) return toast.error("올바른 값을 입력해주세요.");
        if (err.status === 401) return toast.error("로그인이 필요합니다.");

        return toast.error("서버 오류입니다. 잠시 후에 다시 시도해주세요.");
      }
    },
  });

  const onValid = async ({ file, title, url, contents }) => {
    if (isLoading) return;
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("title", title);
    formData.append("url", url);
    formData.append("contents", contents);

    createNews(formData);
  };

  return (
    <C.StyledForm onSubmit={handleSubmit(onValid)}>
      <C.StyledLabel as="span">미리보기 이미지 (100MB 이하)</C.StyledLabel>
      {previewImage ? (
        <C.PreviewImage src={previewImage} alt="previewImage" />
      ) : (
        <C.PreviewImageSelect htmlFor="file">
          <svg
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>커버 이미지</span>
        </C.PreviewImageSelect>
      )}
      <input
        {...register("file", { required: true })}
        style={{ display: "none" }}
        type="file"
        multiple={false}
        accept="image/*"
        id="file"
      />
      <C.StyledLabel htmlFor="title">제목</C.StyledLabel>
      <C.StyledInput
        {...register("title", { required: true })}
        type="text"
        id="title"
      />
      <C.StyledLabel htmlFor="url">뉴스 URL</C.StyledLabel>
      <C.StyledInput
        {...register("url", { required: true })}
        type="text"
        id="url"
      />
      <C.StyledLabel htmlFor="contents">내용</C.StyledLabel>
      <C.EditorBox>
        <Editor handleChange={handleChange} id="contents" />
      </C.EditorBox>
      <C.StyledBtn disabled={isLoading}>등록</C.StyledBtn>
    </C.StyledForm>
  );
};

export default NewsCreate;
