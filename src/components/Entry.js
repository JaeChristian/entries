import {Box, Text, Heading, IconButton, Icon, useDisclosure, Fade, Textarea, useColorModeValue} from "@chakra-ui/react";
import axios from "axios";
import {DeleteIcon} from "@chakra-ui/icons";
import EntryModal from "./EntryModal";
import CategoryMenu from "./CategoryMenu";
import { useEffect, useState } from "react";

function Entry({entry, updateEntries, categories, updateCategories}){
    const entriesApi = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/entries"
    });

    const categoriesAPI = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/categories"
    });

    // Needed to turn date to string
    const months = 
    [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    const date = new Date(entry.date);
    const year = date.getFullYear();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const dateToString = `${month} ${day}, ${year}`;

    const bg = useColorModeValue("#EAEAEA", "rgba(51,51,51,0.4)");

    // Disclosure hook for entry options popup
    const {isOpen, onOpen, onClose} = useDisclosure();

    // Disclosure hook for entry modal
    const {
            isOpen: isOpenModal,
            onOpen: onOpenModal,
            onClose: onCloseModal,
    } = useDisclosure();

    const [categoryName, setCategoryName] = useState(null);

    useEffect(()=>{
       fetchCategoryName();
    },[entry]);

    function fetchCategoryName() {
        if(entry.categoryId !== "") {
            categoriesAPI.get("/" + entry.categoryId).then((res) => {
                setCategoryName(res.data.name);
            });
        } else {
            setCategoryName("");
        }
    }

    function deletePost() {
        entriesApi.delete("/" + entry._id).then((res)=>{
            console.log(res.data);
            updateEntries();
        }).catch((err)=>{
            console.error(err.response.data.message);
        });
    }

    return(
        <Box 
            bg={bg} 
            borderRadius="0.4rem" 
            display="flex" 
            flexDir="column" 
            gap={2} 
            onMouseOver={onOpen} 
            onMouseOut={onClose}
            onFocus={onOpen}
        >
            <Box
                _hover={{cursor: "pointer"}} 
                onClick={onOpenModal}  
                display="flex"
                flexDir="column"
                gap={2}
            >
                <Heading 
                    fontSize="lg" 
                    fontWeight="500" 
                    p={4} 
                    pb={0}
                >
                    {entry.title}
                </Heading>
                <Box
                    maxH="800px" 
                    overflowY="auto" 
                    className="entry" 
                    borderRadius="0.2rem"
                    mr={1}
                    ml={4}
                >
                    <Box fontSize="md" fontWeight="400" whiteSpace="pre-wrap">{entry.body}</Box>
                </Box>
            </Box>
            <Box display="flex" mt={4} justifyContent="flex-end">
                { categoryName ? (
                    
                        <Text 
                            maxW="auto"
                            ml={3}
                            mr={3}
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
                ) : null}
                
            </Box>
            <Box 
                pl={1.5}
                display="flex" 
                justifyContent="space-between" 
                alignItems="center"
            >
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
                <Text fontSize="xs" align="right" justifySelf="flex-end" mr={4}>{dateToString}</Text>
            </Box>
            <EntryModal entry={entry} isOpen={isOpenModal} onOpen={onOpenModal} onClose={onCloseModal} updateEntries={updateEntries}/>
        </Box>
    );
}
export default Entry;