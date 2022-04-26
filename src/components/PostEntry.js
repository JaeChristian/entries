import { Box, shouldForwardProp, Textarea, chakra, useDisclosure, Collapse, Button, Text, useColorModeValue} from "@chakra-ui/react";
import { useState, useRef} from "react";
import {motion} from "framer-motion";
import EntriesContainer from "./EntriesContainer";
import axios from "axios";

const AnimatedDiv = chakra(motion.div, {
    shouldForwardProp: prop=> {
        return shouldForwardProp(prop) || prop === "transition"
    }
});

function PostEntry(){
    const [bodyTextHeight, setBodyTextHeight] = useState("40px");
    const [titleTextHeight, setTitleTextHeight] = useState("40px");
    const input2Focus = useRef(null);
    const input1Focus = useRef(null);
    const [entryTitle, setEntryTitle] = useState("");
    const [entryBody, setEntryBody] = useState("");
    const [entryChange, setEntryChange] = useState(0);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const entriesApi = axios.create({
        baseURL: "/entries"
    });

    function handleFocus(e) {
        if(input1Focus.current !== document.activeElement && input2Focus.current !== document.activeElement && entryTitle === "" && entryBody === ""){
            onClose();
        }
        //console.log(input1Focus.current + " " + document.activeElement);
    }

    function handleEntryBodyChange(e) {
        let scHeight = e.target.scrollHeight;
        if(e?.target.value === ""){
            setBodyTextHeight("40px");
        } else {
            setBodyTextHeight(scHeight + "px");
        }
        setEntryBody(e.target.value);
    }

    function handleEntryTitleChange(e) {
        let scHeight = e.target.scrollHeight;
        console.log(scHeight);
        if(e.target.value === ""){
            setTitleTextHeight("40px");
        } else {
            setTitleTextHeight(scHeight + "px");
        }
        setEntryTitle(e.target.value);
    }

    function onSubmit(e){
        const newEntry = {
            title: entryTitle,
            body: entryBody
        }
        entriesApi.post("/", newEntry).then((res) => 
            {
                console.log(res.data);
                setEntryTitle("");
                setEntryBody("");
                setBodyTextHeight("40px");
                updateEntries();
            }
        );
        console.log(newEntry);
    }

    function updateEntries() {
        setEntryChange(entryChange+1);
    }

    return (
        <>
            <Box w="100%" onFocus={onOpen} border="1px solid rgba(255,255,255,0.3)" borderRadius="0.4rem" onMouseOver={(e) => handleFocus(e)}>
                <form onSubmit={onSubmit}>
                    <Collapse in={isOpen} animateOpacity>
                        <Textarea
                            placeholder="Title"
                            resize="none"
                            minH={titleTextHeight}
                            border="none"
                            _focus={{borderColor: "whiteAlpha.400"}}
                            ref={input1Focus}
                            onChange={(e)=>handleEntryTitleChange(e)}
                            value={entryTitle}
                            transition={{duration: 0.5}}
                        />
                    </Collapse>
                    <Textarea 
                        placeholder="Create an entry."
                        minW="85%"
                        minH={bodyTextHeight}
                        resize="none"
                        fontSize="16px"
                        _focus={{borderColor: "whiteAlpha.400"}}
                        onChange={(e)=>handleEntryBodyChange(e)}
                        border="none"
                        ref={input2Focus}
                        value={entryBody}
                        whiteSpace="pre-wrap"
                        required
                    />
                    <Collapse in={isOpen} animateOpacity>
                        <Box p={2} align="right">
                            <Button 
                                onClick={(e) => onSubmit(e)} 
                                height="30px" 
                                bg={useColorModeValue('#f0e7db', '#1a1a1a')}
                                _hover={{backgroundColor: "whiteAlpha.100"}}
                                borderRadius="0.4rem"
                            >
                                <Text fontWeight="400">Done</Text>
                            </Button>
                        </Box>
                    </Collapse>
                </form>
            </Box>
            <EntriesContainer handleFocus={handleFocus} entryChange={entryChange} updateEntries={updateEntries}/>
        </>
    );
}
export default PostEntry;