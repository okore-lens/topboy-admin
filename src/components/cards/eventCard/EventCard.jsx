import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import "./EventCard.scss";

const EventCard = (props) => {
  return (
    <tr className="EventCard">
      <td>{props.id}</td>
      <td>{props.venueName}</td>
      <td>{props.location}</td>
      <td>{props.date}</td>
      <div className="delete">
        <FontAwesomeIcon icon={faTrashAlt} />
        Delete
      </div>
    </tr>
  );
};

export default EventCard;
