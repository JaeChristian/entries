import {Menu, MenuButton, Box, IconButton, useColorModeValue, MenuList, MenuItem, Text, Input} from "@chakra-ui/react"
import {HamburgerIcon, PlusSquareIcon} from "@chakra-ui/icons";
import axios from "axios";
import CategorySelection from "./CategorySelection";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../libs/URLhandler";

function CategoryMenu ({entry, updateEntries}) {
    // Background color for category menu
    const bg = useColorModeValue("white", "#1a1a1a");
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    // Decrypted JWT token
    const authUser = JSON.parse(atob(localStorage.getItem("token")?.split(".")[1]));

    // Endpoint for entries
    const entriesAPI = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: `${API_URL}/entries`
    });

    // Endpoint for categories
     const categoriesAPI = axios.create({
        headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        baseURL: `${API_URL}/categories`
    });

    function fetchCategories() {
        categoriesAPI.get("/user/" + authUser.id).then((res) => {
            setCategories(res.data);
        }).catch((err) => {
            console.error(err.response.data.message);
        })
    }

    // Patches current entry to a new categoryId
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

    // function submitNewCategory(e) {
    //     e.preventDefault();
    //     const newCategory = {
    //         name: categoryName
    //     }
        
    //     categoriesAPI.post("/", newCategory).then((res)=> {
    //         updateCategories();
    //         setCategoryName("");
    //     }).catch((err)=>{
    //         console.error(err);
    //     });
    // }

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                icon={<PlusSquareIcon/>}
                _focus={{borderColor: "whiteAlpha.400"}}
                bg="none" 
                borderRadius="xl" 
                size="sm"
                color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
                _hover={{backgroundColor: useColorModeValue("blackAlpha.100", "whiteAlpha.100")}}
                onClick={()=>fetchCategories()}
            />
            <MenuList 
                bg={bg} 
                borderRadius="0.2rem" 
                border="none"
                boxShadow="0 5px 4px rgba(0, 0, 0, 0.08), 0 5px 8px rgba(0, 0, 0, 0.2)"
            >
                {/* <Box display="flex" justifyContent="center">
                    <form onSubmit={submitNewCategory}>
                        <Input 
                            type="text" 
                            onChange={(e) => setCategoryName(e.target.value)}
                            value={categoryName}
                            placeholder="Create a label"
                            fontSize="sm"
                            variant="flushed"
                            _focus={{}}
                        />
                    </form>
                </Box> */}
                <MenuItem w="100%" display="flex" gap={2} onClick={(e) => setCategory("")}>
                    <Text fontSize="sm">none</Text>
                </MenuItem>
                {categories.map((category) => {
                    return (
                        <div key={category._id}>
                            <CategorySelection category={category} setCategory={setCategory}/>
                        </div>
                    )
                })}
            </MenuList>
        </Menu>
    )
}
export default CategoryMenu;