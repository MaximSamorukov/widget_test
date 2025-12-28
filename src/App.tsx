import "./App.scss";
import { Meter } from "./components/Meter/Meter";
import { NumberField } from "./components/NumberField/NumberField";
import { TextField } from "./components/TextField/TextField";

function App() {
  return (
    <div>
      <NumberField label="Width" defaultValue={1024} minValue={0} />
      <TextField label="Name" placeholder="Enter your full name" />
      <Meter label="Storage" value={88} />
    </div>
  );
}

export default App;
