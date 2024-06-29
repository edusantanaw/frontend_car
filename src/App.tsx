import Cars from "./pages/cars";
import { GlobalStyle } from "./shared/styles/global";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Cars />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
