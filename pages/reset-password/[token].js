import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, Stack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import * as Yup from "yup";
import { useFormik } from "formik";
import { API } from '../api/signin';


const ResetPassword = ({ token }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState('');
    const router = useRouter()
    console.log(token);
    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "Must be 6 characters")
                .max(15, "Must be 15 characters or less")
                .required("Required"),
        }),
        onSubmit: (values) => {
            setIsLoading(true);
            API.post(`/users/reset-password/${token}`, values)
                .then(({ data }) => {
                    if (data) {
                        setIsSuccess(data.message)
                        formik.resetForm();
                        setIsLoading(false);
                        router.push("/login");
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
                    <Heading fontSize={["3xl", "4xl"]}>Reset Your Password</Heading>
                </Stack>
            </Stack>
            {isSuccess && (
                <Center color="green.500" alignContent="center" mb="1">
                    {isSuccess}
                </Center>
            )}
            <form onSubmit={formik.handleSubmit}>
                <Box bg="white" p={6} rounded="md" width={"400px"}>
                    <VStack spacing={4} align="flex-start">
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
                            Reset
                        </Button>
                    </VStack>
                </Box>
            </form>
        </Flex>
    )
}

export default ResetPassword

export const getServerSideProps = async ({ params: { token } }) => {
    return {
        props: {
            token
        }
    }
}