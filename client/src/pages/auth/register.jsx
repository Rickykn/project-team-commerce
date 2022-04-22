import React, { useState } from 'react';
import { Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, Heading, Icon, Input, InputGroup, InputRightElement, Stack, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import axios from 'axios';

const register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();
  // const authSelector = useSelector((state) => state.auth);
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
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
      setTimeout(async () => {
        try {
          const res = await axios.post('http://localhost:2030/auth/register', values);
          toast({
            title: 'success',
            description: res.data.message,
            status: 'success',
          });

          router.push('/');
          return;
        } catch (err) {
          console.log(err);
          toast({
            title: 'error',
            description: err.message,
            status: 'error',
          });
        }
      }, 3000);
      formik.setSubmitting(false);
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  // useEffect(() => {
  //   if (authSelector.id) {
  //     router.push('/');
  //   }
  // }, [authSelector.id]);
  return (
    <Container mt={8} alignItems="center" centerContent py="10">
      <Stack>
        <Box w="sm" bgColor="gray.100" shadow="inner" p="8" borderColor="gray">
          <form>
            <FormControl isInvalid={formik.errors.username}>
              <FormLabel htmlFor="inputUsername">Username</FormLabel>
              <Input bgColor="white" onChange={inputHandler} id="inputUsername" name="username" />
              <FormHelperText>{formik.errors.username}</FormHelperText>
            </FormControl>

            <FormControl isInvalid={formik.errors.email}>
              <FormLabel htmlFor="inputemail">email</FormLabel>
              <Input bgColor="white" onChange={inputHandler} id="inputemail" name="email" />
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

            <Stack mt="10">
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
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default register;
