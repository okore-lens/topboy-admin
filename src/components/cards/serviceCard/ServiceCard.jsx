import React from "react";

import "./ServiceCard.scss";

const ServiceCard = (props) => {
  return (
    <tr className="ServiceCard">
      <td>{props.id}</td>
      <td>{props.serviceName}</td>
      <td>{props.serviceDescription}</td>
    </tr>
  );
};

export default ServiceCard;
