import { useEffect, useState } from "react";
import { SwitchTransition, TransitionGroup, Transition } from "react-transition-group";
import { gsap } from "gsap";
import { useRouter } from 'next/router'
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { API_URL } from "../../config/urls";
// const TIMEOUT = 2000;
const TIMEOUT = 250;
const gsapDuration = TIMEOUT / 1000;

const Layout = ({ children }) => {
  const router = useRouter()
  const [routeBoolean, setRouteBoolean] = useState(false)
  const [countryFooter, useCountryFooter] = useState([])
  const changeStateRoute = () => {
    router.pathname == '/' ? setRouteBoolean(false) : setRouteBoolean(true)
  }
  useEffect(() => {
    changeStateRoute()

    const HandleApiFooter = async ()  => {
      const dataFetching = await axios.get(
        `${API_URL}/api/country-footers?populate=%2a`
      );
      useCountryFooter(dataFetching.data.data)
    }
    HandleApiFooter()
  },[])
  return (
    <>
      <Navbar absolute={routeBoolean} />
      <SwitchTransition>
        <Transition
          key={router.pathname}
          timeout={TIMEOUT}
          onEnter={(node) => {
            // console.log("==========\nLAYOUT ON ENTER", router.pathname);
            gsap.set(node, { autoAlpha: 0 });
            gsap.to(node, { autoAlpha: 1, duration: gsapDuration * 10 });
            changeStateRoute()
          }}
          onExit={(node) => {
            // console.log("**********\nLAYOUT ON EXIT!!!", router.pathname);
            gsap.to(node, { autoAlpha: 0, duration: gsapDuration });
          }}
        >
          {children}
        </Transition>
      </SwitchTransition>
      <Footer countryFooter={countryFooter} />
    </>
  );
};


export default Layout;
