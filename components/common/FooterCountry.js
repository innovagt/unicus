const FooterCountry = ({ country = {}, locale }) => {
  const { attributes } = country;
  return (
    <div className="col-md-4">
      <div className="box-pais">
        <div className="pais">
          <span>
            {
            attributes.locale == locale || !attributes.localizations.data[0]?.attributes
              ? attributes.country
              : attributes.localizations.data[0].attributes.country
            }
          </span>
        </div>
        <div>
          <a href={`tel:(${attributes.prefixNumber}) ${attributes.phone}`} ><img src="/img/phone.svg" className="icon-f" alt="" />{`(${attributes.prefixNumber}) ${attributes.phone}`}</a>
        </div>
        <div>
          <a href={`mailto:${attributes.email}`}> <img src="/img/email.svg" className="icon-f" alt="" /> {attributes.email}</a>
        </div>
        <img src={attributes.pictureCountry.data.attributes.url} alt="" />
      </div>
    </div>
  )
}

export default FooterCountry