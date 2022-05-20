import {Flex} from "@chakra-ui/react"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Entry from "./Entry";

function EntriesContainer({handleFocus, entryChange, updateEntries, categories, updateCategories}) {
    const [entries, setEntries] = useState([]);

    // Decrypted JWT token
    const authUser = JSON.parse(atob(localStorage.getItem("token")?.split(".")[1]));

    // Endpoint for entries
    const entriesApi = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/entries"
    });

    function getEntries() {
        console.log("Getting all posts");
        entriesApi.get("/user/" + authUser.id).then((res)=>{
            let newEntries = res.data;
            newEntries = newEntries.slice()
            setEntries(newEntries);
        }).catch((err)=>{
            console.log(err.response.data.message);
        });
    }

    useEffect(()=>{
        getEntries();
        //fetchCategories();
    },[entryChange]);


    return(
        <Flex mt={4} width="100%" flexDir="column" gap={4} onClick={(e) => handleFocus(e)}>
            {entries.slice(0).reverse().map((entry) => {
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