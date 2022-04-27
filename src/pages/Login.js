import {Box, Flex, Text, Heading, Input, Container} from "@chakra-ui/react";

function Login() {
    return(
        <Box mt={{base: 5, md: 8}}>
            <Container maxW={{base: "100%", md: "container.sm"}} display="flex" flexDir="column" alignItems="center" zIndex="2" mb={6}>
                <Box
                    bg="rgba(51,51,51,0.4)"
                    w={{base: "100%",md: "400px"}}
                    align="center"
                    p={6}
                    pl= {{base: 3, md: "40px"}}
                    pr= {{base: 3, md: "40px"}}
                    borderRadius="0.4rem"

                >
                    <Heading fontWeight="500">entries</Heading>
                    <form>
                        <Box 
                            mt={7}
                            display="flex"
                            flexDir="column"
                            gap={2}
                        >
                            <Input
                                placeholder="Username"
                                borderRadius="0.2rem"
                            />
                        </Box>
                    </form>
                </Box>
            </Container>
        </Box>
    );
}

export default Login;