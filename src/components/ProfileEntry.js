import { GridItem, Box, Text, useColorModeValue, Image, useColorMode, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DisplayCategory from "./DisplayCategory";
import axios from "axios"

function ProfileEntry({entry}) {
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

    const [bg, setBg] = useState(gray);
    const [categoryName, setCategoryName] = useState("");

    const {colorMode, toggleColorMode} = useColorMode();

    const categoriesAPI = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/categories"
    });

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
    
    return(
        <GridItem 
            key={entry._id} 
            w="100%" 
            bg={bg}
            borderRadius="0.2rem"
            display="flex"
            flexDirection="column"
            maxH={400}
        >
            {entry.imageURL && (<Image borderTopRadius="0.2rem" src={entry.imageURL} maxH="500px" w="100%" objectFit="cover"/>)}
            <Heading
                    fontSize="md" 
                    fontWeight="500"
                    p={4}
                    pb={2}
                >
                    {entry.title}
                </Heading>
            {entry.body && 
                <Box
                    p={4}
                    pt={0} 
                    overflowY="auto" 
                >
                    <Box fontSize="16px" whiteSpace="pre-wrap">{entry.body}</Box>
                </Box>
            }
            <Box p={4} pt={0} pr={0} marginTop="auto">
                <DisplayCategory categoryName={categoryName}/>
            </Box>
            
        </GridItem>
    );
}
export default ProfileEntry;