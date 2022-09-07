import {Box, Heading, Container, Text, Flex, Image, Menu, IconButton, useColorModeValue, MenuButton, MenuList, MenuItem} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import styled from "@emotion/styled";
import ModeToggleButton from "./darkModeToggler";
import { Navigate, NavLink } from "react-router-dom";
import {useEffect, useState} from "react";

const Link = styled.a`
        width: 100%;
        font-weight: 300;
    `;

function MenuLink({to, title, onClick}) {
    return(
        <MenuItem w="100%">
            <Link as={NavLink} to={to} onClick={onClick}>{title}</Link>
        </MenuItem>
    );
}

function Navbar(){
    const bg = useColorModeValue('white', '#181818');
    const [redirect, setRedirect] = useState(false);
    const authUser = JSON.parse(atob(localStorage.getItem("token")?.split(".")[1]));

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
                minW="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <ModeToggleButton/>
                <NavLink to="/home/all"><Heading fontSize="2xl" fontWeight="500">entries</Heading></NavLink>
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
                            <MenuLink to="/home/all" title="Home"/>
                            {/* <MenuLink to={"/profile/" + authUser.id} title="Profile"/> */}
                            {/* <MenuLink to="javascript:void(0)" title="Settings"/> */}
                            <MenuLink to="/login" onClick={() => killToken()} title="Logout"/>
                        </MenuList>
                    </Menu>
                </Box>
            </Container>
        </Box>
    );
}


export default Navbar;