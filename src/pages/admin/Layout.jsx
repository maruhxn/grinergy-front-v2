import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Breadcrumb, Sidebar } from "../../components/admin/index";
import API from "../../configs/api";
import useWindowSize from "../../hooks/useWindowSize";
import * as L from "../../styles/admin/layout.styles";

const AdminLayout = () => {
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

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
    !data?.ok && navigate("/admin/login");
  }, [data]);

  useEffect(() => {
    if (isOpen) {
      return setIsOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (windowSize > 1059) {
      setIsOpen(true);
    }
  }, [isOpen, windowSize]);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Grinergy | Admin`;
  }, []);

  return (
    <L.Background isOpen={isOpen} windowSize={windowSize}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} windowSize={windowSize} />
      {isOpen && windowSize < 1059 && (
        <L.Overlay onClick={() => setIsOpen(false)} />
      )}
      <L.Wrapper>
        <Breadcrumb isOpen={isOpen} setIsOpen={setIsOpen} />
        <Outlet />
      </L.Wrapper>
    </L.Background>
  );
};

export default AdminLayout;
