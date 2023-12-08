


import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text, Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscelleneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/Chatprovider";
import { useColorMode } from "@chakra-ui/react";
import "../App.css";

const MyChats = ({ fetchAgain }) => {
  const { colorMode } = useColorMode();
  const [loggedUser, setLoggedUser] = useState();

  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      const filteredChats = data.filter((chat) => {
        if (chat.isGroupChat && chat.users.length < 2) {
          axios
            .delete(`/api/chat/groupdelete`, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
              data: {
                chatId: chat._id,
              },
            })
            .catch((error) => {
              console.error("Error deleting group chat:", error);
            });
          return false;
        }
        return true;
      });

      setChats(filteredChats);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Flex
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      className="MyChats"
      flexDir="column"
      alignItems="center"
      p={3}
      color={colorMode === "light" ? "black" : "white"}
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
    >
      <Flex
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontfamily="Work sans"
        display="flex"
        width="100%"
        alignItems="center"
        color={colorMode === "light" ? "black" : "white"}
      >
        <span style={{ flex: 1 }}>My Chats</span>
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            alignItems="center"
            bg={colorMode === "light" ? "none" : "none"}
            color={colorMode === "light" ? "black" : "white"}
            rightIcon={<AddIcon />}
            className="Chatbtn"
            borderWidth="0"
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Flex>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        className="chats"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats
              .filter((chat) => chat.users.length >= 2)
              .map((chat) => (
                <Box
                  onClick={() => {
                    setSelectedChat(chat);

                    // Remove notification for this chat
                    setNotification(
                      notification.filter(
                        (notif) => notif.chat._id !== chat._id
                      )
                    );
                  }}
                  cursor="pointer"
                  bg={
                    colorMode === "light"
                      ? selectedChat === chat
                        ? "#75C2F6"
                        : "white"
                      : selectedChat === chat
                      ? "#4942E4"
                      : "none"
                  }
                  color={colorMode === "light" ? "black" : "white"}
                  fontWeight="bold"
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat && getSender(loggedUser, chat.users)
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && chat.latestMessage.sender && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Flex>
  );
};

export default MyChats;