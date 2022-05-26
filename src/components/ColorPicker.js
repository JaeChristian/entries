import {Popover, PopoverTrigger, PopoverContent, PopoverBody, IconButton, Icon, Box, useColorModeValue} from "@chakra-ui/react"
import { MdColorLens, MdCircle } from "react-icons/md"

function paletteIcon() {
    return(
        <Icon 
            as={MdColorLens}
        />
    );
}

function ColorPicker() {
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
                    <Box 
                        w={6} 
                        h={6} 
                        bg="red"
                        borderRadius="full"
                        _hover={{border: "solid 2px", borderColor: useColorModeValue("blackAlpha.500", "whiteAlpha.700"), cursor: "pointer"}}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>
        
    );
}
export default ColorPicker;