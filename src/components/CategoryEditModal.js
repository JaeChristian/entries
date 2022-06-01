import {Box, Flex, Icon, Link, Modal, ModalContent, ModalOverlay, useDisclosure, useColorModeValue, Text, Input, Fade, IconButton} from "@chakra-ui/react"
import {MdEdit} from "react-icons/md"
import {HamburgerIcon, DeleteIcon} from "@chakra-ui/icons"
import {useState} from "react"
import axios from "axios";

function Category({category}) {
    const {
        isOpen: isOpenFade,
        onOpen: onOpenFade,
        onClose: onCloseFade
    } = useDisclosure();

    const hover = useColorModeValue("#edf2f6", "#282828")

    return(
        <Box 
            p={2}
            _hover={{background: hover, cursor: "pointer"}}
            onMouseEnter={onOpenFade}
            onMouseLeave={onCloseFade}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
        >
            <Flex
                alignItems="center"
                gap={2}
            >
                <HamburgerIcon/> <Text fontSize="sm">{category.name}</Text>
            </Flex>
                <Fade in={isOpenFade}>
                    <IconButton
                        icon={<DeleteIcon/>}
                        bg="none"
                        borderRadius="xl" 
                        size="sm"
                        color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
                    />
                </Fade>
        </Box>
    );
}

function CategoryEditModal({categories, fetchCategories}) {
    const [categoryName, setCategoryName] = useState("");
    const {isOpen, onOpen, onClose} = useDisclosure();
    const bg = useColorModeValue("white", "#1a1a1a");

    // Endpoint for categories
    const categoriesAPI = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/categories"
    });

    // Sends new category information to endpoint
    function submitNewCategory(e) {
        e.preventDefault();
        const newCategory = {
            name: categoryName
        }
        
        categoriesAPI.post("/", newCategory).then((res)=> {
            fetchCategories();
            setCategoryName("");
        }).catch((err)=>{
            console.error(err);
        });
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
                        <Box display="flex" justifyContent="center" minW="100%" pl={2} pr={2}>
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
                                <Category category={category}/>
                            );
                        })}
                    </Flex>
                </ModalContent>
            </Modal>
        </>
    );
}
export default CategoryEditModal;