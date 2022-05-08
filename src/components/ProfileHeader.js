import {Box, Heading} from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";

function ProfileHeader({userId}) {
    const [user, setUser] = useState({});
    const usersAPI = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/users"
    });

    useEffect(()=>{
        usersAPI.get("/" + userId).then((res) => {
            setUser(res.data);
        });
    }, []);

    return(
        <Box 
            w="100%"
            mb={8}
        >
            <Heading
                fontSize="4xl"
                fontWeight="500"
            >{user.username}</Heading>
        </Box>
    )
}
export default ProfileHeader;