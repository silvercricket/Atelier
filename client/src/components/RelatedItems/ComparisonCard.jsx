import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ComparisonCard = ({ item, price }) => {

  const testInitialItem = {
    "id": 40344,
    "campus": "hr-rfp",
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": "140.00",
    "created_at": "2021-08-13T14:38:44.509Z",
    "updated_at": "2021-08-13T14:38:44.509Z"
  };

  const itemCard = useSelector((state) => {
    return state.relatedItems.relatedItems[state.relatedItems.currentCardIndex]
  })

  const detailView = useSelector((state) => {
    return state.relatedItems.detailView;
  })

  return (
    <div className = "comparisonCard">
      <small>Comparing</small>
      <table className = "comparisonTable">
        <tbody>
        <tr>
          <th>{testInitialItem.name}</th>
          <th>&nbsp;</th>
          <th>{item}</th>
        </tr>
        <tr>
          <td>{testInitialItem.default_price}</td>
          <td>Feature</td>
          <td>{price}</td>
        </tr>
        </tbody>
      </table>
      {/* <h3>Current Item:</h3>
      <p>{testInitialItem.name}</p>
      <p>{testInitialItem.default_price}</p>
      <p></p>
      <h3>Related Item:</h3>
      <p>{item}</p>
      <p>{price}</p> */}
    </div>
  )
}


export default ComparisonCard;