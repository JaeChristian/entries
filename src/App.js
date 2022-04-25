import './App.css';
import theme from "./libs/theme";
import {ChakraProvider, Box} from "@chakra-ui/react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Landing from "./pages/Landing";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar/>
      <Box mt="80px">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/home" element={<Home/>}/>
        </Routes>
      </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
