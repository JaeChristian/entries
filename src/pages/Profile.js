import PostEntry from "../components/PostEntry";
import ContentLayout from "../layouts/ContentLayout";
import { Navigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import { Box, useColorModeValue } from "@chakra-ui/react";
import ProfileEntries from "../components/ProfileEntries";

function Profile() {
    const thisUser = JSON.parse(atob(localStorage.getItem("token")?.split(".")[1]));
    const {userId} = useParams();
    const dividerColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300")

    if(localStorage.getItem("token") === null) {
        return <Navigate to="/login"/>
    }
    console.log(localStorage.getItem("token"));
    return(
        <ContentLayout showNav={true} containerSize="container.lg">
            <ProfileHeader userId={userId}/>
            <Box mt={4} mb={4} minH="1px" w="100%" bg={dividerColor}/>
            <ProfileEntries/>
        </ContentLayout>
    );
}
export default Profile;