import Link from "next/link";
import Script from "next/script";
import "animate.css";
import configLanguajeWeb from "../../config/language";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";

const Navbar = ({ absolute = false }) => {
  const router = useRouter();
  return (
    <>
      <header
        style={
          absolute
            ? {
                position: "sticky",
                background: "rgb(0,133,121)",
                background:
                  "linear-gradient(114deg, rgba(0,133,121,1) 0%, rgba(29,108,135,1) 50%, rgba(54,91,151,1) 100%)",
              }
            : {}
        }
        className="animate__animated animate__fadeInUp"
      >
        <Script src="/js/jquery.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.js" strategy="beforeInteractive" />
        <Script src="/js/wow.min.js" strategy="beforeInteractive" />
        <Script src="/js/smoothscroll.js" strategy="beforeInteractive" />
        <Script src="/js/custom.js" strategy="beforeInteractive" />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r76/three.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82015/Projector.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/82015/CanvasRenderer.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/stats.js/r14/Stats.min.js"
          strategy="beforeInteractive"
        />
        <Script src="/js/Particles.js" strategy="beforeInteractive" />
        <div className="menu-logo">
          <div className="row">
            <div className="col-md-3 text-center animate__animated animate__fadeInUp">
              <Link href="/">
                <a>
                  <img src="/img/logo.svg" alt="" />
                </a>
              </Link>
            </div>
            <div className="col-md-6">
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <button
                      type="button"
                      className="navbar-toggle collapsed"
                      data-toggle="collapse"
                      data-target="#bs-example-navbar-collapse-1"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                  <div
                    className="collapse navbar-collapse nav-in18"
                    id="bs-example-navbar-collapse-1"
                  >
                    <ul className="nav navbar-nav">
                      <li className="animate__animated animate__fadeInUp">
                        <Link href="/">
                          <a>
                            {configLanguajeWeb.navHome[`${router.locale}`]}{" "}
                            <span className="sr-only">(current)</span>
                          </a>
                        </Link>
                      </li>
                      <li className="animate__animated animate__fadeInUp">
                        <Link href="/projects">
                          <a>
                            {configLanguajeWeb.navProjects[`${router.locale}`]}
                          </a>
                        </Link>
                      </li>
                      <li className="animate__animated animate__fadeInUp">
                        <Link href="/weare">
                          <a>
                            {configLanguajeWeb.navWeAre[`${router.locale}`]}
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div className="col-md-3 in18-content">
              {router.locales.map((locale) => {
                return router.locale != locale ? (
                  <Link href={router.asPath} locale={locale} key={locale}>
                    <a
                      className="animate__animated animate__fadeIn in18"
                      key={locale}
                    >
                      {locale}
                    </a>
                  </Link>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
