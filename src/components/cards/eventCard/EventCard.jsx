import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import "./EventCard.scss";

const EventCard = (props) => {
  return (
    <tr className="EventCard">
      <td>{props.id}</td>
      <td>{props.venueName}</td>
      <td>{props.location}</td>
      <td>{props.date} </td>
      <td>
        <img
          alt={props.poster}
          src={`http://localhost:8000/images/${props.poster}`}
        ></img>
      </td>
      <td className="delete" onClick={() => props.deleteEvent(props.dbId)}>
        <FontAwesomeIcon icon={faTrashAlt} />
        Delete
      </td>
    </tr>
  );
};

export default EventCard;
