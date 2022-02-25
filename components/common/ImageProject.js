import { API_URL } from '../../config/urls';
const ImageProject = ({ grid, url }) => {

  return (
    <div className={grid}>
        <a>
          <img src={`${API_URL}${url}`} alt="" />
        </a>
    </div>
  )
}

export default ImageProject