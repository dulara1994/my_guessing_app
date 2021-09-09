import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { tempAction, setOldReadings } from "../actions/common.actions";

const MainPageWrapper = styled.div`
  background-color: #d0e2f2;

  .mainbox {
    max-width: 500px;
  }

  .guess {
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
  const dispatch = useDispatch();
  const data = useSelector(({ common }) => common.temperature);
  const previousReadings = useSelector(({ common }) => common.previousReadings);

  const api_key = process.env.REACT_APP_WEATHER_API_KEY;

  const [temp, setTemp] = useState(0);
  const [city, setcity] = useState("");
  const [cityTemp, setcityTemp] = useState(0);

  useEffect(() => {
    const selected_city = cities[Math.floor(Math.random() * cities.length)];
    setcity(selected_city);
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${selected_city.city_id}&appid=${api_key}`
      )
      .then(function (response) {
        let temperature;
        try {
          temperature = response.data.main.temp;
          setcityTemp(temperature);
          dispatch(tempAction(temperature));
          console.log(temperature);
        } catch (e) {
          console.log(e);
          alert("something went wrong");
        }

        console.log(response);
      });
  }, []);

  return (
    <MainPageWrapper>
      <div className="body">
        <div className="mainbox">
          Main area box
          {data}
          <h2 className="city_name">{city.city_name}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              console.log(e);
              let floatTemp = parseFloat(temp);

              // if value is correct
              console.log(99999, data, parseFloat(temp));
              if (data <= floatTemp + 5 && data >= floatTemp - 5) {
                return alert(`You guessed it The correct value is  ${data}`);
              } else {
                dispatch(
                  setOldReadings([
                    ...previousReadings,
                    {
                      temp,
                      was: cityTemp,
                    },
                  ])
                );
              }
            }}
          >
            <input
              type="number"
              id="input"
              value={temp}
              onChange={(e) => {
                setTemp(e.target.value);
              }}
            />
            <button> Check </button>
          </form>
        </div>
      </div>
      <div className="footer">
        {previousReadings.map((reading) => {
          return (
            <div>
              <div className="guess">{reading.temp} </div>
              <div className="actual"> Was {reading.was}</div>
            </div>
          );
        })}
      </div>
    </MainPageWrapper>
  );
};

export default MainLayout;
