import ContentLayout from "../layouts/ContentLayout";
import { Navigate, Outlet } from "react-router-dom";
import CategoryPanel from "../components/CategoryPanel";
import {Box} from "@chakra-ui/react"
import axios from "axios"
import { API_URL } from "../libs/URLhandler";

function Home({updateCategories}) {
    const jwtApi = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: `${API_URL}/jwtAuth`
    });

   // Checks if JWT token exists, if not then redirect to login.
    if(localStorage.getItem("token") === null) {
        return <Navigate to="/login"/>
    } else {
        // Posts to jwtAuth endpoint to check if the existing token is valid
        jwtApi.post("/").then((res) => {
            //console.log(res.data);
        }).catch((err) => {
            // Executes if an error is caught (invalid or expired token)
            console.log(err.response.data.message);
            localStorage.removeItem("token");
            return <Navigate to="/login"/>
        })
    }
    //console.log(localStorage.getItem("token"));

    return(
        <>
            <Box ml={4} w="300px" position="fixed" left="0" display={{base: "none", xl: "flex"}} flexDir="column" gap={2}>
                <CategoryPanel updateCategories={updateCategories}/>
            </Box>
            <ContentLayout showNav={true}>
                <Outlet/>
            </ContentLayout>
            
        </>
    );
}
export default Home;