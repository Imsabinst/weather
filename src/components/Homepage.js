import { useEffect, useState } from "react";
import axios from "axios";
import WeatherLocations from "./WeatherLocations";
import { apikey } from "../data/constants";
import "./homepage.css";

const Homepage = () => {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");

  const getData = async () => {
    try {
      const loc_url = `https://dataservice.accuweather.com/locations/v1/search?apikey=${apikey}&q=${city}`;
      const res = await axios.get(loc_url);
      const city_data = await res.data;
      setLocation(city_data);
    } catch (error) {
      console.log(error);
    }
    setCity("");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main">
      <input
        required
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        type="text"
        placeholder="Enter a city name"
      />
      <button
        onClick={() => {
          getData(city);
        }}
        variant="primary"
      >
        Submit
      </button>
      <div>{location ? <WeatherLocations location={location} /> : null}</div>
    </div>
  );
};

export default Homepage;
