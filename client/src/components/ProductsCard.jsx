import { Box, Image, Badge, Text, Stack, Button } from "@chakra-ui/react";

const ProductCard = () => {
  return (
    <Box w="250px" rounded="20px" overflow="hidden" boxShadow="lg">
      <Image src="https://chakra-ui.com/og-image.png" alt="Product Image" />
      <Box p={5}>
        <Stack fontSize="x-small">
          <Text>PRODUCT NAME</Text>
          <Text>PRICE</Text>
          <Text>STOCK</Text>
        </Stack>
        <Text pt={2} fontSize="sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
          cupiditate ut! Exercitationem
        </Text>
        <Box textAlign="center">
          <Button
            colorScheme="teal"
            size="sm"
            mt={3}
            boxShadow="md"
            width="100%"
          >
            Add Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
