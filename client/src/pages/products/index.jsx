import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../configs/api";
import ProductCard from "../../components/ProductsCard";
const Products = () => {
  const [productList, setProductList] = useState([]);

  const fetchProductList = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProductList(res.data.result.rows);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  console.log(productList);

  const renderProductList = () => {
    if (productList.length) {
      return productList.map((val) => {
        return (
          <GridItem w="100%">
            <ProductCard
              productName={val?.product_name}
              productImage={val?.product_image}
              stock={val?.stock}
              price={val?.price}
            ></ProductCard>
          </GridItem>
        );
      });
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);
  return (
    <Center>
      <Flex display="inline" py="5">
        <Center>
          <Input placeholder="Search Product" size="sm" width="50" />
          <Button colorScheme="teal" size="sm" ml="5">
            Button
          </Button>
        </Center>

        <Box display="flex" py="5" width="100%vw">
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {renderProductList()}
          </Grid>
        </Box>
      </Flex>
    </Center>
  );
};

export default Products;
