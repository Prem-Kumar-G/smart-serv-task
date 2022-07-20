import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  useColorMode,
  theme,
  Spinner,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import Axios from 'axios';

function App() {
  const { colorMode } = useColorMode();
  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get(
        'https://s3.amazonaws.com/open-to-cors/assignment.json'
      );

      let productList = Object.values(response.data.products);

      productList.sort((a, b) => b.popularity - a.popularity);

      setProducts(productList);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            {isloading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            ) : (
              <>
                <Text fontSize={{ base: '1xl', md: '2xl' }}>
                  Products ordered based on the descending popularity.
                </Text>
                {products.map(product => {
                  return (
                    <Box
                      boxShadow="outline"
                      p="6"
                      rounded="md"
                      bg={colorMode === 'light' ? 'Dark' : 'Light'}
                    >
                      <Text>
                        Title : <strong>{product.title}</strong>
                      </Text>
                      <Text>
                        Price : <strong>{product.price}</strong>
                      </Text>
                      <Text>
                        Popularity : <strong>{product.popularity}</strong>
                      </Text>
                    </Box>
                  );
                })}
              </>
            )}
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
