import {Box, Icon, Link} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {StarIcon, ChevronRightIcon} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryEditModal from "./CategoryEditModal";

function CategoryPanel({updateCategories}) {
    const highlightedColor = "rgba(255,255,255,0.08)"
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
        <>
            <Box p={2}><StarIcon/> <Link as={NavLink} to="/home/all" exact _focus={{background: highlightedColor}}>Entries</Link></Box>
            {
                categories.map((category)=>{
                    return(
                        <div key={category._id}>
                            <Box p={2}><ChevronRightIcon/> <Link as={NavLink} to={"/home/" + category._id} _focus={{background: highlightedColor}}>{category.name}</Link></Box>
                        </div>
                    );
                })
            }
            <CategoryEditModal fetchCategories={fetchCategories} categories={categories} updateCategories={updateCategories}/>
        </>
    );
}
export default CategoryPanel