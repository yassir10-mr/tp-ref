import { useState } from "react";
import { useRef } from "react";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <NotificationPreferences />
      <CitySelect />
      <CheckboxForm />
    </div>
  );
}

function NotificationPreferences() {
  const [notificationMethod, setNotificationMethod] = useState("");

  const handleChange = (e) => {
    setNotificationMethod(e.target.value);
  };

  return (
    <div>
      <h3>Choose your preferred notification method:</h3>
      <label>
        <input
          type="radio"
          value="Email"
          checked={notificationMethod === "Email"}
          onChange={handleChange}
        />
        Email
      </label>
      <label>
        <input
          type="radio"
          value="SMS"
          checked={notificationMethod === "SMS"}
          onChange={handleChange}
        />
        SMS
      </label>

      <div>
        {notificationMethod === "Email" ? (
          <p>You will receive notifications via Email.</p>
        ) : notificationMethod === "SMS" ? (
          <p>You will receive notifications via SMS.</p>
        ) : (
          <p>Please select a notification method.</p>
        )}
      </div>
    </div>
  );
}

function CitySelect() {
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState(["Paris", "London", "New York"]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const addCity = () => {
    setCities([...cities, "Tokyo"]); // Ajout de la ville "Tokyo"
  };

  return (
    <div>
      <h3>Select your city:</h3>
      <button onClick={addCity}>Add Tokyo</button>
      <select value={selectedCity} onChange={handleCityChange}>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <p>Selected City: {selectedCity}</p>
    </div>
  );
}

function CheckboxForm() {
  const checkboxRefs = useRef([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSelectAll = () => {
    checkboxRefs.current.forEach((checkbox) => {
      checkbox.checked = true;
    });
    updateSelectedSkills();
  };

  const handleDeselectAll = () => {
    checkboxRefs.current.forEach((checkbox) => {
      checkbox.checked = false;
    });
    updateSelectedSkills();
  };

  const updateSelectedSkills = () => {
    const selected = checkboxRefs.current
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    setSelectedSkills(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Selected skills: ${selectedSkills.join(", ")}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Select your skills:</h3>
      <label>
        <input
          type="checkbox"
          value="React"
          ref={(el) => (checkboxRefs.current[0] = el)}
          onChange={updateSelectedSkills}
        />
        React
      </label>
      <label>
        <input
          type="checkbox"
          value="Node.js"
          ref={(el) => (checkboxRefs.current[1] = el)}
          onChange={updateSelectedSkills}
        />
        Node.js
      </label>
      <label>
        <input
          type="checkbox"
          value="JavaScript"
          ref={(el) => (checkboxRefs.current[2] = el)}
          onChange={updateSelectedSkills}
        />
        JavaScript
      </label>
      <div>
        <button type="button" onClick={handleSelectAll}>
          Select All
        </button>
        <button type="button" onClick={handleDeselectAll}>
          Deselect All
        </button>
      </div>
      <p>Selected Skills: {selectedSkills.join(", ")}</p>
      <button type="submit">Submit</button>
    </form>
  );
}
