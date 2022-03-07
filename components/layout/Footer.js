import configLanguajeWeb from "../../config/language"
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (
    <footer>
      <div className="container-in">
        <div className="row">
          <div className="col-md-4">
            <div className="box-pais">
              <div className="pais">
                <span>Honduras</span>
              </div>

              <div>
                <a href="#"><img src="/img/phone.svg" className="icon-f" alt="" /> (504) 2235-6406</a>
              </div>
              <div>
                <a href="#"> <img src="/img/email.svg" className="icon-f" alt="" /> info@unicus.io</a>
              </div>
              <img src="/img/honduras.png" alt="" />
            </div>
          </div>
          <div className="col-md-4">
            <div className="box-pais">
              <div className="pais">
                <span>Guatemala</span>
              </div>

              <div>
                <a href="#"><img src="/img/phone.svg" className="icon-f" alt="" /> (504) 2235-6406</a>
              </div>
              <div>
                <a href="#"> <img src="/img/email.svg" className="icon-f" alt="" /> info@unicus.io</a>
              </div>
              <img src="/img/guatemala.png" alt="" />
            </div>
          </div>
          <div className="col-md-4">
            <div className="box-pais">
              <div className="pais">
                <span>México</span>
              </div>

              <div>
                <a href="#"><img src="/img/phone.svg" className="icon-f" alt="" /> (504) 2235-6406</a>
              </div>
              <div>
                <a href="#"> <img src="/img/email.svg" className="icon-f" alt="" /> info@unicus.io</a>
              </div>
              <img src="/img/mexico.png" alt="" />
            </div>
          </div>
        </div>
        <div className="bottomfooter">
          <p>{configLanguajeWeb.partUnicus[`${router.locale}`]}</p>
          <a href="http://unicus.io/formulario/" className="btnone" target="_blank" rel="noreferrer">{configLanguajeWeb.buttonJoin[`${router.locale}`]}</a>
        </div>
        <div className="end">
          <div className="row">
            <div className="col-md-6">
              <small>{configLanguajeWeb.rightsReserved[`${router.locale}`]}</small>
            </div>
            <div className="col-md-6 text-right">
              <small>{configLanguajeWeb.development[`${router.locale}`]} <a target="_blank" rel="noreferrer" href="https://innovate.gt">Innovate</a> </small>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer