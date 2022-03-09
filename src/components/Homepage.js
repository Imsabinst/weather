import "./homepage.css";

const Homepage = ({ cityName }) => {
  return (
    <div>
      <h2>Current Weather Forecast</h2>
      <form onSubmit={cityName}>
        <input
          type="text"
          placeholder="Please, enter the name of a city"
          name="city"
        />
        <button>Show weather info</button>
      </form>
    </div>
  );
};

export default Homepage;
