import PropTypes from 'prop-types';

export function MenuSection({ data, className }) {
  return (
    <section id={data.strId} className={className}>
      <h2>{data.strTitle}</h2>
      <p>{data.strTextOne}</p>
      <p>{data.strTextTwo}</p>
      {data.items.map((item, index) => (
        <div key={index}>
          <span className="left">{item.name}</span>
          {item.price && <span className="right">{item.price}</span>}
          {item.time && <span className="right">{item.time}</span>}
          {item.area && <span className="right">{item.area}</span>}
          {item.email && <span className="right">{item.email}</span>}
        </div>
      ))}
    </section>
  );
}

MenuSection.propTypes = {
  data: PropTypes.shape({
    strId: PropTypes.string.isRequired,
    strTitle: PropTypes.string.isRequired,
    strTextOne: PropTypes.string.isRequired,
    strTextTwo: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string,
        time: PropTypes.string,
        area: PropTypes.string,
        email: PropTypes.string
      })
    ).isRequired
  }).isRequired,
  className: PropTypes.string.isRequired,
};


// export function MenuSection() {
//   return (
//     <>
//       {textData.map((data, index) => (
//         <section key={index} id={data.strId}>
//           <h2>{data.strTitle}</h2>
//           <p>{data.strTextOne}</p>
//           <p>{data.strTextTwo}</p>
//           <p>{data.strTextThree}</p>
//           <p>{data.strTextFour}</p>
//           <p>{data.strTextFive}</p>
//           {data.strTextSix && <p>{data.strTextSix}</p>}
//         </section>
//       ))}
//     </>
//   );
// }

