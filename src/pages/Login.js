import {Box, Flex, Link, Heading, Input, Container, Button, useColorModeValue} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {Navigate, NavLink} from "react-router-dom"
import {API_URL} from "../libs/URLhandler"

function Login() {
    //#FFC700 nice orange
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const border = useColorModeValue("1px solid rgba(0, 0, 0,0.2)", "1px solid rgba(255,255,255,0.3)")
    function onSubmit(e) {
        e.preventDefault();
        const user = {
            email: email,
            password: password
        }
        axios.post(`${API_URL}/login`, user).then((res) => {
            //console.log("success");
            setSuccess(true);
            localStorage.setItem("token", res.data.token);
            
        }).catch((err) => {
            console.error(err);
        });
    }

    // If login was success, or if login token exists then redirect to home
    if(success) {
        return <Navigate to="/home/all"/>;
    }
    if(localStorage.getItem("token") !== null) {
        return <Navigate to="/home/all"/>;
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
                    <Heading fontWeight="500">entries</Heading>
                    <form onSubmit={onSubmit}>
                        <Flex 
                            mt={7}
                            flexDir="column"
                            gap={2}
                        >
                            <Input
                                border="0"
                                borderBottom={border}
                                placeholder="Email"
                                borderRadius="0rem"
                                _focus={{}}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                borderColor={border}
                                _hover={{}}
                            />
                            <Input
                                type="password"
                                border="0"
                                borderBottom={border}
                                placeholder="Password"
                                borderRadius="0rem"
                                _focus={{}}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                _hover={{}}
                            />
                        </Flex>
                        <Flex mt={10} alignContent="center" justifyContent="space-between">
                            <Link as={NavLink} to="/register">Sign up</Link>
                            <Button 
                                type="submit"
                                bg="orange.200" 
                                color="black" 
                                _hover={{bg: "orange.300"}} 
                                fontFamily="monospace" 
                                size="lg" 
                                h="40px" 
                                fontWeight="400"
                            >
                                    Log In
                                </Button>
                        </Flex>
                    </form>
                </Box>
            </Container>
        </Box>
    );
}

export default Login;