import "./Hot.jsx";
import "./juicy.jsx";
import "./Cozy.jsx";
import data from "../data/textData.js";

function handleData() {

  data.map((item) => {
    {data.map((item) => (
      <PortfolioItems
        key={item.id}
        title={item.title}
        description={item.description}
        imgBg={item.imgBg}
        imgUrl={item.imgUrl}
        stack={item.stack}
        link={item.link}
      />
    ))}
  }