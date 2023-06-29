import { React, useState } from "react";
import { uid } from "uid";
import "./App.css";

const isGoodWeather = true;
/*
const filteredActivities = activities.filter(
  (activity) => isForGoodWeather === isGoodWeather
);
*/
const initialActivities = [
  { id: 1, name: "swimming", isForGoodWeather: true },
  { id: 2, name: "biking", isForGoodWeather: false },
];

function App() {
  const [activities, setActivities] = useState(initialActivities);

  const [filteredActivities, setFilteredActivities] =
    useState(initialActivities);

  function handleAddActivity(data) {
    setActivities([...activities, { ...data, id: uid() }]);

    console.log(data);
  }

  return (
    <div className="App">
      <List activities={activities} isGoodWeather={isGoodWeather} />
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

function List({ filteredActivities }) {
  return (
    <ul>
      {filteredActivities.map((filteredActivity) => (
        <li key={filteredActivity.id}>{filteredActivity.name}</li>
      ))}
    </ul>
  );
}
