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
                key={event.id}
                dbId={event.id}
                venueName={event.venueName}
                id={idx + 1}
                location={event.location}
                date={`${event.day}  ${event.month}`}
                poster={event.url}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
