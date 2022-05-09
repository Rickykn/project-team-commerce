import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../configs/api";
import ProductCard from "../../components/ProductsCard";
import { useRouter } from "next/router";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortInput, setSortInput] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortDir, setSortDir] = useState("");
  const router = useRouter();
  const maxPostPerPage = 4;

  const fetchProductList = async () => {
    try {
      const res = await axiosInstance.get("/products", {
        params: {
          product_name: searchValue,
          _limit: maxPostPerPage,
          _page: page,
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
        },
      });
      setProductList(res.data.result.rows);
      const productCount = res.data.result.count;
      setMaxPage(Math.ceil(productCount / maxPostPerPage));
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const searchInputHandler = (event) => {
    const { value } = event.target;

    setSearchInput(value);
  };

  const sortInputHandler = (event) => {
    const { value } = event.target;
    setSortInput(value);
  };

  const searchButton = () => {
    setSearchValue(searchInput);
    setPage(1);
  };

  const sortButton = () => {
    if (sortInput == "Highest Price") {
      setSortBy("price");
      setSortDir("DESC");
    } else if (sortInput == "Lowest Price") {
      setSortBy("price");
      setSortDir("ASC");
    } else if (sortInput == "") {
      setSortBy("");
      setSortDir("");
    }
  };
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

  const nextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query.product_name) {
        setSearchValue(router.query.product_name);
      }
      if (router.query._sortDir) {
        setSortValue(router.query._sortDir);
      }
      if (router.query._sortBy) {
        setSortValue(router.query._sortBy);
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    fetchProductList();

    if (searchValue) {
      router.push({
        query: {
          product_name: searchValue,
        },
      });
    }
    if (searchValue === "") {
      router.replace("/products", undefined, { shallow: true });
    }

    if (sortInput) {
      router.push({
        query: {
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
        },
      });
    }

    if (sortInput === "") {
      router.replace("/products", undefined, { shallow: true });
    }
  }, [page, searchValue, sortDir, sortBy]);

  return (
    <Center>
      <Flex display="inline" py="5">
        <Center>
          <Input
            onChange={searchInputHandler}
            placeholder="Search Product"
            size="sm"
            width="50"
          />
          <Button onClick={searchButton} colorScheme="teal" size="sm" ml="5">
            Button
          </Button>
          <Flex margin="10px">
            <Select onChange={sortInputHandler}>
              <option value="">default</option>
              <option>Highest Price</option>
              <option>Lowest Price</option>
            </Select>
            <Button ml="10px" onClick={sortButton} colorScheme="teal">
              sort
            </Button>
          </Flex>
        </Center>

        <Box display="flex" py="5" width="100%vw">
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {renderProductList()}
          </Grid>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button onClick={previousPage}>
            <Icon as={GrFormPrevious} />
          </Button>
          <Button onClick={nextPage}>
            <Icon as={GrFormNext} />
          </Button>
        </Box>
      </Flex>
    </Center>
  );
};

export default Products;
