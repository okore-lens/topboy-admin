import React, { useState, useEffect } from "react";
import useStorage from "../../../../hooks/useStorage";
import EventCard from "../../../cards/eventCard/EventCard";
import ProgressBar from "./components/ProgressBar";

import "./Events.scss";

const Events = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    location: "",
    date: "",
    month: "",
  });
  const [events, setEvents] = useState([]);
  const [disable, setDisable] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [ok, setOk] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   Handling Input Values
  const changeHandler = (ev) => {
    setFormValue({ ...formValue, [ev.target.name]: ev.target.value });
  };

  const folder = "images";

  const { url, progress } = useStorage(photo, folder, ok);

  // push data to firebase
  const submitHandler = async (ev) => {
    ev.preventDefault();
    setOk(true);

    console.log(progress, url);

    const response = await fetch(
      "https://topboy-nation-default-rtdb.europe-west1.firebasedatabase.app/Events.json",
      {
        method: "POST",
        body: JSON.stringify({
          venueName: formValue.name,
          month: formValue.month,
          location: formValue.location,
          day: formValue.date,
          url: url,
        }),
      }
    );

    // setFormValue({ name: "", location: "", date: "", month: "" });
  };

  //pushing photos to firebase

  const photoHandler = (ev) => {
    setDisable(false);
    const types = ["image/png", "image/jpeg"];
    let selectedPhoto = ev.target.files[0];
    if (selectedPhoto && types.includes(selectedPhoto.type)) {
      setPhoto(selectedPhoto);
      setError(null);
    } else {
      setPhoto(null);
      setError("Select a file of image type(png or jpeg)");
    }
  };

  //  Fetches the event details from firebase
  async function fetchEvents() {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/store/event');
      const responseData = await response.json();
      setEvents(responseData.events);
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    // const response = await fetch(
    //   "https://topboy-nation-default-rtdb.europe-west1.firebasedatabase.app/Events.json"
    // );

    // if (!response.ok) {
    //   throw new Error("Something went wrong");
    // }

    // const responseData = await response.json();

    // const loadedEvents = [];

    // for (const key in responseData) {
    //   loadedEvents.push({
    //     id: key,
    //     day: responseData[key].day,
    //     location: responseData[key].location,
    //     month: responseData[key].month,
    //     venueName: responseData[key].venueName,
    //   });
    // }
    // setEvents(loadedEvents);
  }

  const deleteEvent = async (eventId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8000/store/event/${eventId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } } );
      const responseData = await response.json();
      if(!responseData.id) {
        throw new Error('An Error has occured');
      }
      setEvents(prevEvents => prevEvents.filter((event) => event.id !== responseData.id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents()
    // imageRetriever();
  }, []);

  // console.log(events);

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
                  type='date'
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
              {photo && (
                <ProgressBar
                  file={photo}
                  setFile={setPhoto}
                  setOk={ok}
                  folder="images"
                />
              )}
            </div>
            <button disabled={disable} onClick={submitHandler}>
              SUBMIT{" "}
            </button>
          </form>
        </div>
      </div>
      <div className="events-body">
        {isLoading && <p>Loading...</p>}
        {!isLoading && <table>
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
        </table>}
      </div>
    </div>
  );
};

export default Events;
