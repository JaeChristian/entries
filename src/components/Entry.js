import {Box, Text, Heading, IconButton, Icon, useDisclosure, Fade} from "@chakra-ui/react";
import axios from "axios";
import {DeleteIcon} from "@chakra-ui/icons";

function Entry({entry, setEntryChange, entryChange}){
    //Needed to turn date to string
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

    const {isOpen, onOpen, onClose} = useDisclosure();

    const entriesApi = axios.create({
        baseURL: "/entries"
    });

    function deletePost() {
        entriesApi.delete("/" + entry._id).then((res)=>{
            console.log(res.data);
            setEntryChange(entryChange+1);
        }).catch((err)=>{
            console.error(err.message);
        });
    }

    return(
        <Box _hover={{cursor: "pointer"}} bg="rgba(51,51,51,0.4)" borderRadius="0.4rem" display="flex" flexDir="column" gap={2} onMouseOver={onOpen} onMouseOut={onClose}>
            <Heading fontSize="lg" fontWeight="500" p={4} pb={0}>{entry.title}</Heading>
            <Box pr={4} pl={4} maxH="480px" overflowY="auto" className="entry" borderRadius="0.2rem">
                <Text fontSize="md" fontWeight="400">{entry.body}</Text>
            </Box>
            <Box p={4} pt={0} pl={1.5} display="flex" justifyContent="space-between" alignItems="center">
                <Fade in={isOpen}>
                    <IconButton 
                        icon={<DeleteIcon/>} 
                        bg="none" 
                        borderRadius="xl" 
                        size="sm"
                        color="whiteAlpha.300"
                        _hover={{backgroundColor: "whiteAlpha.100"}}
                        onClick={() => deletePost()}
                    />
                </Fade>
                <Text fontSize="xs" align="right">{dateToString}</Text>
            </Box>
        </Box>
    );
}
export default Entry;