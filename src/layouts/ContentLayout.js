import {Container, Box} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
function ContentLayout({children, showNav, containerSize = "container.md"}) {
    return(
        <>
            {
                showNav ? (
                    <Navbar/>
                ) : null 
            }
            <Box mt="90px">
                <Container maxW={{base: "100%", md: containerSize}} display="flex" flexDir="column" alignItems="center" zIndex="2" mb={6}>
                    {children}
                </Container>
            </Box>
        </>
    );
}

export default ContentLayout;