import logo from "./logo.svg";
import "./App.css";
import Capture from "./components/Capture";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Capture />
    </div>
  );
}

export default App;
