import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import "./ServiceCard.scss";

const ServiceCard = (props) => {
  const handleServiceDelete = () => {};
  return (
    <tr className="ServiceCard">
      <td>{props.id}</td>
      <td>{props.serviceName}</td>
      <td>{props.serviceDescription}</td>
      <td className="delete" onClick={handleServiceDelete}>
        <FontAwesomeIcon icon={faTrashAlt} />
        Delete
      </td>
    </tr>
  );
};

export default ServiceCard;
