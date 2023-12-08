import { Box } from '@chakra-ui/react';
import { ChatState } from '../Context/Chatprovider';
import SideDrawer from '../component/miscelleneous/SideDrawer';
import MyChats from '../component/MyChats';
import ChatBox from '../component/ChatBox';

const Chatpage = () => {
const { user} = ChatState();  

 return(
     <div style={{ width: "100%"}}>
       {user && <SideDrawer/>} 
     <Box  display='flex' justifyContent='space-between' w="100%" h="91.5vh" p='10px'>
        {user && <MyChats/>} 
        {user && <ChatBox/>} 
     </Box>

     </ div>    
 )
  
};

export default Chatpage;
