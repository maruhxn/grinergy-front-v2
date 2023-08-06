import { lazy } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { Footer, Header, MetaTag, ScrollToTop } from "./components";

const AnimatedRoutes = lazy(() => import("./AnimatedRoutes"));

const Wrapper = styled.div`
  overflow: hidden;
  min-height: 100vh;
  height: 100%;
  position: relative;
`;

function App() {
  return (
    <BrowserRouter>
      <MetaTag />
      <ScrollToTop />
      <Wrapper>
        <Header />
        <AnimatedRoutes />
        <Footer />
      </Wrapper>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
