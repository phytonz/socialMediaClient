import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { Box } from "@mui/material";
import UserWidget from "scenes/widgets/UserWidget";
import Navbar from "scenes/navbar";



const SearchPage = () => {
    const searchTerm = useSelector((state) => state.searchTerm);
    console.log(searchTerm);
    
    // const token = useSelector((state) => state.token);
    const [users,setUsers] = useState([]);
    const getUsers = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}search/${searchTerm}`);        
        const data = await response.json();        
        setUsers(data);
      };
    
      useEffect(() => {        
        getUsers();
      }, [searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps
    
    
    
    return <Box>
       <Navbar />
       <Box display="flex" columnGap="15px" mt="20px" >
       {users.length < 1 &&<Box margin="0 auto">No users Found</Box>}
      {users.length > 0 && users.map((user) => {
        return <UserWidget  userId={user._id} key={user._id} picturePath={user.picturePath}/>

    })}
    </Box></Box>
}

export default SearchPage;