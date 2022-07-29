import './App.css';
import theme from "./libs/theme";
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import {useEffect, useState} from "react";
import Register from "./pages/Register"
import PostEntry
 from './components/PostEntry';
/**
 * Todo:
 *  - Add category functionality
 */
function App() {
  const [categoryUpdater, setCategoryUpdater] = useState(0);

  function updateCategories() {
    setCategoryUpdater(categoryUpdater + 1);
  }

  return (
    <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route path="/home/" element={<Home updateCategories={updateCategories}/>}>
              <Route path=":categoryId" element={<PostEntry showAll={false} categoryUpdater={categoryUpdater}/>}/>
              <Route path="all" element={<PostEntry showAll={true} categoryUpdater={categoryUpdater}/>}/>
            </Route>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/profile/:userId" element={<Profile/>}/>
            <Route exact path="/register" element={<Register/>}/>
          </Routes>
        </Router>
    </ChakraProvider>
  );
}

export default App;
