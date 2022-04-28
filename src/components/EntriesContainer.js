import {Flex} from "@chakra-ui/react"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Entry from "./Entry";

function EntriesContainer({handleFocus, entryChange, updateEntries}) {
    const [entries, setEntries] = useState([]);

    const currUser = JSON.parse(atob(localStorage.getItem("token")?.split(".")[1]));

    const entriesApi = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/entries"
    });

    const getEntries = useCallback(()=>{
        console.log("Getting all posts");
        entriesApi.get("/user/" + currUser.id).then((res)=>{
            console.log(res.data);
            setEntries(res.data);
        }).catch((err)=>{
            console.log(err.response.data.message);
        });
    },[]);

    useEffect(()=>{
        getEntries();
    },[getEntries, entryChange]);
    return(
        <Flex mt={4} width="100%" flexDir="column" gap={4} onClick={(e) => handleFocus(e)}>
            {entries.slice(0).reverse().map((entry) => {
                return (
                    <div key={entry._id}>
                        <Entry entry={entry} updateEntries={updateEntries}/>
                    </div>
                )
            })}
        </Flex>
    )
}
export default EntriesContainer;