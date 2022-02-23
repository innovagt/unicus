import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";



const Layout = ({ children, nav = true, title="Unicus" }) => {
  return (
    <>
      <Head>
       <title>{title}</title>
      </Head>
      <Navbar absolute={nav} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
