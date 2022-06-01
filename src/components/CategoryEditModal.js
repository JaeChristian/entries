import {Box, Flex, Icon, Link, Modal, ModalContent, ModalOverlay, useDisclosure, useColorModeValue, Text, Input} from "@chakra-ui/react"
import {MdEdit} from "react-icons/md"
import {HamburgerIcon} from "@chakra-ui/icons"
import {useState} from "react"

function CategoryEditModal({categories}) {
    const [categoryName, setCategoryName] = useState("");
    const {isOpen, onOpen, onClose} = useDisclosure();
    const bg = useColorModeValue("white", "#1a1a1a");
    const hover = useColorModeValue("#edf2f6", "#282828")
    
    // Sends new category information to endpoint
    function submitNewCategory(e){
        e.preventDefault();
    }
    return(
        <>
            <Box p={2}><Icon as={MdEdit}/> <Link onClick={onOpen}>Edit Labels</Link></Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent w="300px">
                    <Flex 
                        flexDir="column" 
                        bg={bg}
                        borderRadius="0.2rem"
                        pt={1.5}
                        pb={1.5}
                    >
                        <Box display="flex" justifyContent="center" minW="100%" p={2}>
                            <form onSubmit={submitNewCategory} id="categoryForm">
                                <Input 
                                    type="text" 
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    value={categoryName}
                                    placeholder="Create a label"
                                    fontSize="sm"
                                    variant="flushed"
                                    _focus={{}}
                                />
                            </form>
                        </Box>
                        {categories.map((category)=>{
                            return(
                                <Box 
                                    p={2}
                                    _hover={{background: hover, cursor: "pointer"}}
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                ><HamburgerIcon/> <Text fontSize="sm">{category.name}</Text></Box>
                            );
                        })}
                    </Flex>
                </ModalContent>
            </Modal>
        </>
    );
}
export default CategoryEditModal;