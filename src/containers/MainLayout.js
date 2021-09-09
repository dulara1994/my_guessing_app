import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { tempAction, setOldReadings } from "../actions/common.actions";

const MainPageWrapper = styled.div`
  background-color: #d0e2f2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .marks-collector {
    display: flex;
    flex-direction: column;
  }

  .mainbox {
    /* max-width: 500px; */
    border: 2px solid black;
    border-radius: 33px;
    padding: 50px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    input#input {
      background-color: transparent;
      padding: 10px;
    }

    button {
      background: transparent;
      padding: 5px;
      border-radius: 5px;
    }
  }

  .guess {
  }

  .footer {
    width: 80%;
    border-top: 1px solid black;
    margin-top: 50px;
    display: flex;

    .marks-collector {
      margin: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;

      &.correct-reading {
        color: green;
      }
      &.false-reading {
        color: red;
      }
    }
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

  const attempts_left = 5 - previousReadings.length;

  const api_key = process.env.REACT_APP_WEATHER_API_KEY;

  const [temp, setTemp] = useState(0);
  const [city, setcity] = useState("");
  const [cityTemp, setcityTemp] = useState(0);
  const [won, setWon] = useState("no");

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

  // lets manipulete won here
  let win_count = 0;
  previousReadings.forEach((reading) => {
    if (reading.correct) {
      win_count += 1;
    }
  });

  if (attempts_left === 0) {
    // prevent accidential rerendering
    if (win_count >= 3) {
      if (won !== "yes") {
        setWon("yes");
      }
    } else {
      if (won !== "lost") {
        setWon("lost");
      }
    }
  }
  console.log(6666, win_count);

  return (
    <MainPageWrapper>
      <div className="body">
        {won === "yes" && (
          <div className="mainbox">
            <h2>Congratulations! You Won</h2>
          </div>
        )}
        {won === "lost" && (
          <div className="mainbox">
            <h2>Sorry! You lost</h2>
          </div>
        )}

        {won === "no" && (
          <div className="mainbox">
            Main area box
            {/* {data} */}
            <h2 className="city_name">{city.city_name}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                console.log(e);
                let floatTemp = parseFloat(temp);

                // if value is correct
                console.log(99999, data, parseFloat(temp));
                if (data <= floatTemp + 5 && data >= floatTemp - 5) {
                  // setWon("won");
                  dispatch(
                    setOldReadings([
                      ...previousReadings,
                      {
                        temp,
                        was: cityTemp,
                        correct: true,
                      },
                    ])
                  );
                  // return alert(`You guessed it The correct value is  ${data}`);
                } else {
                  dispatch(
                    setOldReadings([
                      ...previousReadings,
                      {
                        temp,
                        was: cityTemp,
                        correct: false,
                      },
                    ])
                  );
                }
              }}
            >
              <input
                type="number"
                id="input"
                placeholder="Your guess text box"
                value={temp}
                required
                onChange={(e) => {
                  setTemp(e.target.value);
                }}
              />
              <br />
              <p>You have {attempts_left} attempts left</p>
              <button> Check </button>
            </form>
          </div>
        )}
      </div>
      <div className="footer">
        {previousReadings.map((reading) => {
          return (
            <div
              className={`marks-collector ${
                reading.correct ? "correct-reading" : "false-reading"
              }`}
            >
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
