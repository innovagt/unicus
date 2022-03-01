import { useEffect, useState } from "react";
import { SwitchTransition, TransitionGroup, Transition } from "react-transition-group";
import { gsap } from "gsap";
import { useRouter } from 'next/router'
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

// const TIMEOUT = 2000;
const TIMEOUT = 250;
const gsapDuration = TIMEOUT / 1000;

const Layout = ({ children }) => {
  const router = useRouter()
  const [routeBoolean, setRouteBoolean] = useState(false)
  const changeStateRoute = () => {
    router.pathname == '/' ? setRouteBoolean(false) : setRouteBoolean(true)
  }
  useEffect(() => {
    changeStateRoute()
  },[])
  return (
    <>
      <Navbar absolute={routeBoolean} />
      <SwitchTransition>
        <Transition
          key={router.pathname}
          timeout={TIMEOUT}
          onEnter={(node) => {
            console.log("==========\nLAYOUT ON ENTER", router.pathname);
            gsap.set(node, { autoAlpha: 0 });
            gsap.to(node, { autoAlpha: 1, duration: gsapDuration * 10 });
            changeStateRoute()
          }}
          onExit={(node) => {
            console.log("**********\nLAYOUT ON EXIT!!!", router.pathname);
            gsap.to(node, { autoAlpha: 0, duration: gsapDuration });
          }}
        >
          {children}
        </Transition>
      </SwitchTransition>
      <Footer />
    </>
  );
};

export default Layout;
