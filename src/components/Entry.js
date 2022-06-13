import {Box, Text, Heading, useDisclosure, useColorModeValue, useColorMode, Image} from "@chakra-ui/react";
import axios from "axios";
import EntryModal from "./EntryModal";
import { useEffect, useState, useRef} from "react";
import EntryOptions from "./EntryOptions";
import DisplayCategory from "./DisplayCategory";

function Entry({entry, updateEntries, categories, updateCategories}){
    // Colors
    const gray = useColorModeValue("#EAEAEA", "#1e1e1e");
    const red = useColorModeValue("red.300", "red.700");
    const orange = useColorModeValue("orange.300", "orange.600");
    const yellow = useColorModeValue("rgb(252,186,6)", "yellow.600");
    const teal = useColorModeValue("teal.200", "teal.600");
    const green = useColorModeValue("green.200", "green.600");
    const blue = useColorModeValue("blue.100", "blue.700");
    const cyan = useColorModeValue("cyan.100", "cyan.800");
    const purple = useColorModeValue("purple.200", "purple.800");
    const pink = useColorModeValue("pink.200", "pink.900");
    const brown = useColorModeValue("rgb(230,201,168)", "rgb(76,57,50)");

    const {colorMode, toggleColorMode} = useColorMode();

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

    // Disclosure hook for entry options popup
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [bg, setBg] = useState();

    // Disclosure hook for entry modal
    const {
            isOpen: isOpenModal,
            onOpen: onOpenModal,
            onClose: onCloseModal,
    } = useDisclosure();

    const [categoryName, setCategoryName] = useState(null);

    useEffect(()=>{
        if(entry.color === "gray" || null) {
            setBg(gray);
        }
        if(entry.color === "red") {
            setBg(red);
        }
        if(entry.color === "orange") {
            setBg(orange);
        }
        if(entry.color === "yellow") {
            setBg(yellow);
        }
        if(entry.color === "teal") {
            setBg(teal);
        }
        if(entry.color === "green") {
            setBg(green);
        }
        if(entry.color === "blue") {
            setBg(cyan);
        }
        if(entry.color === "cyan") {
            setBg(cyan);
        }
        if(entry.color === "purple") {
            setBg(purple);
        }
        if(entry.color === "pink") {
            setBg(pink);
        }
        if(entry.color === "brown") {
            setBg(brown);
        }
    }, [entry, colorMode]);

    useEffect(()=>{
        const fetchCategoryName = () => {
            if(entry.categoryId !== "") {
                categoriesAPI.get("/" + entry.categoryId).then((res) => {
                    setCategoryName(res.data.name);
                });
            } else {
                setCategoryName("");
            }
        }
       fetchCategoryName();
    },[entry, categoriesAPI]);

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
                {entry.imageURL && (<Image src={entry.imageURL} borderTopRadius="0.4rem" maxH="500px" w="100%" objectFit="cover"/>)}
                
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
                mb={2}
            >
                <EntryOptions isOpen={isOpen} deletePost={deletePost} entry={entry} categories={categories} updateEntries={updateEntries} updateCategories={updateCategories}/>
                <Text fontSize="xs" align="right" justifySelf="flex-end" mr={4}>{dateToString}</Text>
            </Box>
            <EntryModal bg={bg} categoryName={categoryName} dateToString={dateToString} entry={entry} isOpen={isOpenModal} onOpen={onOpenModal} onClose={onCloseModal} deletePost={deletePost} categories={categories} updateEntries={updateEntries} updateCategories={updateCategories}/>
        </Box>
    );
}
export default Entry;