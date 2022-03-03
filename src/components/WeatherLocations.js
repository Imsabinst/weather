import axios from "axios";
import { apikey, baseURL } from "../data/constants";
import "./weatherLocations.css";

const WeatherLocations = ({
  location,
  setCurrentWeather,
  setSingleLocation,
}) => {
  const getMoreInfo = async (cw) => {
    if (cw) {
      try {
        const url = `${baseURL}/currentconditions/v1/${cw.Key}?apikey=${apikey}`;
        const res = await axios.get(url);
        const location_data = await res.data;
        setCurrentWeather(location_data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="container">
        {location &&
          location.map((cw, index) => {
            return (
              <div key={index}>
                <div className="card">
                  {cw.EnglishName}, {cw.Country.EnglishName}
                  <button
                    className="button"
                    onClick={() => {
                      getMoreInfo(cw);
                      setSingleLocation(cw);
                    }}
                  >
                    More info
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default WeatherLocations;
