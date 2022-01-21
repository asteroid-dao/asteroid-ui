import React, { Fragment } from 'react'
import { Text, Flex, Box, Image, Button } from '@chakra-ui/react'
export default ({ appname, style }) => (
  <Flex
    as='a'
    color={style.highlight}
    px={3}
    fontSize='25px'
    fontWeight='bold'
    align='center'
    w='100%'
    bg='white'
    href='/'
  >
    {appname}
  </Flex>
)
