import PostEntry from "../components/PostEntry";
import ContentLayout from "../layouts/ContentLayout";
import {Box} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import {ChevronRightIcon, StarIcon} from "@chakra-ui/icons";
import {useState, useEffect} from "react";
import axios from "axios";
import CategoryFilters from "../components/CategoryFilters";

function Home() {
    const [categories, setCategories] = useState([]);
    const [categoryChange, setCategoryChange] = useState(0);

    // Decrypted JWT token
    const authUser = JSON.parse(atob(localStorage.getItem("token")?.split(".")[1]));

    // Endpoint for categories
    const categoriesAPI = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/categories"
    });

    // Fetch categories on render and categoryChange
    useEffect(()=>{
        fetchCategories();
    }, [categoryChange]);

    // Fetch all users categories from endpoint
    function fetchCategories() {
        categoriesAPI.get("/user/" + authUser.id).then((res) => {
            setCategories(res.data);
        }).catch((err) => {
            console.error(err.response.data.message);
        })
    }

    // Increments the categoryChange variable to initiate a re-render
    function updateCategories() {
        setCategoryChange(categoryChange + 1);
    }

   // Checks if JWT token exists, if not then redirect to login.
    if(localStorage.getItem("token") === null) {
        return <Navigate to="/login"/>
    }
    console.log(localStorage.getItem("token"));

    return(
        <>
            <CategoryFilters categories={categories}/>
            <ContentLayout showNav={true}>
                <PostEntry categories={categories} updateCategories={updateCategories}/>
            </ContentLayout>
        </>
    );
}
export default Home;