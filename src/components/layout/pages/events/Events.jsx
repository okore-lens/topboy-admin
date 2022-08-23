import React, { useState, useEffect } from "react";
import EventCard from "../../../cards/eventCard/EventCard";

import "./Events.scss";

const Events = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    location: "",
    date: "",
    month: "",
  });
  const [events, setEvents] = useState([]);

  //   Handling Input Values
  const changeHandler = (ev) => {
    setFormValue({ ...formValue, [ev.target.name]: ev.target.value });
  };

  // push data to firebase
  const submitHandler = async (ev) => {
    const response = await fetch(
      "https://topboy-nation-default-rtdb.europe-west1.firebasedatabase.app/Events.json",
      {
        method: "POST",
        body: JSON.stringify({
          venueName: formValue.name,
          month: formValue.month,
          location: formValue.location,
          day: formValue.date,
        }),
      }
    );

    setFormValue({ name: "", location: "", date: "", month: "" });
  };

  //  Fetches the event details from firebase
  async function fetchEvents() {
    const response = await fetch(
      "https://topboy-nation-default-rtdb.europe-west1.firebasedatabase.app/Events.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const responseData = await response.json();

    const loadedEvents = [];

    for (const key in responseData) {
      loadedEvents.push({
        id: key,
        day: responseData[key].day,
        location: responseData[key].location,
        month: responseData[key].month,
        venueName: responseData[key].venueName,
      });
    }
    setEvents(loadedEvents);
  }

  useEffect(() => {
    fetchEvents().catch((error) => {
      alert(error.message);
    });
  }, []);

  // console.log(events);

  return (
    <div className="Events">
      <h3>Events</h3>
      <div className="form-bg">
        <form className="form">
          <div className="inputs">
            <div className="input">
              <input
                name="name"
                value={formValue.name}
                onChange={changeHandler}
                placeholder="Event Name"
              />
            </div>
            <div className="input">
              <input
                name="location"
                value={formValue.location}
                onChange={changeHandler}
                placeholder="Event Location"
              />
            </div>
            <div className="input">
              <input
                name="date"
                value={formValue.date}
                onChange={changeHandler}
                placeholder="Event Date"
              />
            </div>
            <div className="input">
              <input
                name="month"
                value={formValue.month}
                onChange={changeHandler}
                placeholder="Event Month"
              />
            </div>
          </div>
          <button onClick={submitHandler}>SUBMIT </button>
        </form>
      </div>
      <div className="events-body">
        <table>
          <thead>
            <tr className="table-heading">
              <td>No</td>
              <td>Name</td>
              <td>Venue</td>
              <td>Time And Day</td>
            </tr>
          </thead>
          <tbody>
            {events.map((event, idx) => (
              <EventCard
                key={event.index}
                venueName={event.venueName}
                id={idx + 1}
                location={event.location}
                date={`${event.day}  ${event.month}`}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
