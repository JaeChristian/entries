import {Box, Text} from "@chakra-ui/react"

function DisplayCategory({categoryName, mr=3}){
    return(
            <Box display="flex" mt={4} justifyContent="flex-end">
                <Text 
                    maxW="auto"
                    ml={3}
                    mr={mr}
                    fontSize="xs"
                    p="3px"
                    pr={3}
                    pl={3}
                    bg="rgba(0,0,0,0.08)"
                    borderRadius="full"
                    minW="40px"
                    align="center"
                    fontWeight="500"
                >
                    {categoryName}
                </Text>
            </Box>
        )
}
export default DisplayCategory;