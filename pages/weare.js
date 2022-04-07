import configLanguajeWeb from '../config/language'
import { useRouter } from "next/router"
import Head from "next/head"
import axios from "axios";
import { API_URL } from "../config/urls";
import { WeAreOne, WeAreTwo } from '../components/common/weare';

const WeAre = ({weare}) => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{configLanguajeWeb.navWeAre[`${router.locale}`]} | Unicus </title>
      </Head>
      <section className="weare">
        {
          weare.data.map((item, index) => {
            const data = {
              title: item.attributes.locale == router.locale || !item.attributes.localizations.data[0]?.attributes
                ? item.attributes.title
                : item.attributes.localizations.data[0].attributes.title,
              label: item.attributes.locale == router.locale || !item.attributes.localizations.data[0]?.attributes
                ? item.attributes.label
                : item.attributes.localizations.data[0].attributes.label,
              description: item.attributes.locale == router.locale || !item.attributes.localizations.data[0]?.attributes
                ? item.attributes.description
                : item.attributes.localizations.data[0].attributes.description,
              picture: item.attributes.picture.data.attributes.url
            }
            if (index % 2 === 0) {
              return <WeAreOne item={data}/>
            } else {
              return <WeAreTwo item={data}/>
            }
          })
        }
      </section>
    </>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const { data: weare } = await axios.get(
      `${API_URL}/api/weares?populate=*`
      , {
        headers: {
          Authorization:
            `Bearer ${API_TOKEN}`,
        }
      }
    );

    return {
      props: {
        weare,
      },
    };
  } catch (error) {
    console.log(error);
  }
};


export default WeAre