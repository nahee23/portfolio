import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { PerformanceList } from "./components/PerformanceList/PerformanceList";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />

        <PerformanceList />
      </div>
    </>
  );
}

export default App;
