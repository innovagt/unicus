import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";



const Layout = ({ children, nav = true }) => {
  return (
    <>
      <Head>
       <title>Unicus</title>
      </Head>
      <Navbar absolute={nav} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
