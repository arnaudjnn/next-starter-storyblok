import { useState } from 'react';
import { useBreakpointValue, Box, Grid, Flex, Button, FormControl, FormLabel, FormErrorMessage, Input, Textarea, Alert, AlertIcon, AlertTitle, AlertDescription, Icon } from '@chakra-ui/react';
import { useForm, Controller }from 'react-hook-form';
import { FiMail } from 'react-icons/fi';
import { BsFillCaretRightFill } from 'react-icons/bs';
import NextLink from 'next/link';

const iconsIndex = {
  Mail: FiMail,
  BsFillCaretRightFill: BsFillCaretRightFill
}

export default function Form({ inputs, submitButton, successMessage, successButtons, flex, iconMobileOnly }) {
  const isTouchScreen = useBreakpointValue({ base: true, lg: false });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })
  
  const handleResponse = (status, errors) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: null }
      })
    } else {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: errors.message }
      })
    }
  }

  const { register, errors, handleSubmit, control } = useForm();

  const onSubmit = async data => {
    setStatus({
      submitted: false,
      submitting: true,
      info: { error: false, msg: null }
    })

    const res = await fetch(`/api${submitButton[0].link.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const json = await res.json()
    handleResponse(res.status, json.errors)
  };

  return (
    <>
      {!status.submitted ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid gridTemplateColumns={flex === 'row' ? ['4fr 1fr', '2fr 1fr'] : '1fr'} gridGap={flex === 'row' ? 0 : 5}>
            {inputs.map(input => {
              if(input.type === 'email') {
                return (
                  <FormControl key={input._uid} isInvalid={errors.email} minHeight="20">
                    {input.label &&
                      <FormLabel htmlFor="email">
                        {input.label}
                      </FormLabel>
                    }
                    <Input
                      name="email"
                      type="email"
                      placeholder={input.placeholder}
                      ref={register({
                        required: true,
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                      size="lg"
                      bg="white"
                      borderRadius={flex === 'row' ? '.5rem 0 0 .5rem' : 'lg'}
                      color="gray.400"
                      _placeholder={{ color: 'gray.400' }}
                    />
                    <FormErrorMessage>
                      {errors.email && errors.email.type === "required" && input.required && input.requiredMessage }
                      {errors.email && errors.email.type === "pattern" && 'Invalid email'}
                    </FormErrorMessage>
                  </FormControl>
                )
              }
            })}
            <Button 
              onClick={handleSubmit(onSubmit)} 
              variant={submitButton[0].variant}
              colorScheme="purple"
              size="lg"
              isLoading={status.submitting}
              width="100%" 
              borderRadius={flex === 'row' ? '0 .5rem .5rem 0' : 'lg'}
              rightIcon={iconMobileOnly && isTouchScreen && <Icon as={iconsIndex[submitButton[0].rightIcon]} />}
            >
              {!status.submitting
                ? !status.submitted
                  ? iconMobileOnly && !isTouchScreen && submitButton[0].text
                  : 'Submitted'
                : 'Submitting'}
            </Button>
          </Grid>
        </form>
      ) : (
        <>
          <Alert
            status="success"
            bg="transparent"
            justifyContent="center"
          >
            <AlertIcon boxSize="40px" mr={5} />
            <AlertTitle fontSize="lg">
              {successMessage}
            </AlertTitle>
          </Alert>
          <Grid justifyItems="center" mt="5">
            {successButtons.map(successButton => (
              <Box key={successButton._uid}>
                <NextLink href={successButton.link.url}>
                  <Button variant={successButton.variant} rightIcon={<Icon as={iconsIndex[successButton.rightIcon]}/>}>{successButton.text}</Button>
                </NextLink>
              </Box>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};