import configLanguajeWeb from "../../config/language"
import { useRouter } from "next/router";
import FooterCountry from "../common/FooterCountry";

const Footer = ({ countryFooter }) => {
  const router = useRouter()
  return (
    <footer>
      <div className="container-in">
        <div className="row">
          {
            countryFooter.map(item => <FooterCountry country={item} key={item.id} locale={router.locale}/>)
          }
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