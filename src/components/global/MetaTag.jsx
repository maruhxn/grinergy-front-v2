import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import clientRoutes from "../../data/client.routes";
const MetaTag = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const { pathname } = useLocation();
  useEffect(() => {
    clientRoutes.map((route) => {
      if (pathname.includes(route.link) && route.link !== "/") {
        setLink(route.link);
        setTitle(`${route.title} | GRINERGY`);
      }
    });
    if (pathname === "/") {
      setTitle("GRINERGY");
    }
  }, [pathname]);
  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <link rel="canonical" href={`https://www.grinergy.tech${link}`} />

      <title>{title}</title>
    </Helmet>
  );
};

export default MetaTag;
