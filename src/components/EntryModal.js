import {Modal, ModalOverlay, ModalContent, Box, Fade, Heading, Text, Textarea, Button, useColorModeValue, Image, useDisclosure, IconButton} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import EntryOptions from "./EntryOptions";
import DisplayCategory from "./DisplayCategory";
import {DeleteIcon} from "@chakra-ui/icons"

function EntryModal({categoryName, dateToString, entry, isOpen, onClose, updateEntries, deletePost, categories, updateCategories}) {
    const entriesApi = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/entries"
    });

    const [TitleTextHeight, setTitleTextHeight] = useState("40px");
    const [BodyTextHeight, setBodyTextHeight] = useState("0px");
    const [title, setTitle] = useState(entry.title);
    const [body, setBody] = useState(entry.body);

    // useCallback used to get the entry body node's scroll height and set it to the modal height
    const entryBodyTextarea = useCallback(node => {
        if(node != null) {
            //console.log(node.scrollHeight, "ref");
            setBodyTextHeight(node.scrollHeight + "px");
        }
    });

    const bg = useColorModeValue("#EAEAEA", "#1e1e1e");

    // Disclosure hook for entry modal
    const {
        isOpen: isOpenOptions,
        onOpen: onOpenOptions,
        onClose: onCloseOptions,
    } = useDisclosure();

    const {
        isOpen: isOpenImage,
        onOpen: onOpenImage,
        onClose: onCloseImage,
    } = useDisclosure();

    // Reset title and body variables when modal is closed
    useEffect(()=>{
        setTitle(entry.title);
        setBody(entry.body);
        setTitleTextHeight("40px");
    }, [isOpen, entry.title, entry.body]);

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

    function deleteImage() {
        const newEntry = {
            imageURL: ""
        }

        entriesApi.patch("/" + entry._id, newEntry).then((res) => {
            console.log(res.data);
            updateEntries();
        }).catch((err) => {
            console.error(err);
        });
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
                minW={{base: "95%", lg: "container.md"}}
                minH="200px"
            >
                {
                    entry.imageURL && (
                        <Box
                            onMouseEnter={onOpenImage}
                            onMouseLeave={onCloseImage}
                            onFocus={onOpenImage}
                        >
                            <Image 
                                src={entry.imageURL} 
                                alt="entry image"
                                maxH="500px"
                                w="100%"
                                objectFit="cover"
                            />
                            <Fade in={isOpenImage}>
                                <IconButton 
                                    icon={<DeleteIcon/>} 
                                    bg="blackAlpha.700" 
                                    borderRadius="xl" 
                                    size="sm"
                                    color={"whiteAlpha.500"}
                                    _hover={{backgroundColor: "black"}}
                                    _focus={{}}
                                    onClick={() => deleteImage()}
                                    position="absolute"
                                    left="96%"
                                    transform="translate(-50%, -128%)"
                                />
                            </Fade>
                        </Box>
                    )
                }
                <Box
                    p={4}
                    onMouseEnter={onOpenOptions} 
                    onMouseLeave={onCloseOptions}
                    onFocus={onOpenOptions}
                >
                    <form onSubmit={onSubmit}>
                        <Heading
                            fontSize="lg"
                            fontWeight="500"
                        >
                            <Textarea
                                resize="none"
                                minH={TitleTextHeight}
                                border="none"
                                _focus={{borderColor: "whiteAlpha.400"}}
                                value={title}
                                fontSize="lg"
                                fontWeight="500"
                                onChange={(e) => handleTitleChange(e)}
                                p={0}
                                placeholder="Title"
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
                            placeholder="Entry"
                            ref={entryBodyTextarea}
                        />
                        <DisplayCategory categoryName={categoryName} mr={0}/>
                        <Box 
                            display="flex" 
                            justifyContent="space-between" 
                            alignItems="center"
                        >
                            <EntryOptions isOpen={isOpenOptions} deletePost={deletePost} entry={entry} categories={categories} updateEntries={updateEntries} updateCategories={updateCategories}/>
                            <Text fontSize="xs" justifySelf="flex-end">{dateToString}</Text>
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