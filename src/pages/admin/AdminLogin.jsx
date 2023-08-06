import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import API from "../../configs/api";
import * as L from "../../styles/admin/login.styles";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  /* accessToken이 있고, 이 값이 유효한지 검증 */
  const { data } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`${API.AUTH}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return data;
    },
    queryKey: [`${API.AUTH}`],
  });

  useEffect(() => {
    data?.ok && navigate("/admin");
  }, [data]);

  /* 로그인되어 있지 않다면, */
  const { mutate: login, isLoading } = useMutation({
    mutationFn: async ({ validationKey }) => {
      const { data } = await axios.post(`${API.AUTH}`, { validationKey });
      return data.data;
    },
    onSuccess: (accessToken) => {
      localStorage.setItem("token", accessToken);
      toast.success("관리자 로그인 성공!");
      navigate("/admin");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.status === 401) return toast.error(err.response.data.msg);
        return toast.error("서버 오류입니다. 잠시 후에 다시 시도해주세요.");
      }
    },
  });

  return (
    <L.Container>
      <L.StyledTitle>Login</L.StyledTitle>
      <L.StyledForm onSubmit={handleSubmit((e) => login(e))}>
        <L.StyledLabel htmlFor="password">Validation Key</L.StyledLabel>
        <L.StyledInput
          {...register("validationKey", { required: true, minLength: 6 })}
          type="password"
          id="validationKey"
        />
        <L.StyledBtn type="submit" disabled={isLoading}>
          <span>LOGIN</span>
        </L.StyledBtn>
      </L.StyledForm>
    </L.Container>
  );
};

export default AdminLogin;
