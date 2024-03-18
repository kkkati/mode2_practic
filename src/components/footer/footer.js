import { useEffect, useState } from "react";
import styled from "styled-components";

const FooterComponent = ({ className }) => {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Kaliningrad&units=metric&lang=ru&appid=210ddccc03eb0fb16fd95e048b986260"
    )
      .then((res) => res.json())
      .then(({ name, main, weather }) => {
        setCity(name);
        setTemperature(Math.round(main.temp));
        setWeather(weather[0].description);
      });
  }, []);

  return (
    <div className={className}>
      <div>
        <div>Блог веб-разработчика</div>
        <div>web@developer.ru</div>
      </div>

      <div>
        <div>
          {city},{" "}
          {new Date().toLocaleString("ru", { day: "numeric", month: "long" })}
        </div>
        {temperature} градусов, {weather}
      </div>
    </div>
  );
};

export const Footer = styled(FooterComponent)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  height: 120px;
  padding: 20px 40px;
  font-weight: bold;
  box-shadow: 1px 2px 17px #000;
  background-color: #fff;
`;
