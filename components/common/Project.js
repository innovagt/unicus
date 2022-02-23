import Link from "next/link"
const Project = (  { project, grid } ) => {
  const {id, attributes} = project
  return (
    <div className={grid}>
      <div className="title-project">
        <h4>{attributes.title}</h4>
      </div>
      <Link href={`/projects/${id}`}>
        <a>
          <img src={`http://localhost:1337${attributes.cover.data.attributes.url}`} alt="" />
        </a>
      </Link>
    </div>
  )
}

export default Project