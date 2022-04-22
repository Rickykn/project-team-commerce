import { Box, Image, Text, Stack, Button } from "@chakra-ui/react";

const ProductCard = ({ productName, productImage, stock, price }) => {
  return (
    <Box w="250px" rounded="20px" overflow="hidden" boxShadow="lg">
      <Image src={productImage} alt="Product Image" />
      <Box p={5}>
        <Stack fontSize="sm">
          <Text>{productName}</Text>
          <Text>Rp. {price}</Text>
          <Text>Stock: {stock}</Text>
        </Stack>
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
