import {Box, Flex, Icon, Link, Modal, ModalContent, ModalOverlay, useDisclosure, useColorModeValue, Text, Input, Fade, IconButton} from "@chakra-ui/react"
import {MdEdit} from "react-icons/md"
import {HamburgerIcon, DeleteIcon, CheckIcon} from "@chakra-ui/icons"
import {useState} from "react"
import axios from "axios";

function Category({category, fetchCategories, updateCategories}) {
    const {
        isOpen: isOpenFade,
        onOpen: onOpenFade,
        onClose: onCloseFade
    } = useDisclosure();

    const hover = useColorModeValue("#edf2f6", "#282828")
    const iconColor = useColorModeValue("blackAlpha.500", "whiteAlpha.500");
    const [isEdit, setIsEdit] = useState(false);
    const [editedCat, setEditedCat] = useState("");
    const [isOnDelete, setIsOnDelete] = useState(false);

    // Endpoint for categories
    const categoriesAPI = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/categories"
    });

    function handleEditChange(e) {
        setEditedCat(e.target.value);
    }

    function onEdit(){
        if(isOnDelete) {
            return console.log("bomboclat");
        }
        setIsEdit(true);
        setEditedCat(category.name);
    }

    function deleteCategory(e) {
        categoriesAPI.delete("/" + category._id).then((res)=>{
            updateCategories();
            fetchCategories();
            console.log(res.data);
        }).catch((err)=>{
            console.error(err)
        });
    }

    function editCategory(e) {
        e.preventDefault();
        const newCategory = {
            name: editedCat
        }

        categoriesAPI.patch("/" + category._id, newCategory).then((res)=>{
            updateCategories();
            fetchCategories();
            setIsEdit(false);
            console.log(res.data);
        }).catch((err)=>{
            setIsEdit(false);
            setEditedCat(category.name);
            console.error(err)
        });
    }

    return(
        <form id="categoryForm" onSubmit={(e)=>editCategory(e)}>
            <Box 
                p={2}
                _hover={{background: hover, cursor: "pointer"}}
                onMouseEnter={onOpenFade}
                onMouseLeave={onCloseFade}
                onClick={()=>onEdit()}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
            >
                <Flex
                    alignItems="center"
                    gap={2}
                >
                    <HamburgerIcon/> 
                    {
                        !isEdit ? 
                            <>
                                <Text fontSize="sm">{category.name}</Text>
                            </> : 
                            <>
                                <Input 
                                    type="text" 
                                    value={editedCat}
                                    placeholder="Edit label name"
                                    fontSize="sm"
                                    variant="flushed"
                                    _focus={{}}
                                    defaultValue={editedCat}
                                    onChange={(e)=>handleEditChange(e)}
                                    min={3}
                                />
                            </>
                    }
                    
                </Flex>
                <Fade in={isOpenFade}>
                    <Flex>
                        { isEdit &&
                            <IconButton
                                icon={<CheckIcon/>}
                                bg="none"
                                borderRadius="xl" 
                                size="sm"
                                color={iconColor}
                                _focus={{}}
                                onClick={(e)=>editCategory(e)}
                            /> 
                        }
                        
                        <IconButton
                            icon={<DeleteIcon/>}
                            bg="none"
                            borderRadius="xl" 
                            size="sm"
                            color={iconColor}
                            onClick={(e)=>deleteCategory(e)}
                            _focus={{}}
                            onMouseEnter={()=>setIsOnDelete(true)}
                            onMouseLeave={()=>setIsOnDelete(false)}
                        />
                    </Flex>
                </Fade>
            </Box>
        </form>
    );
}

function CategoryEditModal({categories, fetchCategories, updateCategories}) {
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
            console.log(res.data);
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
                                    required
                                />
                            </form>
                        </Box>
                        {categories.map((category)=>{
                            return(
                                <div key={category._id}>
                                    <Category category={category} fetchCategories={fetchCategories} updateCategories={updateCategories}/>
                                </div>
                            );
                        })}
                    </Flex>
                </ModalContent>
            </Modal>
        </>
    );
}
export default CategoryEditModal;