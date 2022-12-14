import React, { useState, useEffect } from "react";
import "./Services.scss";
import ServiceCard from "../../../cards/serviceCard/ServiceCard";

const Services = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
  });
  const [services, setServices] = useState([]);
  const [disable, setDisable] = useState(true);

  //   Handling Input Values
  const changeHandler = (ev) => {
    setDisable(false);
    setFormValue({ ...formValue, [ev.target.name]: ev.target.value });
  };

  // push data to firebase
  const submitHandler = async (ev) => {};

  //  Fetches the services
  async function fetchServices() {}

  useEffect(() => {
    fetchServices();
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
          <button disabled={disable} onClick={submitHandler}>
            SUBMIT{" "}
          </button>
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
            {services.map((service, idx) => (
              <ServiceCard
                key={service.id}
                dbId={service.id}
                serviceName={service.serviceName}
                id={idx + 1}
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
