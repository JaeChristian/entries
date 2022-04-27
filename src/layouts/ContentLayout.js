import {Container, Box} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
function ContentLayout({children, showNav}) {
    return(
        <>
            {
                showNav ? (
                    <Navbar/>
                ) : null 
            }
            <Box mt={{base: "75px", md: "80px"}}>
                <Container maxW={{base: "100%", md: "container.sm"}} display="flex" flexDir="column" alignItems="center" zIndex="2" mb={6}>
                    {children}
                </Container>
            </Box>
        </>
    );
}

export default ContentLayout;