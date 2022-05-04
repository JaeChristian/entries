import {Flex} from "@chakra-ui/react"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Entry from "./Entry";

function EntriesContainer({handleFocus, entryChange, updateEntries}) {
    const [entries, setEntries] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryChange, setCategoryChange] = useState(0);

    // Decrypted JWT token
    const authUser = JSON.parse(atob(localStorage.getItem("token")?.split(".")[1]));

    // Endpoint for categories
    const categoriesAPI = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/categories"
    });

    // Endpoint for entries
    const entriesApi = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/entries"
    });

    function fetchCategories() {
        categoriesAPI.get("/user/" + authUser.id).then((res) => {
            setCategories(res.data);
        }).catch((err) => {
            console.error(err.response.data.message);
        })
    }

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

    function updateCategories() {
        setCategoryChange(categoryChange + 1);
    }

    useEffect(()=>{
        getEntries();
        fetchCategories();
    },[entryChange]);

    useEffect(()=>{
        fetchCategories();
    }, [categoryChange]);

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