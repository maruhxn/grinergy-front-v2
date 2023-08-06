import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Editor } from "../../../components/admin/index";
import API from "../../../configs/api";
import * as U from "../../../styles/admin/news/newsCreate.styles";

const NewsUpdate = () => {
  const navigate = useNavigate();
  const { newsId } = useParams();
  const { data: currData } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`${API.NEWS}/${newsId}`);
      return data.data;
    },
    queryKey: [`${API.NEWS}/${newsId}`],
  });

  const [previewImage, setPreviewImage] = useState("");

  const { mutate: updateNews, isLoading } = useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.put(`${API.NEWS}/${newsId}`, payload, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: localStorage.getItem("token"),
        },
      });
      return data.data;
    },
    onSuccess: () => {
      toast.success("뉴스 수정 성공!");
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

  const { register, handleSubmit, setValue, trigger, watch } = useForm({
    mode: "onChange",
  });
  const photo = watch("file");

  function handleChange(value) {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  }

  useEffect(() => {
    if (currData?.title) setValue("title", currData.title);
    if (currData?.url) setValue("url", currData.url);
    if (currData?.contents) setValue("contents", currData.contents);
  }, [currData, setValue]);

  const onValid = async ({ file, title, url, contents }) => {
    if (isLoading) return;
    const formData = new FormData();
    if (file && file.length > 0) {
      formData.append("file", file[0]);
    }
    formData.append("title", title);
    formData.append("url", url);
    formData.append("contents", contents);
    updateNews(formData);
  };

  useEffect(() => {
    const createPreviewImage = async () => {
      if (photo && photo.length > 0) {
        const file = photo[0];
        setPreviewImage(URL.createObjectURL(file));
      }
    };
    createPreviewImage();
  }, [photo]);

  return (
    <U.StyledForm onSubmit={handleSubmit(onValid)}>
      <U.StyledLabel as="span">미리보기 이미지</U.StyledLabel>
      {previewImage ? (
        <U.PreviewImage src={previewImage} alt="previewImage" />
      ) : (
        <>
          <U.PreviewImageSelect htmlFor="file">
            {currData && (
              <U.PreviewImage src={`${currData.image.filePath}`} alt="" />
            )}
          </U.PreviewImageSelect>
        </>
      )}
      <input
        {...register("file")}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        id="file"
      />
      <U.StyledLabel htmlFor="title">제목</U.StyledLabel>
      <U.StyledInput
        {...register("title", { required: true })}
        type="text"
        id="title"
      />
      <U.StyledLabel htmlFor="url">뉴스 URL</U.StyledLabel>
      <U.StyledInput
        {...register("url", { required: true })}
        type="text"
        id="url"
      />
      <U.StyledLabel htmlFor="contents">내용</U.StyledLabel>
      <U.EditorBox>
        <Editor
          value={currData?.contents}
          handleChange={handleChange}
          id="contents"
        />
      </U.EditorBox>
      <U.StyledBtn onClick={handleSubmit(onValid)} disabled={isLoading}>
        수정
      </U.StyledBtn>
    </U.StyledForm>
  );
};

export default NewsUpdate;
