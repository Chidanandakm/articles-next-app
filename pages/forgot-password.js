import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
   Button,
   Flex,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Heading,
   Input,
   Stack,
   Text,
   useColorModeValue,
} from "@chakra-ui/react";

const Register = () => {
   const formik = useFormik({
      initialValues: {
         email: "",
      },
      validationSchema: Yup.object({
         email: Yup.string().email("Invalid email address").required("Required"),
      }),
      onSubmit: (values) => {
         // alert(JSON.stringify(values, null, 2));
         console.log(values);
      },
   });
   return (
      <Flex minH={"100vh"} align={"flex-start"} justify={"center"}>
         <Stack spacing={4} w={"full"} maxW={"md"} rounded={"xl"} boxShadow={"lg"} p={6} my={12}>
            <form onSubmit={formik.handleSubmit}>
               <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                  Forgot your password?
               </Heading>
               <Text fontSize={{ base: "sm", sm: "md" }} mb={4}>
                  You&apos;ll get an email with a reset link
               </Text>
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
               <Stack spacing={6} mt={4}>
                  <Button
                     bg={"blue.400"}
                     color={"white"}
                     type="submit"
                     _hover={{
                        bg: "blue.500",
                     }}
                  >
                     Request Reset
                  </Button>
               </Stack>
            </form>
         </Stack>
      </Flex>
   );
};

export default Register;
