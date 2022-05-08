import {Box, Heading, Container, Text, Flex, Image, Menu, IconButton, useColorModeValue, MenuButton, MenuList, MenuItem} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import styled from "@emotion/styled";
import ModeToggleButton from "./darkModeToggler";
import { Navigate } from "react-router-dom";
import {useEffect, useState} from "react";

function Navbar(){
    const bg = useColorModeValue('white', '#181818');
    const [redirect, setRedirect] = useState(false);
    const Link = styled.a`
        width: 100%;
        font-weight: 300;
    `;
    function killToken() {
        localStorage.removeItem("token");
        setRedirect(true);
    }

    useEffect(()=>{
        if(redirect) {
            setRedirect(false);
        }
    }, []);
    
    return(
        <Box
            position="fixed"
            top="0"
            w="100%"
            pt={4}
            pb={4}
            zIndex="1"
            bg={bg}
        >
            <Container 
                minW={{base: "100%", md: "container.lg"}}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <ModeToggleButton/>
                <Heading fontSize="2xl" fontWeight="500">entries</Heading>
                <Box display="inline-block">
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            icon={<HamburgerIcon/>}
                            variant="outline"
                            _focus={{borderColor: "whiteAlpha.400"}}
                            borderColor={useColorModeValue("blackAlpha.300", "rgba(255,255,255,0.3)")}
                        />
                        <MenuList bg={bg} border="none" boxShadow="0 5px 4px rgba(0, 0, 0, 0.08), 0 5px 8px rgba(0, 0, 0, 0.2)">
                            <MenuItem w="100%">
                                <Link href="/home">Home</Link>
                            </MenuItem>
                            <MenuItem w="100%">
                                <Link href="javascript:void(0)">Settings</Link>
                            </MenuItem>
                            <MenuItem w="100%">
                                <Link href="/login" onClick={() => killToken()}>Logout</Link>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Container>
        </Box>
    );
}
export default Navbar;