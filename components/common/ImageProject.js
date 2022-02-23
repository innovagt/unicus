const ImageProject = ({ grid, url }) => {
  
  return (
    <div className={grid}>
        <a>
          <img src={`http://localhost:1337${url}`} alt="" />
        </a>
    </div>
  )
}

export default ImageProject