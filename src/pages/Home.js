import {Container, Box, Text, Textarea, Heading} from "@chakra-ui/react";
import PostEntry from "../components/PostEntry";
import EntriesContainer from "../components/EntriesContainer";

function Home() {
    return(
        <Container maxW={{base: "100%", md: "container.sm"}} display="flex" flexDir="column" alignItems="center" zIndex="2" mb={6}>
            <PostEntry/>
            {/* <EntriesContainer/> */}
        </Container>
    );
}
export default Home;