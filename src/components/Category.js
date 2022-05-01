import {MenuItem, Text} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons"

function Category({category, setCategory}) {
    return(
        <MenuItem w="100%" display="flex" gap={2} onClick={(e) => setCategory(category._id)}>
            <HamburgerIcon/>
            <Text fontSize="sm">{category.name}</Text>
        </MenuItem>
    );
}
export default Category;