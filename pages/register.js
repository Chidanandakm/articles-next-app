import { useState } from "react";
import NextLink from "next/link";
import {
   Box,
   Button,
   Flex,
   FormControl,
   FormLabel,
   FormErrorMessage,
   Input,
   VStack,
   Stack,
   Link,
   Text,
   InputRightElement,
   InputGroup,
   Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStateContext } from "../context/StateContext";
import { API } from "./api/signin";

const Register = () => {
   const { isLoggedIn, setIsLoggedIn, setUser, user } = useStateContext();
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const [error, setError] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const formik = useFormik({
      initialValues: {
         name: "",
         email: "",
         password: "",
      },
      validationSchema: Yup.object({
         name: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
         email: Yup.string().email("Invalid email address").required("Required"),
         password: Yup.string()
            .min(6, "Must be 6 characters")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
      }),
      onSubmit: async (values) => {
         console.log(values);
         setIsLoading(true);
         API.post("/users/register", values)
            .then(({ data }) => {
               if (data.token) {
                  localStorage.setItem("token", data.token);
                  setUser(data.user);
                  setIsLoggedIn(true);
                  router.push("/");
               }
            })
            .catch((err) => {
               setError(err.response.data.message);
            });
         setIsLoading(false);
      },
   });
   return (
      <Flex bg="gray.100" align="center" alignItems={"center"} flexDirection={"column"} justify="flex-start" h="100vh">
         <Stack spacing={"8"} w={"full"} py={6} px={[2, 4]}>
            <Stack align={"center"}>
               <Heading fontSize={["3xl", "5xl"]}>Sign Up</Heading>
            </Stack>
         </Stack>
         <Box bg="white" p={[6]} rounded="md" width={"400px"}>
            <form onSubmit={formik.handleSubmit}>
               {error && (
                  <Text color="red.500" alignContent="center">
                     {error}
                  </Text>
               )}
               <VStack spacing={4} align="flex-start">
                  <FormControl isInvalid={formik.touched.name && formik.errors.name}>
                     <FormLabel htmlFor="name">Name</FormLabel>
                     <Input
                        id="name"
                        name="name"
                        type="text"
                        variant="filled"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                     />
                     <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                     <FormLabel htmlFor="email">Email Address</FormLabel>
                     <Input
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                     />
                     <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={formik.touched.password && formik.errors.password}>
                     <FormLabel htmlFor="password">Password</FormLabel>
                     <InputGroup>
                        <Input
                           id="password"
                           name="password"
                           type={showPassword ? "text" : "password"}
                           variant="filled"
                           value={formik.values.password}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                        />
                        <InputRightElement h={"full"}>
                           <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                           </Button>
                        </InputRightElement>
                     </InputGroup>
                     <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                  </FormControl>

                  <Button type="submit" isLoading={isLoading} colorScheme="purple" width="full">
                     Register
                  </Button>
               </VStack>
               <Stack pt={6}>
                  <Text align={"center"}>
                     Already a user?
                     <NextLink href="/login" passHref>
                        <Link color={"blue.400"}> Login</Link>
                     </NextLink>
                  </Text>
               </Stack>
            </form>
         </Box>
      </Flex>
   );
};

export default Register;
