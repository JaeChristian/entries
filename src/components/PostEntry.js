import { Box, Textarea, useDisclosure, Collapse, Button, Text, useColorModeValue, IconButton, Icon} from "@chakra-ui/react";
import { useState, useRef, useEffect} from "react";
import EntriesContainer from "./EntriesContainer";
import axios from "axios";
import { MdImage } from "react-icons/md"
import { AddIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { API_URL } from "../libs/URLhandler";

function PostEntry({showAll, categoryUpdater}){
    const entriesApi = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: `${API_URL}/entries`
    });

    const [bodyTextHeight, setBodyTextHeight] = useState("40px");
    const [titleTextHeight, setTitleTextHeight] = useState("40px");
    const input2Focus = useRef(null);
    const input1Focus = useRef(null);
    const [entryTitle, setEntryTitle] = useState("");
    const [entryBody, setEntryBody] = useState("");
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSource, setPreviewSource] = useState();
    const [entryChange, setEntryChange] = useState(0);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const {categoryId} = useParams();

    // Collapses the post component.
    function handleFocus(e) {
        if(input1Focus.current !== document.activeElement && input2Focus.current !== document.activeElement && entryTitle === "" && entryBody === ""){
            onClose();
        }
        //console.log(input1Focus.current + " " + document.activeElement);
    }

    // Updates the entryBody state variable and adjusts height.
    function handleEntryBodyChange(e) {
        let scHeight = e.target.scrollHeight;
        if(e?.target.value === ""){
            setBodyTextHeight("40px");
        } else {
            setBodyTextHeight(scHeight + "px");
        }
        setEntryBody(e.target.value);
    }

    // Updates the entryTitle state variable and adjusts height.
    function handleEntryTitleChange(e) {
        let scHeight = e.target.scrollHeight;
        if(e.target.value === ""){
            setTitleTextHeight("40px");
        } else {
            setTitleTextHeight(scHeight + "px");
        }
        setEntryTitle(e.target.value);
    }

    // Updates selectedFile and calls previewFile.
    function handleFileInputChange(e) {
        const file = e.target.files[0];
        previewFile(file)
        setSelectedFile(file);
    }

    // Uses FileReader to get the image from the file and sets it to previewSource
    function previewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    // TODO
    // Sends post request to the image upload endpoint.
    // function uploadImage(image){
    //     console.log(image, "image");
    //     //
    // }

    // Updates entries by updating the entryChange state variable (used in useEffect).
    function updateEntries() {
        setEntryChange(entryChange+1);
    }

    // Clears the entry title, body, and image.
    function clearText() {
        setEntryTitle("");
        setEntryBody("");
        setBodyTextHeight("40px");
        setTitleTextHeight("40px");
        setPreviewSource(null);
    }

    // Uploads new entry.
    function onSubmit(e){
        // JSON object holding the entry title and body
        const newEntry = {
            title: entryTitle,
            body: entryBody
        }
        if(showAll === false) {
            newEntry.categoryId = categoryId;
        }
        // If selectedFile is not null then upload the image
        if(selectedFile){
            newEntry.image = previewSource;
        }

        // Sends post request to the API with newEntry data
        entriesApi.post("/", newEntry).then((res) => 
            {
                console.log(res.data);
                clearText();
                updateEntries();
            }
        );
        console.log(newEntry, "new post");
    }

    useEffect(()=>{
        updateEntries();
        console.log("updating categories after delete");
    },[categoryUpdater])

    return (
        <>
            <Box w="100%" onFocus={onOpen} border="1px solid" borderColor={useColorModeValue("blackAlpha.300", "rgba(255,255,255,0.3)")} borderRadius="0.4rem" onMouseOver={(e) => handleFocus(e)}>
                {previewSource && (
                    <img src={previewSource} alt="chosen"/>
                )}
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
                        <Box
                            display="flex"
                            justifyContent="space-between" 
                            p={2}   
                        >
                            <Box>
                                <label htmlFor="upload">
                                    <Box 
                                        borderRadius="xl"
                                        _hover={{backgroundColor: useColorModeValue("blackAlpha.100", "whiteAlpha.100"), cursor: "pointer"}}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        p={2}
                                    >
                                    <Icon
                                        as={MdImage}
                                        color={useColorModeValue("blackAlpha.500", "whiteAlpha.300")}
                                    />
                                    </Box>
                                </label>
                                <input 
                                    type="file" 
                                    name="image" 
                                    id="upload"
                                    onChange={handleFileInputChange}
                                />
                            </Box>
                            <Box>
                                <Button 
                                    onClick={(e) => clearText(e)} 
                                    height="30px"
                                    mr={4}
                                    variant="link"
                                >
                                    <Text fontWeight="400">Clear</Text>
                                </Button>
                                <Button 
                                    onClick={(e) => onSubmit(e)} 
                                    height="30px" 
                                    variant={useColorModeValue("solid", "outline")}
                                    borderColor="green.200"
                                    color={useColorModeValue(null, "green.200")}
                                    bg={useColorModeValue("gray.200")}
                                    _hover={useColorModeValue({bg: "gray.300"})}
                                >
                                    <Text fontWeight="400">Done</Text>
                                </Button>
                            </Box>
                        </Box>
                    </Collapse>
                </form>
            </Box>
            <EntriesContainer entryChange={entryChange} updateEntries={updateEntries} showAll={showAll} categoryUpdater={categoryUpdater}/>
        </>
    );
}
export default PostEntry;