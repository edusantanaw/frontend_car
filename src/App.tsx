import Home from "./pages/home";
import { DataContextProvider } from "./shared/context/dataContext";
import { GlobalStyle } from "./shared/styles/global";

function App() {
  return (
    <>
      <GlobalStyle />
      <DataContextProvider>
        <Home />
      </DataContextProvider>
    </>
  );
}

export default App;
