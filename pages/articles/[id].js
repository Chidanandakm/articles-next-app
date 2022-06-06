import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import moment from "moment";
import Image from "next/image";
import HTMLReactParser from "html-react-parser";

import DefaultImage from "../../images/house.jpg";
import Comment from "../../components/Comment";
import { API } from "../api/signin";
import Head from "next/head";

const SingleArticle = ({ article }) => {
   return (
      <>
         <Head>
            <title>{article?.title}</title>
            <meta name={article?.meta_keyword} content={article?.meta_description} />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Box maxWidth="800px" margin="auto" p="4">
            <Center w="full" p="1">
               <Image
                  src={article?.featured_image ? article?.featured_image : DefaultImage}
                  height="600px"
                  width="800px"
                  alt={"House"}
                  objectFit="cover"
               />
            </Center>

            <Flex paddingTop="2" mt="2" alignItems="center" justifyContent="space-between">
               <Flex alignItems="center">
                  <Box marginRight="3" color="green.400">
                     {article?.author}
                  </Box>
                  <Text fontWeight="bold" color="blue.400" fontSize="10" p="1" bg="gray.200" borderRadius="5">
                     {article?.category}
                  </Text>
               </Flex>
               <Box>{moment(article?.createdAt).format("DD/MM/YYYY")}</Box>
            </Flex>

            <Box marginTop="2">
               <Text fontSize={["2xl", "5xl"]} marginBottom="2" fontWeight="bold">
                  {article?.title}
               </Text>
               <Box lineHeight="2" color="gray.600">
                  {HTMLReactParser(article?.content)}
               </Box>
            </Box>
            <Comment comments={article?.comments} id={article?._id} />
         </Box>
      </>
   );
};

export default SingleArticle;

export const getServerSideProps = async ({ params: { id } }) => {
   const { data } = await API.get(`/articles/${id}`);
   return {
      props: {
         article: data.article,
      },
   };
};
