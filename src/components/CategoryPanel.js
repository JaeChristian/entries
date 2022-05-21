import {Box, Link} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {StarIcon, ChevronRightIcon} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

function CategoryPanel() {
    const [categories, setCategories] = useState([]);
    // Decrypted JWT token
    const authUser = JSON.parse(atob(localStorage.getItem("token")?.split(".")[1]));

    // Endpoint for categories
    const categoriesAPI = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/categories"
    });

    function fetchCategories() {
        categoriesAPI.get("/user/" + authUser.id).then((res) => {
            setCategories(res.data);
        }).catch((err) => {
            console.error(err.response.data.message);
        })
    }

    useEffect(()=>{
      fetchCategories();  
    }, []);

    return(
        <Box ml={4} w="300px" position="absolute" left="0" display={{base: "none", md: "flex"}} flexDir="column" gap={2}>
            <Box p={2}><StarIcon/> <NavLink to="/home/all" exact>Entries</NavLink></Box>
            {
                categories.map((category)=>{
                    return(
                        <div key={category._id}>
                            <Box p={2}><ChevronRightIcon/> <NavLink to={"/home/" + category._id}>{category.name}</NavLink></Box>
                        </div>
                    );
                })
            }
        </Box>
    );
}
export default CategoryPanel