import {Box, Grid, Text, Heading, GridItem} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileEntry from "./ProfileEntry";

function ProfileEntries() {
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

     useEffect(()=>{
        entriesApi.get("/user/" + authUser.id).then((res)=>{
            setEntries(res.data);
            console.log("Entries collected");
        }).catch((err)=>{
            console.error(err);
        });
     },[]);
     
    return(
        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={3} justifyContent="center">
            {entries.map((entry)=>{
                return(
                    <ProfileEntry entry={entry}/>
                )
            })}
        </Grid>
    );
}
export default ProfileEntries;