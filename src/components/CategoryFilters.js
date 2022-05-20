import {Box} from "@chakra-ui/react";
import {StarIcon, ChevronRightIcon} from "@chakra-ui/icons";

function CategoryFilter({categories}) {
    return(
        <Box ml={4} w="300px" position="absolute" left="0" display={{base: "none", md: "flex"}} flexDir="column" gap={2}>
            <Box p={2}><StarIcon/> Entries</Box>
            {
                categories.map((category)=>{
                    return(
                        <div key={category._id}>
                            <Box p={2}><ChevronRightIcon/>{category.name}</Box>
                        </div>
                    );
                })
            }
        </Box>
    );
}
export default CategoryFilter