import {Box, Button, Center, Flex, Text, Textarea} from "@chakra-ui/react";
import React, {useRef, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useStateContext} from "../context/StateContext";
import {API} from "../pages/api/signin";

const Comment = ({comments, id}) => {
   const {isLoggedIn, user} = useStateContext();
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");

   const formik = useFormik({
      initialValues: {
         text: "",
      },
      validationSchema: Yup.object({
         text: Yup.string().required("Required").min(5, "min 5 characters"),
      }),
      onSubmit: (values) => {
         console.log(values);
         setIsLoading(true);
         values.id = id;
         // alert(JSON.stringify(values, null, 2));
         API.post(`/articles/comment/${values.id}`, values)
            .then(({data}) => {
               console.log(data);
               comments.push(data.comment);
               formik.resetForm();
            })
            .catch((err) => {
               setError(err.response.data.message);
            });
         setIsLoading(false);
      },
   });
   return (
      <>
         {isLoggedIn && (
            <Flex flexDir="column">
               <Textarea
                  w="100%"
                  type="text"
                  name="text"
                  value={formik.values.text}
                  onBlur={formik.handleBlur}
                  onChange={(e) => formik.setFieldValue("text", e.target.value)}
                  placeholder="Write a comment..."
                  borderRadius={8}
                  borderColor="gray.200"
                  borderWidth={1}
                  borderStyle="solid"
                  h={100}
                  p={4}
                  resize="none"
                  size="sm"
                  isInvalid={formik.errors.text}
               />
               <Text color="red.300">{formik.errors.text}</Text>
               <Button
                  type="submit"
                  m="1"
                  isLoading={isLoading}
                  onClick={formik.handleSubmit}
                  colorScheme="teal"
                  size="xs"
               >
                  Post
               </Button>
            </Flex>
         )}
         {comments.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
         }).length > 0 && (
            <Box bg="white" w="full" p="5" mt="2">
               <Text fontSize="sm" fontWeight="bold" color="gray.500">
                  {comments.length} Comments
               </Text>

               {comments.map((comment) => (
                  <Flex bg="white" w="full" p="4" mt="1" key={comment.id} gap="3">
                     <Center
                        color={"gray.900"}
                        textAlign="center"
                        alignContent="center"
                        justifyItems="center"
                        width={"30px"}
                        height={"30"}
                        fontSize={"18px"}
                        borderRadius="50%"
                        backgroundColor="gray.200"
                     >
                        {comment.user.name.slice(0, 1)}
                     </Center>
                     <Text color={"gray.600"}>{comment.text}</Text>
                  </Flex>
               ))}
            </Box>
         )}
      </>
   );
};

export default Comment;
