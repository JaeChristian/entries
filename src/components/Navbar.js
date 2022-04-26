import {Box, Heading, Container, Text, Flex, Image, Menu, IconButton, useColorModeValue, MenuButton, MenuList, MenuItem} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import styled from "@emotion/styled";

function Navbar(){
    const bg = useColorModeValue('#f0e7db', '#1a1a1a');
    const Link = styled.a`
        width: 100%;
        font-weight: 300;
    `;
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
                minW={{base: "100%", md: "container.md"}}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box display="inline-block">
                        <Menu>
                            <MenuButton
                                userSelect="none"
                                opacity={0}
                                as={IconButton}
                                icon={<HamburgerIcon/>}
                                variant="outline"
                                _focus={{borderColor: "whiteAlpha.400"}}
                            />
                        </Menu>
                </Box>
                <Heading fontSize="2xl" fontWeight="500">entries</Heading>
                <Box display="inline-block">
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            icon={<HamburgerIcon/>}
                            variant="outline"
                            _focus={{borderColor: "whiteAlpha.400"}}
                        />
                        <MenuList bg="#1a1a1a">
                            <MenuItem w="100%">
                                <Link href="javascript:void(0)">Home</Link>
                            </MenuItem>
                            <MenuItem w="100%">
                                <Link href="javascript:void(0)">Settings</Link>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Container>
        </Box>
    );
}
export default Navbar;