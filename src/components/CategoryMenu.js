import {Menu, MenuButton, IconButton, useColorModeValue, MenuList, MenuItem, Text} from "@chakra-ui/react"
import {HamburgerIcon, PlusSquareIcon} from "@chakra-ui/icons";
import axios from "axios";
import Category from "./Category";
import { useCallback, useEffect, useState } from "react";

function CategoryMenu ({entry, categories, updateEntries}) {
    // Background color for category menu
    const bg = useColorModeValue("white", "#1a1a1a");

    // Endpoint for entries
    const entriesAPI = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: "/entries"
    });

    // Patches current entry to a category
    function setCategory(categoryId) {
        const newEntry = {
            categoryId: categoryId
        }
        entriesAPI.patch("/" + entry._id, newEntry).then((res) => {
            updateEntries();
        }).catch((err) => {
            console.log(err.response.data.message);
        });
    }

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                icon={<PlusSquareIcon/>}
                _focus={{borderColor: "whiteAlpha.400"}}
                bg="none" 
                borderRadius="xl" 
                size="md"
                color={useColorModeValue("blackAlpha.500", "whiteAlpha.400")}
                _hover={{backgroundColor: useColorModeValue("blackAlpha.100", "whiteAlpha.100")}}
            />
            <MenuList 
                bg={bg} 
                borderRadius="0.2rem" 
                border="none"
                boxShadow="0 5px 4px rgba(0, 0, 0, 0.08), 0 5px 8px rgba(0, 0, 0, 0.2)"
            >
                <MenuItem w="100%" display="flex" gap={2} onClick={(e) => setCategory("")}>
                    <Text fontSize="sm">none</Text>
                </MenuItem>
                {categories.map((category) => {
                    return (
                        <div key={category._id}>
                            <Category category={category} setCategory={setCategory}/>
                        </div>
                    )
                })}
            </MenuList>
        </Menu>
    )
}
export default CategoryMenu;