import React, { useState } from 'react';
import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Icon, Input, InputGroup, InputRightElement, Stack, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import * as Yup from 'yup';

const register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('This field is required'),
      password: Yup.string()
        .required('This field is required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'),
      email: Yup.string().required('This field is required').email('invalid email'),
      full_name: Yup.string().required('This field is required'),
      repeatPassword: Yup.string().required('This field is required'),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
      setTimeout(async () => {
        // try {
        //   if (values.password != values.repeatPassword) {
        //     throw new Error('password not match');
        //   }
        //   // return await api.post('/auth/register', values);
        // } catch (err) {
        //   console.log(err);
        //   toast({
        //     title: 'error',
        //     description: err.message,
        //     status: 'error',
        //   });
        // }
        // dispatch(signUp(values, formik.setSubmitting))
      }, 3000);
      formik.setSubmitting(false);
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  return (
    <Flex justify="center">
      <form>
        <Box w="sm" mt="10" borderWidth="1px" borderColor="gray.100" bgColor="gray.50" shadow="base">
          <Stack m="5">
            <FormControl isInvalid={formik.errors.username}>
              <FormLabel htmlFor="inputUsername">Username</FormLabel>
              <Input bgColor="white" onChange={inputHandler} id="inputUsername" name="username" />
              <FormHelperText>{formik.errors.username}</FormHelperText>
            </FormControl>

            <FormControl isInvalid={formik.errors.email}>
              <FormLabel htmlFor="inputEmail">Email</FormLabel>
              <Input bgColor="white" onChange={inputHandler} id="inputEmail" name="email" />
              <FormHelperText>{formik.errors.email}</FormHelperText>
            </FormControl>

            <FormControl isInvalid={formik.errors.password}>
              <FormLabel mt="4" htmlFor="inputPassword">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  type={passwordVisible ? 'text' : 'password'}
                  id="inputPassword"
                  onChange={inputHandler}
                  name="password"
                  bgColor="white"
                  //
                />
                <InputRightElement
                  children={<Icon fontSize="xl" onClick={() => setPasswordVisible(!passwordVisible)} as={passwordVisible ? IoMdEyeOff : IoMdEye} sx={{ _hover: { cursor: 'pointer' } }} />}
                  //
                />
              </InputGroup>
              <FormHelperText>{formik.errors.password}</FormHelperText>
            </FormControl>
          </Stack>

          <Stack m="4">
            <Button
              onClick={formik.handleSubmit}
              type="submit"
              colorScheme="blue"
              disabled={formik.isSubmitting}
              //
            >
              Sign Up
            </Button>
          </Stack>
        </Box>
      </form>
    </Flex>
  );
};

export default register;
