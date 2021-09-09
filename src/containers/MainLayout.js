import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";

const MainPageWrapper = styled.div`
  background-color: #d0e2f2;

  .mainbox {
    max-width: 500px;
  }
`;

const cities = [
  { city_name: "Colmobo", city_id: "colombo" },
  { city_name: "Kandy", city_id: "kandy" },
  { city_name: "Jaffna", city_id: "jaffna" },
  { city_name: "Galle", city_id: "galle" },
  { city_name: "Kaluthara", city_id: "kalutara" },
];

const MainLayout = () => {
  const selected_city = cities[Math.floor(Math.random() * cities.length)];
  const api_key = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${selected_city.city_id}&appid=${api_key}`
      )
      .then(function (response) {
        // handle success

        // if there is a response set it to the store

        console.log(response);
      });
  }, []);

  // fetch and store the value to the store

  return (
    <MainPageWrapper>
      <div className="body">
        <div className="mainbox">
          Main area box
          <h2 className="city_name">{selected_city.city_name}</h2>
          <input type number id="input" />
          <button> Check </button>
        </div>
      </div>
      <div className="footer"></div>
    </MainPageWrapper>
  );
};

export default MainLayout;
