import ContentLayout from "../layouts/ContentLayout";
import { Navigate, Outlet } from "react-router-dom";
import CategoryPanel from "../components/CategoryPanel";
import {Box} from "@chakra-ui/react"

function Home() {

   // Checks if JWT token exists, if not then redirect to login.
    if(localStorage.getItem("token") === null) {
        return <Navigate to="/login"/>
    }
    console.log(localStorage.getItem("token"));

    return(
        <>
            <Box ml={4} w="300px" position="fixed" left="0" display={{base: "none", xl: "flex"}} flexDir="column" gap={2}>
                <CategoryPanel/>
            </Box>
            <ContentLayout showNav={true}>
                <Outlet/>
            </ContentLayout>
            
        </>
    );
}
export default Home;