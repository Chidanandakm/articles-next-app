import { useEffect, useState } from "react";
import NextLink from "next/link";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
   Text,
   InputGroup,
   InputRightElement,
   Link,
   Heading,
   Center,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { API } from "./api/signin";

const Login = () => {
   const { isLoggedIn, setIsLoggedIn, setUser, user } = useStateContext();
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState("");
   const router = useRouter();

   useEffect(() => {
      if (localStorage.getItem("token") && user.name) {
         setIsLoggedIn(true);
         router.push("/account");
      }
   }, [router]);

   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: Yup.object({
         email: Yup.string().email("Invalid email address").required("Required"),
         password: Yup.string()
            .min(6, "Must be 6 characters")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
      }),
      onSubmit: (values) => {
         setLoading(true);
         API.post("/users/login", values)
            .then(({ data }) => {
               if (data.token) {
                  localStorage.setItem("token", data.token);
                  setUser(data.user);
                  setIsLoggedIn(true);
                  setLoading(false);
                  router.push("/");
               }
            })
            .catch((err) => {
               setError(err.response.data.message);
            });

      },
   });
   return (
      <Flex bg="gray.100" align="center" alignItems="center" flexDirection={"column"} justify="flex-start" minH="100vh">
         <Stack spacing={8} w={"full"} py={6} px={4}>
            <Stack align={"center"}>
               <Heading fontSize={["3xl", "4xl"]}>Sign in to your account</Heading>
            </Stack>
         </Stack>
         {error && (
            <Center color="red.500" alignContent="center" mb="3">
               {error}
            </Center>
         )}
         <form onSubmit={formik.handleSubmit}>
            <Box bg="white" p={6} rounded="md" width={"400px"}>
               <VStack spacing={4} align="flex-start">
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
                  <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                     <NextLink href={"/forgot-password"}>
                        <Link color={"blue.400"}>Forgot password?</Link>
                     </NextLink>
                  </Stack>

                  <Button type="submit" isLoading={loading} colorScheme="purple" width="full">
                     Login
                  </Button>
               </VStack>
               <Stack pt={6}>
                  <Text align={"center"}>
                     Don&apos;t Have account?
                     <NextLink href="/register" passHref>
                        <Link color={"blue.400"}> Register</Link>
                     </NextLink>
                  </Text>
               </Stack>
            </Box>
         </form>
      </Flex>
   );
};

export default Login;
