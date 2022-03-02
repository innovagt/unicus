import Image from 'next/image'
import dynamic from 'next/dynamic';
import styled from "styled-components"
import 'animate.css'

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const myLoaderBlur = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 10}`
}


const ImageWrap = styled.div`
  img{
    padding: 0 5px !important;
  }

  img:hover{
    transform: scale(1.02);
    opacity: 1 !important;
  }

`
const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/common/wowComponent"),
  { ssr: false }
)


const ImageProject = ({ grid, url, animate = ' animate__animated animate__fadeInUP'}) => {
  return (
    <>
      <DynamicComponentWithNoSSR />
      <ImageWrap className={grid + animate } >
        <a data-fancybox="gallery" href={`${url}`}>
          <Image  src={url} loader={myLoader} layout="fill" alt="" blurDataURL={myLoaderBlur} placeholder="blur" />
        </a>
      </ImageWrap>
    </>
  )
}



export default ImageProject