import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    }),
    validateOnChange: false,
  });

  return (
    <Flex
      minHeight="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing="8" marginX="auto" maxW="lg" paddingY="12" paddingX="6">
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
          <Text fontSize="lg" color="gray.600">
            to start shopping to our e-commerce 🛒
          </Text>
        </Stack>

        <Box
          rounded="xl"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="xl"
          padding="8"
        >
          <Stack spacing="4">
            <FormControl isInvalid={formik.errors.username} id="username">
              <FormLabel>Username</FormLabel>
              <Input
                onChange={(event) =>
                  formik.setFieldValue("username", event.target.value)
                }
                type="text"
              />
              <FormHelperText>{formik.errors.username}</FormHelperText>
            </FormControl>

            <FormControl isInvalid={formik.errors.password} id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  onChange={(event) =>
                    formik.setFieldValue("password", event.target.value)
                  }
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>{formik.errors.password}</FormHelperText>
            </FormControl>

            <Stack spacing="10">
              <Stack direction="row" justify="center" marginBottom="2">
                <Text>Don't have an account?</Text>
                <Link color="blue.300" onClick={() => router.push("/auth/register")}> Sign up here</Link>
              </Stack>
            </Stack>

            <Button
              onClick={formik.handleSubmit}
              type="submit"
              bg="blue.400"
              color="white"
              _hover={{
                bg: "blue.500",
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
