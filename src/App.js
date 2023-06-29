import './App.css';

function App() {
  function handleAddActivity(data) {
    //set a state with data
    console.log(data);
  }
  return (
    <div className="App">
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
