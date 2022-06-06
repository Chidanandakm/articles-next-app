import NextLink from "next/link";
import Image from "next/image";
import {Box, Heading, Text, Stack} from "@chakra-ui/react";
import DefaultImage from "../images/house.jpg";
import HTMLReactParser from "html-react-parser";
import moment from "moment";

const Article = ({article}) => {
   const desc = HTMLReactParser(article?.content.slice(0, 100));
   return (
      <NextLink href={`/articles/${article?._id}`} passHref>
         <Box maxW={"400px"} w={"full"} bg={"white"} cursor="pointer" p={5} overflow={"hidden"}>
            <Box bg={"gray.100"} h={"210px"} mb={6} pos={"relative"}>
               <Image
                  src={article?.featured_image ? article?.featured_image : DefaultImage}
                  layout={"fill"}
                  alt={"House"}
               />
            </Box>
            <Stack>
               <Text
                  color={"green.500"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
               >
                  {article?.category}
               </Text>
               <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
                  {article?.title?.length > 25 ? `${article?.title.substring(0, 25)}...` : article?.title}
               </Heading>
               <Box color={"gray.500"}>{desc?.length > 50 ? `${desc.substring(0, 50)}...` : desc}</Box>
            </Stack>
            <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
               <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                  <Text fontWeight={600}>{article?.author}</Text>
                  <Text color={"gray.500"}>{moment(article?.createdAt).fromNow("DD MM YYYY")}</Text>
               </Stack>
            </Stack>
         </Box>
      </NextLink>
   );
};

export default Article;
