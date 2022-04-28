import {Box, Text, Heading, IconButton, Icon, useDisclosure, Fade, Textarea, useColorModeValue} from "@chakra-ui/react";
import axios from "axios";
import {DeleteIcon} from "@chakra-ui/icons";
import EntryModal from "./EntryModal";

function Entry({entry, updateEntries}){
    const entriesApi = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/entries"
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

    const bg = useColorModeValue("#EAEAEA", "rgba(51,51,51,0.4)");

    // Disclosure hook for entry option
    const {isOpen, onOpen, onClose} = useDisclosure();

    // Disclosure hook for entry modal
    const {
            isOpen: isOpenModal,
            onOpen: onOpenModal,
            onClose: onCloseModal,
    } = useDisclosure();

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
            onMouseOver={onOpen} 
            onMouseOut={onClose}
        >
            <Box
                _hover={{cursor: "pointer"}} 
                onClick={onOpenModal}  
                display="flex"
                flexDir="column"
                gap={2}
            >
                <Heading 
                    fontSize="lg" 
                    fontWeight="500" 
                    p={4} 
                    pb={0}
                >
                    {entry.title}
                </Heading>
                <Box
                    maxH="800px" 
                    overflowY="auto" 
                    className="entry" 
                    borderRadius="0.2rem"
                    mr={1}
                    ml={4}
                >
                    <Box fontSize="md" fontWeight="400" whiteSpace="pre-wrap">{entry.body}</Box>
                </Box>
            </Box>
            <Box 
                p={4} 
                pt={0} 
                pl={1.5}
                display="flex" 
                justifyContent="space-between" 
                alignItems="center"
            >
                <Fade in={isOpen}>
                    <IconButton 
                        icon={<DeleteIcon/>} 
                        bg="none" 
                        borderRadius="xl" 
                        size="sm"
                        color={useColorModeValue("blackAlpha.500", "whiteAlpha.300")}
                        _hover={{backgroundColor: useColorModeValue("blackAlpha.100", "whiteAlpha.100")}}
                        onClick={() => deletePost()}
                    />
                </Fade>
                <Text fontSize="xs" align="right">{dateToString}</Text>
            </Box>
            <EntryModal entry={entry} isOpen={isOpenModal} onOpen={onOpenModal} onClose={onCloseModal} updateEntries={updateEntries}/>
        </Box>
    );
}
export default Entry;