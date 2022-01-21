import React, { Fragment } from 'react'
import { Spinner } from '@chakra-ui/react'
import { Text, Flex, Box, Image, Button } from '@chakra-ui/react'
export default ({ text, style }) => (
  <Flex
    zIndex={2000}
    bg='rgba(0,0,0,.5)'
    h='100%'
    position='fixed'
    w='100%'
    top='0'
    left='0'
    justify='center'
    align='center'
  >
    <Box textAlign='center'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color={style.highlight}
        size='xl'
      />
      <Box color={'white'} mt={3}>
        {text}
      </Box>
    </Box>
  </Flex>
)
