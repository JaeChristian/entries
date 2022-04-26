import {Modal, ModalOverlay, ModalContent, Box, Heading, Text, Textarea, Button, useColorModeValue} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios"

function EntryModal({entry, isOpen, onOpen, onClose, updateEntries}) {
    const [TitleTextHeight, setTitleTextHeight] = useState("40px");
    const [BodyTextHeight, setBodyTextHeight] = useState("200px");
    const [title, setTitle] = useState(entry.title);
    const [body, setBody] = useState(entry.body);

    const entriesApi = axios.create({
        baseURL: "/entries"
    });

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
        console.log(scHeight);
        if(e?.target.value === ""){
            setBodyTextHeight("200px");
        } else {
            setBodyTextHeight(scHeight + "px");
        }
        console.log(TitleTextHeight, "state");
        console.log(e.target.value);
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
                bg="rgb(31,31,31)" 
                minW={{base: "95%", md: "700px"}}
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
                        />
                    <Box align="right">
                        <Button 
                            type="submit"
                            height="30px" 
                            bg={useColorModeValue('#f0e7db', '#1a1a1a')}
                            _hover={{backgroundColor: "whiteAlpha.100"}}
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