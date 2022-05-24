import {Box, Text, Heading, IconButton, Icon, useDisclosure, Fade, Textarea, useColorModeValue, Image} from "@chakra-ui/react";
import axios from "axios";
import {DeleteIcon} from "@chakra-ui/icons";
import EntryModal from "./EntryModal";
import CategoryMenu from "./CategoryMenu";
import { useEffect, useState } from "react";
import EntryOptions from "./EntryOptions";
import DisplayCategory from "./DisplayCategory";

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

    const bg = useColorModeValue("#EAEAEA", "#1e1e1e");

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
            onMouseEnter={onOpen} 
            onMouseLeave={onClose}
            onFocus={onOpen}
        >
            
            <Box
                _hover={{cursor: "pointer"}} 
                onClick={onOpenModal}  
                display="flex"
                flexDir="column"
                gap={2}
            >
                {entry.imageURL && (<Image src={entry.imageURL} maxH="500px" w="100%" objectFit="cover"/>)}
                
                <Heading 
                    fontSize="lg" 
                    fontWeight="500" 
                    p={4} 
                    pb={0}
                >
                    {entry.title}
                </Heading>
                <Box
                    maxH={{base: "500px", md: "800px"}}
                    overflowY="auto" 
                    className="entry" 
                    borderRadius="0.2rem"
                    mr={1}
                    ml={4}
                >
                    <Box fontSize="16px" whiteSpace="pre-wrap">{entry.body}</Box>
                </Box>
            </Box>
            { categoryName && (
                <DisplayCategory categoryName={categoryName}/>
            )}
            <Box 
                pl={1.5}
                display="flex" 
                justifyContent="space-between" 
                alignItems="center"
            >
                <EntryOptions isOpen={isOpen} deletePost={deletePost} entry={entry} categories={categories} updateEntries={updateEntries} updateCategories={updateCategories}/>
                <Text fontSize="xs" align="right" justifySelf="flex-end" mr={4}>{dateToString}</Text>
            </Box>
            <EntryModal categoryName={categoryName} dateToString={dateToString} entry={entry} isOpen={isOpenModal} onOpen={onOpenModal} onClose={onCloseModal} deletePost={deletePost} categories={categories} updateEntries={updateEntries} updateCategories={updateCategories}/>
        </Box>
    );
}
export default Entry;