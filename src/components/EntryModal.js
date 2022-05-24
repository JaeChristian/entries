import {Modal, ModalOverlay, ModalContent, Box, Heading, Text, Textarea, Button, useColorModeValue} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

function EntryModal({entry, isOpen, onOpen, onClose, updateEntries}) {
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

    const [TitleTextHeight, setTitleTextHeight] = useState("40px");
    const [BodyTextHeight, setBodyTextHeight] = useState("200px");
    const [title, setTitle] = useState(entry.title);
    const [body, setBody] = useState(entry.body);

    const bg = useColorModeValue("#EAEAEA", "#1e1e1e");

    // Reset title and body variables when modal is closed
    useEffect(()=>{
        setTitle(entry.title);
        setBody(entry.body);
    }, [isOpen]);

    function handleTitleChange(e) {
        let scHeight = e.target.scrollHeight;
        if(e?.target.value === ""){
            setTitleTextHeight("40px");
        } else {
            setTitleTextHeight(scHeight + "px");
        }
        setTitle(e.target.value);
    }

    function handleBodyChange(e) {
        let scHeight = e.target.scrollHeight;
        if(e?.target.value === ""){
            setBodyTextHeight("200px");
        } else {
            setBodyTextHeight(scHeight + "px");
        }
        setBody(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        
        const newEntry = {
            title: title,
            body: body
        }

        entriesApi.patch("/" + entry._id, newEntry).then((res) => {
            console.log(res.data);
            updateEntries();
        }).catch((err) => {
            console.error(err);
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent
                bg={bg}
                minW={{base: "95%", lg: "container.lg"}}
                minH="200px"
            >
                <Box
                    p={4}
                >
                    <form onSubmit={onSubmit}>
                        <Heading
                            fontSize="lg"
                            fontWeight="500"
                        >
                            <Textarea
                                resize="none"
                                minH="40px"
                                border="none"
                                _focus={{borderColor: "whiteAlpha.400"}}
                                value={title}
                                fontSize="lg"
                                fontWeight="500"
                                onChange={(e) => handleTitleChange(e)}
                                p={0}
                            />
                        </Heading>
                        <Textarea
                            resize="none"
                            border="none"
                            _focus={{borderColor: "whiteAlpha.400"}}
                            value={body}
                            fontSize="md"
                            fontWeight="400"
                            onChange={(e) => handleBodyChange(e)}
                            minH={BodyTextHeight}
                            p={0}
                            overflowX="hidden"
                        />
                        <Box align="right" mt={2}>
                            <Text fontSize="xs" align="right">{dateToString}</Text>
                        </Box>
                        <Box align="right" mt={2}>
                            <Button 
                                type="submit"
                                height="30px" 
                                bg={useColorModeValue('blackAlpha.200', '#1a1a1a')}
                                _hover={{backgroundColor: useColorModeValue('blackAlpha.300', 'whiteAlpha.100')}}
                                borderRadius="0.4rem"
                                onClick={() =>{
                                    onClose();
                                }}
                            >
                                <Text fontWeight="400">Done</Text>
                            </Button>
                        </Box>
                    </form>
                </Box>
            </ModalContent>
        </Modal>
    );
}
export default EntryModal;