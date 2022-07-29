import {Box, Container, Heading, Flex, Input, Button, useColorModeValue, Link, Text} from "@chakra-ui/react"
import { Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {API_URL} from "../libs/URLhandler"
import {CheckIcon} from "@chakra-ui/icons"

function InputField({type="text", placeholder, value, onChange}) {
    const border = useColorModeValue("1px solid rgba(0, 0, 0,0.2)", "1px solid rgba(255,255,255,0.3)")
    
    return(
        <Input
            type={type}
            border="0"
            borderBottom={border}
            placeholder={placeholder}
            borderRadius="0rem"
            _focus={{}}
            value={value}
            onChange={onChange}
            borderColor={border}
            _hover={{}}
        />
    )
}

function Register() {
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    
    const usersAPI = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: `${API_URL}/users`
    });

    function onSubmit(e) {
        e.preventDefault();
        if(confirmPassword !== password) {
            setIsError(true);
            setErrorMessage("Passwords must match");
            return;
        } 
        else if(email === "" || username === "" || password === "") {
            setIsError(true);
            setErrorMessage("Please fill out all fields");
            return;
        }
        else if(password.length < 6) {
            setIsError(true);
            setErrorMessage("Password must be more than 5 characters");
            return;
        } else {
            setIsError(false);
        }

        const newUser = {
            username: username,
            password: password,
            email: email
        }

        usersAPI.post("/", newUser).then((res) => {
            console.log(res.data);
            setIsRegistered(true);
        }).catch((err) => {
            setIsError(true);
            setErrorMessage("Email/username already exists");
            return;
        });

    }
    return(
            <Box mt={{base: 5, md: 8}}>
                <Container maxW={{base: "100%", md: "container.sm"}} display="flex" flexDir="column" alignItems="center" zIndex="2" mb={6}>
                    <Box
                        w={{base: "100%", sm: "80%", lg: "400px"}}
                        align="center"
                        p={6}
                        pl= {{base: 3, md: "40px"}}
                        pr= {{base: 3, md: "40px"}}
                        borderRadius="0.4rem"

                    >
                        { !isRegistered ?
                        <>
                            <Heading fontWeight="500">
                                Register
                            </Heading>

                            <form onSubmit={onSubmit}>
                                <Flex 
                                    mt={7}
                                    flexDir="column"
                                    gap={2}
                                >
                                    <InputField
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <InputField
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <InputField
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <InputField
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Flex>
                                <Button 
                                    type="submit"
                                    bg="orange.200" 
                                    color="black" 
                                    _hover={{bg: "orange.300"}} 
                                    fontFamily="monospace" 
                                    size="lg" 
                                    h="40px" 
                                    fontWeight="400"
                                    mt={10}
                                    w="100%"
                                >
                                        Sign up
                                </Button>
                                { isError ? <Text mt={2} fontSize={14} color="red.400">{errorMessage}</Text> : null}
                            </form>
                        </>
                        : 
                        <>
                            <Heading fontWeight="500" fontSize="xl">Register successful</Heading>
                            <CheckIcon w={12} h={12} mt={10}/>
                            <Text mt={10}>You have successfully created your account. Please go back to the <Link as={NavLink} to="/login" color="orange.200">login page</Link> to start using Entries!</Text>
                        </>
                        }
                    </Box>
                </Container>
            </Box>
        )
}

export default Register