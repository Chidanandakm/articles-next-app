import NextLink from "next/link";
import {
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   Flex,
   Button,
   Center,
   Avatar,
   MenuDivider,
   Box,
   Input,
} from "@chakra-ui/react";
import {useStateContext} from "../context/StateContext";

const Navbar = () => {
   const {setText, user, setUser, isLoggedIn, setIsLoggedIn} = useStateContext();

   const handleLogout = () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUser({});
   };
   console.log(user);

   return (
      <Flex
         py="2"
         px="5"
         w="100%"
         borderBottom="1px"
         borderColor="gray.100"
         alignItems="center"
         justifyContent="space-between"
      >
         <Flex justifyContent="flex-start" fontSize={["2xl", "3xl"]} color="blue.300" fontWeight="bold">
            <NextLink href="/" paddingLeft="2">
               Articles
            </NextLink>
         </Flex>
         <Flex justifyContent="center" alignItems="center" gap="5">
            <Flex alignItems="center" justifyContent="center">
               <Center justifyContent="center" alignItems="center" w="100" mt="3">
                  <Box w="80%">
                     <Input placeholder="Search" onChange={(e) => setText(e.target.value)} size="md" />
                  </Box>
               </Center>
            </Flex>
            <Flex alignItems="center" justifyContent="center">
               {user.name && isLoggedIn ? (
                  <Menu>
                     <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                        <Avatar size={"sm"} src={"https://avatars.dicebear.com/api/male/username.svg"} />
                     </MenuButton>
                     <MenuList alignItems={"center"}>
                        <Center>
                           <p>{user?.name}</p>
                        </Center>
                        <MenuDivider />
                        <NextLink href="/account">
                           <MenuItem>Profile</MenuItem>
                        </NextLink>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                     </MenuList>
                  </Menu>
               ) : (
                  <NextLink href={`/login`} passHref>
                     <Button color={"blue:500"}>Login</Button>
                  </NextLink>
               )}
            </Flex>
         </Flex>
      </Flex>
   );
};

export default Navbar;
