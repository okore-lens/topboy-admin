import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import db from "../../../firebase";

import "./ServiceCard.scss";

const ServiceCard = (props) => {
  const handleServiceDelete = () => {
    let child = db.ref("Services/" + props.dbId);
    child.remove();
    alert("Successfully Deleted.Refresh the page");
  };
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
