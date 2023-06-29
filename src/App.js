import { React, useState, useEffect } from "react";
import { uid } from "uid";
import "./App.css";

const isGoodWeather = true;

const initialActivities = [
  { id: 1, name: "swimming", isForGoodWeather: true },
  { id: 2, name: "biking", isForGoodWeather: false },
];

function App() {
  const [activities, setActivities] = useState(initialActivities);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    async function loadWeather() {
      try {
        const response = await fetch(
          `https://example-apis.vercel.app/api/weather`
        );
        const data = await response.json();
        console.log(data);
        setWeather(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadWeather();
  }, []);

  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );

  function handleAddActivity(data) {
    setActivities([...activities, { ...data, id: uid() }]);

    console.log(data);
  }

  return (
    <div className="App">
      <List
        activities={filteredActivities}
        isGoodWeather={isGoodWeather}
        weather={weather}
      />
      <Form onAddActivity={handleAddActivity} />
    </div>
  );
}
export default App;

function Form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const isForGoodWeather = event.target.elements.isForGoodWeather.checked;
    const data = { name, isForGoodWeather };
    onAddActivity(data);
    event.target.reset();
    event.target.elements.name.focus();
  }

  return (
    <div>
      <h1>Add new Activity:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" />
        <label htmlFor="isForGoodWeather">Good-weather activity:</label>
        <input id="isForGoodWeather" type="checkbox" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

function List({ activities, isGoodWeather, weather }) {
  console.log(weather);
  return (
    <>
      {isGoodWeather ? (
        <h3>The weather is awesome / Go outside and:</h3>
      ) : (
        <h2>Bad weather outside / Here's what you can do</h2>
      )}
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </>
  );
}
