import ReactMarkdown from "react-markdown";

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const myLoaderBlur = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 10}`;
};

export const WeAreOne = ({ item }) => {
  return (
    <div className="weare-one">
      <h1>{item.title}</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="descripton-weare">
            <ReactMarkdown>{item.description}</ReactMarkdown>
          </div>
        </div>
        <div className="col-md-9">
          <img src={item.picture} alt="" />
          <div className="overlay-bg">
            <h3>{item.label}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export const WeAreTwo = ({ item }) => {
  return (
    <div className="weare-two">
      <h1 className="text-right">{item.title}</h1>
      <div className="row">
        <div className="col-md-9">
          <img src={item.picture} alt="" />
          <div className="overlay-bg">
            <h3>{item.label}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="descripton-weare">
            <div className="descripton-weare">
              <ReactMarkdown>{item.description}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}