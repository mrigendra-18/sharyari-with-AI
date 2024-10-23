import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Spinner } from '@chakra-ui/react';
import { BiErrorCircle } from 'react-icons/bi';
import {
  Container,
  SimpleGrid,
  Flex,
  Text,
  Input,
  Button,
  Box,
  useColorMode,
  useColorModeValue,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Navbar component
function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const buttonColor = useColorModeValue('yellow.400', 'blue.300');

  return (
    <Flex
      as="nav"
      bg={bgColor}
      color="white"
      justify="space-between"
      align="center"
      p={4}
      mb={8}
      w="100%"
      position="fixed"
      top={0}
      zIndex={1}
    >
      <Text fontSize="xl" fontWeight="bold">
        Shayari Generator using Gemini AI
      </Text>
      <IconButton
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        isRound
        aria-label="Toggle Color Mode"
        color={buttonColor}
      />
    </Flex>
  );
}

const SparkleButton = motion(Button);

function Shayari() {
  const [inputValue, setInputValue] = useState('');
  const [promptResponses, setPromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    if (!inputValue.trim()) {
      alert("Please enter some keywords for the Shayari.");
      return;
    }
    try {
      setLoading(true);
      setLoadingError(false);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(`
        You are a skilled poet in Hindi, known for creating beautiful shayaris. 
        I will provide you with a list of keywords, and your task is to write a meaningful 
        and emotional shayari using all the keywords provided. After writing the shayari in Hindi, 
        kindly provide an English translation of the shayari as well. Here are the keywords: ${inputValue}
      `);
      setInputValue('');
      const response = result.response;
      const text = await response.text();
      const [shayari, translation] = text.split('Translation:');

      setPromptResponses([
        {
          shayari: shayari.trim(),
          translation: translation ? translation.trim() : 'No translation provided',
        },
        ...promptResponses,
      ]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setLoadingError(true);
    }
  };

  // Call useColorModeValue at the top level of the component
  const containerBg = useColorModeValue('gray.100', 'black');
  const textColor = useColorModeValue('black', 'white');
  const alertBg = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <>
      <Navbar />
      <Container maxW="5xl" py={12} bg={containerBg} color={textColor}>
        <Text
          textTransform="uppercase"
          color="blue.400"
          fontWeight={600}
          fontSize="sm"
          textAlign="center"
          bg={alertBg}
          p={5}
          rounded="md"
          position="relative"
          top="30px"
        >
          Shayari Generator using Gemini AI
        </Text>
        <SimpleGrid columns={{ base: 1, md: 1 }} mt={10} spacing={10}>
          <Flex gap={2} justifyContent="center">
            <Input
              type="text"
              size="lg"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter keyword for shayari"
              w="50%"
            />
            <SparkleButton
              onClick={getResponseForGivenPrompt}
              colorScheme="teal"
              size="lg"
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: [0, 10, -10, 0], transition: { duration: 0.5 } }}
            >
              Generate
            </SparkleButton>
          </Flex>
        </SimpleGrid>

        {loading && (
          <Flex justify="center" align="center" mt={5}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="teal.500"
              size="xl"
            />
            <Text ml={3} fontSize="lg" fontWeight="bold" color="teal.500">
              Generating Shayari...
            </Text>
          </Flex>
        )}

        {loadingError && (
          <Flex justify="center" align="center" mt={5}>
            <Box as={BiErrorCircle} color="red.500" size="40px" />
            <Text ml={3} fontSize="lg" fontWeight="bold" color="red.500">
              Something went wrong, please try again.
            </Text>
          </Flex>
        )}

        <VStack spacing={6} mt={10}>
          {promptResponses.map((response, index) => (
            <Box
              key={index}
              // bg={useColorModeValue('gray.50', 'gray.700')}
              // color={useColorModeValue('black', 'white')}
              p={5}
              rounded="md"
              border="1px solid"
              borderColor={borderColor}
              boxShadow="lg"
              textAlign="center"
              fontWeight={index === 0 ? '700' : 'normal'}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              <Text fontWeight="bold" fontSize="xl" mb={2}>
                Shayari:
              </Text>
              <Box dangerouslySetInnerHTML={{ __html: response.shayari.replace(/\n/g, '<br />') }} />

              <Text fontWeight="bold" fontSize="xl" mt={4} mb={2}>
                Translation:
              </Text>
              <Box dangerouslySetInnerHTML={{ __html: response.translation.replace(/\n/g, '<br />') }} />
            </Box>
          ))}
        </VStack>
      </Container>
    </>
  );
}

export default Shayari;
