import { AnimatePresence } from "framer-motion";
import React from "react";
import { useLocation } from "react-router";
import { Route, Routes } from "react-router-dom";
import { Continue, NotFound, NoticeDetail } from "./pages/client";

import clientRoutes from "./data/client.routes";
import {
  AdminLayout,
  NewsCreate,
  NewsIndex,
  NewsUpdate,
  NoticeCreate,
  NoticeIndex,
  NoticeUpdate,
} from "./pages/admin";
import AdminLogin from "./pages/admin/AdminLogin";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/* user */}
        {clientRoutes.map((route, idx) => (
          <Route key={idx} exact path={route.link} element={route.element} />
        ))}
        <Route exact path="/continue" element={<Continue />} />

        {/* admin */}
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/admin" element={<AdminLayout />}>
          <Route exact index element={<NoticeIndex />} />
          <Route exact path="notice" element={<NoticeIndex />} />
          <Route exact path="notice/:noticeId" element={<NoticeDetail />} />
          <Route exact path="createNotice" element={<NoticeCreate />} />
          <Route
            exact
            path="notice/:noticeId/update"
            element={<NoticeUpdate />}
          />
          <Route exact path="news" element={<NewsIndex />} />
          <Route exact path="createNews" element={<NewsCreate />} />
          <Route exact path="news/:newsId/update" element={<NewsUpdate />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
