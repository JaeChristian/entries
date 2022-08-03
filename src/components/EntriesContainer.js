import {Flex} from "@chakra-ui/react"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../libs/URLhandler";
import Entry from "./Entry";

function EntriesContainer({entryChange, updateEntries, categories, updateCategories, showAll}) {
    const [entries, setEntries] = useState([]);

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
        <Flex mt={4} width="100%" flexDir="column" gap={4}>
            {entries.map((entry) => {
                return (
                    <div key={entry._id}>
                        <Entry entry={entry} updateEntries={updateEntries} categories={categories} updateCategories={updateCategories}/>
                    </div>
                )
            })}
        </Flex>
    )
}
export default EntriesContainer;