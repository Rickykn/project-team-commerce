import {
    Box,
    Flex,
    Grid,
    GridItem,
    Icon,
    IconButton,
    Image,
    Input,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import { IoMdClose } from "react-icons/io";
  import { useDispatch } from "react-redux";
  import axiosInstance from "../lib/api";
  import { fetchUserCart } from "../redux/actions/cart";
  import { cart_types } from "../redux/types";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import _ from "lodash";
  import { useCallback } from "react";