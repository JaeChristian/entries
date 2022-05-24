import {useColorModeValue, Fade, IconButton} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import CategoryMenu from "./CategoryMenu";

function EntryOptions({isOpen, deletePost, entry, categories, updateEntries, updateCategories}) {
    return(
        <Fade in={isOpen}>
            <IconButton 
                icon={<DeleteIcon/>} 
                bg="none" 
                borderRadius="xl" 
                size="sm"
                color={useColorModeValue("blackAlpha.500", "whiteAlpha.300")}
                _hover={{backgroundColor: useColorModeValue("blackAlpha.100", "whiteAlpha.100")}}
                onClick={() => deletePost()}
            />
            <CategoryMenu entry={entry} categories={categories} updateEntries={updateEntries} updateCategories={updateCategories}/>
        </Fade>
    );
}
export default EntryOptions;