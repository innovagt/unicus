import configLanguajeWeb from '../config/language'
import { useRouter } from "next/router"
import Head from "next/head"

const WeAre = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{configLanguajeWeb.navWeAre[`${router.locale}`]} | Unicus </title>
      </Head>
      <section className="weare">
        <div className="weare-one">
          <h1>WE ARE</h1>
          <div className="row">
            <div className="col-md-3">
              <div className="descripton-weare">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nisl gravida, placerat libero
                  sit amet, aliquam felis. Suspendisse tortor massa, rhoncus a sagittis eget, bibendum nec ex.
                  Donec venenatis turpis odio, non aliquet lorem finibus id. Maecenas vitae dignissim enim.
                </p>
              </div>
            </div>
            <div className="col-md-9">
              <img src="https://via.placeholder.com/900x325" alt="" />
                <div className="overlay-bg">
                  <h3>Details</h3>
                </div>
            </div>
          </div>
        </div>


        <div className="weare-two">
          <h1 className="text-right">WE ARE</h1>
          <div className="row">

            <div className="col-md-9">
              <img src="https://via.placeholder.com/900x325" alt="" />
                <div className="overlay-bg">
                  <h3>What make it works </h3>
                </div>
            </div>

            <div className="col-md-3">
              <div className="descripton-weare">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nisl gravida, placerat libero
                  sit amet, aliquam felis. Suspendisse tortor massa, rhoncus a sagittis eget, bibendum nec ex.
                  Donec venenatis turpis odio, non aliquet lorem finibus id. Maecenas vitae dignissim enim.
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="weare-one">
          <h1>WE ARE</h1>
          <div className="row">
            <div className="col-md-3">
              <div className="descripton-weare">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nisl gravida, placerat libero
                  sit amet, aliquam felis. Suspendisse tortor massa, rhoncus a sagittis eget, bibendum nec ex.
                  Donec venenatis turpis odio, non aliquet lorem finibus id. Maecenas vitae dignissim enim.
                </p>
              </div>
            </div>
            <div className="col-md-9">
              <img src="https://via.placeholder.com/900x325" alt="" />
                <div className="overlay-bg">
                  <h3>Creators of  memories</h3>
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default WeAre