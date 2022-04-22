import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../configs/api";
import ProductCard from "../../components/ProductsCard";
const Products = () => {
  const [productList, setProductList] = useState([]);

  const fetchProductList = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProductList(res.data.result.rows);
      // console.log(res.data.result.rows)
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
      <Box display="flex" py="5" width="100%vw">
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {renderProductList()}
        </Grid>
      </Box>
    </Center>
  );
};

export default Products;
