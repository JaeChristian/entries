import './App.css';
import theme from "./libs/theme";
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import {useEffect} from "react";
import PostEntry
 from './components/PostEntry';
/**
 * Todo:
 *  - Add category functionality
 */
function App() {
  return (
    <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route path="/home/" element={<Home/>}>
              <Route path=":categoryId" element={<PostEntry showAll={false}/>}/>
              <Route path="all" element={<PostEntry showAll={true}/>}/>
            </Route>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/profile/:userId" element={<Profile/>}/>
          </Routes>
        </Router>
    </ChakraProvider>
  );
}

export default App;
