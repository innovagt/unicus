import { API_URL } from '../../config/urls';
import Image from 'next/image'
import styled from "styled-components"

const myLoader = ({ src, width, quality }) => {
  return `${API_URL}${src}?w=${width}&q=${quality || 75}`
}

const myLoaderBlur = ({ src, width, quality }) => {
  return `${API_URL}${src}?w=${width}&q=${quality || 10}`
}


const ImageWrap = styled.div`
  position: relative;
  
  img{
    padding: 0 5px !important;
  }

  img:hover{
    transform: scale(1.02);
    opacity: 1 !important;
  }

`

const ImageProject = ({ grid, url }) => {
  return (
    <ImageWrap className={grid}>
      <a data-fancybox="gallery" href={`${API_URL}${url}`}>
        <Image  src={url} loader={myLoader} layout="fill" alt="" blurDataURL={myLoaderBlur} placeholder="blur" />
      </a>
    </ImageWrap>
  )
}



export default ImageProject