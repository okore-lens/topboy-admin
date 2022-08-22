import React from "react";
import "./EventCard.scss";

const EventCard = (props) => {
  return (
    <tr className="EventCard">
      <td>{props.id}</td>
      <td>{props.venueName}</td>
      <td>{props.location}</td>
      <td>{props.date}</td>
    </tr>
  );
};

export default EventCard;
