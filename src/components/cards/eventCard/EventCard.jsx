import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import db from "../../../firebase";

import "./EventCard.scss";

const EventCard = (props) => {
  const handleEventDelete = () => {
    let child = db.ref("Events/" + props.dbId);
    child.remove();
    alert("Successfully Deleted.Refresh the page");
  };

  return (
    <tr className="EventCard">
      <td>{props.id}</td>
      <td>{props.venueName}</td>
      <td>{props.location}</td>
      <td>{props.date} </td>
      <td className="delete" onClick={handleEventDelete}>
        <FontAwesomeIcon icon={faTrashAlt} />
        Delete
      </td>
    </tr>
  );
};

export default EventCard;
