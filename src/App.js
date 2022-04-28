import './App.css';
import theme from "./libs/theme";
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {useEffect} from "react";

function App() {
  return (
    <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
          </Routes>
        </Router>
    </ChakraProvider>
  );
}

export default App;
