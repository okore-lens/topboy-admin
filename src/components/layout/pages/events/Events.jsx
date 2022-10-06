import React, { useState, useEffect } from "react";
import EventCard from "../../../cards/eventCard/EventCard";

import "./Events.scss";

const Events = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    location: "",
    date: "",
  });
  const [events, setEvents] = useState([]);
  const [disable, setDisable] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //   Handling Input Values
  const changeHandler = (ev) => {
    setFormValue({ ...formValue, [ev.target.name]: ev.target.value });
  };

  const photoHandler = (ev) => {
    setPhoto(ev.target.files[0]);
  };

  useEffect(() => {
    if (
      formValue.name.length !== 0 &&
      formValue.location.length !== 0 &&
      formValue.date.length !== 0 &&
      !!photo
    ) {
      setDisable(false);
    }
  }, [formValue, photo]);

  // push events
  const submitHandler = async (ev) => {
    ev.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/store/event", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formValue.name, dayMonth: formValue.date, venue: formValue.location }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error("An error has occured");
      }
      console.log(responseData);
      const imageFormData = new FormData();
      imageFormData.append("image", photo);
      const imageResponse = await fetch(`http://localhost:8000/store/event/image/${responseData.id}`, { method: 'POST', body: imageFormData });
      if (!imageResponse.ok) {
        throw new Error('An image rror has occured');
      }
      const imageData = await imageResponse.json();
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          name: responseData.name,
          id: responseData.id,
          venue: responseData.venue,
          dayMonth: responseData.dayMonth,
          poster: imageData.poster,
        },
      ]);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  //  Fetches the Events
  async function fetchEvents() {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/store/event");
      const responseData = await response.json();
      setEvents(responseData.events);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  // Delete Events
  const deleteEvent = async (eventId) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8000/store/event/${eventId}`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );
      const responseData = await response.json();
      if (!responseData.id) {
        throw new Error("An Error has occured");
      }
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== responseData.id)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="Events">
      <h3>Events</h3>
      <div className="form-bg">
        <div className="wrapper">
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
                  type="date"
                />
              </div>
            </div>
            <label>
              <input type="file" onChange={photoHandler} />
              <span>+</span>
            </label>
            <div className="output">
              {error && <div className="error">{error}</div>}
              {photo && <div>{photo.name}</div>}
            </div>
            <button disabled={disable} onClick={submitHandler}>
              SUBMIT
            </button>
          </form>
        </div>
      </div>
      <div className="events-body">
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <table>
            <thead>
              <tr className="table-heading">
                <td>No</td>
                <td>Name</td>
                <td>Venue</td>
                <td>Time And Day</td>
                <td>Poster Url</td>
              </tr>
            </thead>
            <tbody>
              {events.map((event, idx) => (
                <EventCard
                  deleteEvent={deleteEvent}
                  key={event.id}
                  dbId={event.id}
                  venueName={event.name}
                  id={idx + 1}
                  location={event.venue}
                  date={event.dayMonth}
                  poster={event.poster}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Events;
