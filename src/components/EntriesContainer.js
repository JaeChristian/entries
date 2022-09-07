import {Flex, Grid, IconButton, Link, useColorModeValue, Icon} from "@chakra-ui/react"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../libs/URLhandler";
import Entry from "./Entry";
import {MdGridView, MdViewAgenda} from "react-icons/md"

function EntriesContainer({entryChange, updateEntries, categories, updateCategories, showAll}) {
    const [entries, setEntries] = useState([]);
    const [isGrid, setIsGrid] = useState(false);
    // Decrypted JWT token
    const authUser = JSON.parse(atob(localStorage.getItem("token")?.split(".")[1]));

    // Endpoint for entries
    const entriesApi = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: `${API_URL}/entries`
    });

    // Endpoint for categories
    const categoriesApi = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: `${API_URL}/categories`
    });

    const {categoryId} = useParams();

    function getEntries() {
        if(showAll){
            //console.log("Getting all posts");
            entriesApi.get("/user/" + authUser.id).then((res)=>{
                let newEntries = res.data;
                newEntries = newEntries.slice()
                setEntries(newEntries);
            }).catch((err)=>{
                console.log(err.response.data.message);
            });
        } else {
            //console.log("Getting filtered posts");
            categoriesApi.get("/category/" + categoryId).then((res)=>{
                let newEntries = res.data;
                newEntries = newEntries.slice()
                setEntries(newEntries);
            }).catch((err)=>{
                console.log(err.response.data.message);
            })
            
        }
    }

    useEffect(()=>{
        getEntries();
        //fetchCategories();
    },[entryChange, categoryId]);


    return(
        <>
            <Flex gap={2} mt={2} justifyContent="flex-end" w="100%" alignItems="center">
                <IconButton
                    icon={<Icon as={MdViewAgenda}/>}
                    bg="none" 
                    borderRadius="xl" 
                    size="sm"
                    color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
                    _hover={{backgroundColor: useColorModeValue("blackAlpha.100", "whiteAlpha.100")}}
                    _focus={{}}
                    onClick={()=>setIsGrid(false)}
                />
                <IconButton
                    icon={<Icon as={MdGridView}/>}
                    bg="none" 
                    borderRadius="xl" 
                    size="sm"
                    color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
                    _hover={{backgroundColor: useColorModeValue("blackAlpha.100", "whiteAlpha.100")}}
                    _focus={{}}
                    onClick={()=>setIsGrid(true)}
                />
            </Flex>
            
            {!isGrid ? 
                <Flex mt={2} width="100%" flexDir="column" gap={4}>
                    {entries.map((entry) => {
                        return (
                            <div key={entry._id}>
                                <Entry entry={entry} updateEntries={updateEntries} categories={categories} updateCategories={updateCategories}/>
                            </div>
                        )
                    })}
                </Flex>
                : 
                <Grid gridTemplateColumns="repeat(2, 1fr)" gap={3} justifyContent="center" mt={2}>
                    {entries.map((entry)=>{
                        return(
                            <Entry entry={entry} updateEntries={updateEntries} categories={categories} updateCategories={updateCategories} entryHeight="400"/>
                        )
                    })}
                </Grid>
            }
            
        </>
        
        
    )
}
export default EntriesContainer;