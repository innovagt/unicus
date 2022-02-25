import Link from "next/link"
import { API_URL } from "../../config/urls"
const Project = ({ project, grid = "col-md-4" }) => {
  // console.log(project)
  const {id, attributes} = project
  return (
    <div className={grid}>
      <div className="title-project">
        <h4>{attributes.title}</h4>
      </div>
      <Link href={`/projects/${id}`}>
        <a>
          <img src={`${API_URL}${attributes.cover.data.attributes.url}`} alt="" />
        </a>
      </Link>
    </div>
  )
}

export default Project