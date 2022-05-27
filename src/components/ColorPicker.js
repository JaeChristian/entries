import {Popover, PopoverTrigger, PopoverContent, PopoverBody, IconButton, Icon, Box, useColorModeValue} from "@chakra-ui/react"
import { MdColorLens } from "react-icons/md"
import axios from "axios";

function Color({bg, color, entryId,  updateEntries}) {
    const entriesApi = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/entries"
    });

    function changeColor(newColor) {
        const newEntry = {
            color: newColor
        }

        entriesApi.patch("/" + entryId, newEntry).then((res) => {
            console.log(res.data);
            updateEntries();
        }).catch((err) => {
            console.error(err);
        });
    }
    return(
        <Box 
            w={6} 
            h={6} 
            bg={bg}
            borderRadius="full"
            _hover={{border: "solid 2px", borderColor: useColorModeValue("blackAlpha.400", "whiteAlpha.700"), cursor: "pointer"}}
            onClick={() => changeColor(color)}
        />
    );
}

function ColorPicker({entry, updateEntries}) {
    const gray = useColorModeValue("#EAEAEA", "#1e1e1e");
    const red = useColorModeValue("red.300", "red.700");
    const orange = useColorModeValue("rgb(252,186,6)", "yellow.700");
    const yellow = useColorModeValue("yellow.300", "yellow.600");
    const teal = useColorModeValue("teal.200", "teal.600");
    const green = useColorModeValue("green.200", "green.600");
    const blue = useColorModeValue("blue.100", "blue.700");
    const cyan = useColorModeValue("cyan.100", "cyan.800");
    const purple = useColorModeValue("purple.200", "purple.800");
    const pink = useColorModeValue("pink.200", "pink.900");
    const brown = useColorModeValue("rgb(230,201,168)", "rgb(68,47,26)");

    return(
        <Popover>
            <PopoverTrigger>
                <IconButton
                    icon={<Icon as={MdColorLens}/>}
                    bg="none" 
                    borderRadius="xl" 
                    size="sm"
                    color={useColorModeValue("blackAlpha.500", "whiteAlpha.300")}
                    _hover={{backgroundColor: useColorModeValue("blackAlpha.100", "whiteAlpha.100")}}
                    _focus={{}}
                />
            </PopoverTrigger>
            <PopoverContent 
                _focus={{}} 
                bg={useColorModeValue("white", "#181818")} 
                border="none" 
                boxShadow="0 5px 4px rgba(0, 0, 0, 0.08), 0 5px 8px rgba(0, 0, 0, 0.2)"
            >
                <PopoverBody>
                    <Box display="flex" gap={1}>
                        <Color bg={gray} color="gray" entryId={entry._id} updateEntries={updateEntries}/>
                        <Color bg={red} color="red" entryId={entry._id} updateEntries={updateEntries}/>
                        <Color bg={orange} color="orange" entryId={entry._id} updateEntries={updateEntries}/>
                        <Color bg={yellow} color="yellow" entryId={entry._id} updateEntries={updateEntries}/>
                        <Color bg={brown} color="brown" entryId={entry._id} updateEntries={updateEntries}/>
                        <Color bg={teal} color="teal" entryId={entry._id} updateEntries={updateEntries}/>
                        <Color bg={green} color="green"  entryId={entry._id} updateEntries={updateEntries}/>
                        <Color bg={blue} color="blue" entryId={entry._id} updateEntries={updateEntries}/>
                        <Color bg={cyan} color="cyan" entryId={entry._id} updateEntries={updateEntries}/>
                        <Color bg={purple} color="purple" entryId={entry._id} updateEntries={updateEntries}/>
                        <Color bg={pink} color="pink" entryId={entry._id} updateEntries={updateEntries}/>
                    </Box>
                </PopoverBody>
            </PopoverContent>
        </Popover>
        
    );
}
export default ColorPicker;