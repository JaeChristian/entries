import {Box, Heading, Flex, Image, Text, Link, useColorModeValue} from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import {NavLink} from "react-router-dom"
import { API_URL } from "../libs/URLhandler";

function ProfileHeader({userId}) {
    const [user, setUser] = useState({});
    const subOptions = useColorModeValue("blackAlpha.500", "whiteAlpha.400");
    // Decrypted JWT token
    const authUser = JSON.parse(atob(localStorage.getItem("token")?.split(".")[1]));
    console.log(authUser); 
    const usersAPI = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: `${API_URL}/users`
    });

    useEffect(()=>{
        usersAPI.get("/" + userId).then((res) => {
            setUser(res.data);
        });
    }, []);

    return(
        <>
            <Flex 
                w="100%"
                gap={4}
                alignItems="center"
                mb={4}
            >
                <Image src={user.profileImageURL} w="120px" h="auto" borderRadius="full" objectFit="cover"/>
                <Flex
                    flexDir="column"
                    gap={2}
                >
                    <Heading
                        fontSize="xl"
                        fontWeight="500"
                    >{user.username}</Heading>
                    <Link as={NavLink} to={"/accounts/edit"} _focus={{}} fontSize="sm" color={subOptions}>Edit</Link>
                </Flex>
            </Flex>
            { user.bio && 
                <Text fontSize="sm">
                    {user.bio}
                </Text>
            }
        </>
    )
}
export default ProfileHeader;