import React from 'react';
import { Box, Flex, FormControl, FormHelperText, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useFormik } from 'formik';

const register = () => {
  const formik = useFormik({
    initialValuse: {
      username: '',
      email: '',
      password: '',
    },
  });

  const inputHandler = () => {};

  return (
    <Flex justify="center">
      <Box mt="10" borderWidth="1px" borderColor="gray.100" bgColor="gray.50" shadow="base">
        <Stack m="5">
          <FormControl isInvalid={formik.errors.username}>
            <FormLabel htmlFor="inputUsername">Username</FormLabel>
            <Input borderColor="gray.700" onChange={inputHandler} id="inputUsername" name="username" />
            <FormHelperText>{formik.errors.username}</FormHelperText>
          </FormControl>

          <FormControl isInvalid={formik.errors.email}>
            <FormLabel htmlFor="inputEmail">Email</FormLabel>
            <Input borderColor="gray.700" onChange={inputHandler} id="inputEmail" name="email" />
            <FormHelperText>{formik.errors.email}</FormHelperText>
          </FormControl>

          <FormControl isInvalid={formik.errors.password}>
            <FormLabel htmlFor="inputPassword">Password</FormLabel>
            <Input borderColor="gray.700" onChange={inputHandler} id="inputPassword" name="password" />
            <FormHelperText>{formik.errors.password}</FormHelperText>
          </FormControl>
        </Stack>
      </Box>
    </Flex>
  );
};

export default register;
