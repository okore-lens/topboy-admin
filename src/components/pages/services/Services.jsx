import React, { useState, useEffect } from "react";
import "./Services.scss";
import ServiceCard from "../../cards/serviceCard/ServiceCard";

const Services = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
  });
  const [services, setServices] = useState([]);

  //   Handling Input Values
  const changeHandler = (ev) => {
    setFormValue({ ...formValue, [ev.target.name]: ev.target.value });
  };

  // push data to firebase
  const submitHandler = async (ev) => {
    const response = await fetch(
      "https://topboy-nation-default-rtdb.europe-west1.firebasedatabase.app/Services.json",
      {
        method: "POST",
        body: JSON.stringify({
          serviceName: formValue.name,
          serviceDescription: formValue.description,
        }),
      }
    );

    setFormValue({ name: "", location: "", date: "", month: "" });
  };

  //  Fetches the event details from firebase
  async function fetchServices() {
    const response = await fetch(
      "https://topboy-nation-default-rtdb.europe-west1.firebasedatabase.app/Services.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const responseData = await response.json();

    const loadedServices = [];

    for (const key in responseData) {
      loadedServices.push({
        id: key,
        serviceDescription: responseData[key].serviceDescription,
        serviceName: responseData[key].serviceName,
      });
    }
    setServices(loadedServices);
  }

  useEffect(() => {
    fetchServices().catch((error) => {
      alert(error.message);
    });
  }, []);

  return (
    <div className="Services">
      <h3>Services</h3>
      <div className="form-bg">
        <form className="form">
          <div className="inputs">
            <div className="input">
              <input
                name="name"
                value={formValue.name}
                onChange={changeHandler}
                placeholder="Service Name"
              />
            </div>
            <div className="input">
              <textarea
                name="description"
                value={formValue.description}
                onChange={changeHandler}
                placeholder="Service Description"
              />
            </div>
          </div>
          <button onClick={submitHandler}>SUBMIT </button>
        </form>
      </div>
      <div className="services-body">
        <table>
          <thead>
            <tr className="table-heading">
              <td>No</td>
              <td>Service Name</td>
              <td>Service Description</td>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                serviceName={service.serviceName}
                id={service.id}
                serviceDescription={service.serviceDescription}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
