import React, { Fragment } from 'react'
import { Text, Flex, Box, Image, Button } from '@chakra-ui/react'
import { isNil } from 'ramda'
export default ({ style, item, boxSize, fontSize = '25px', opacity = 1 }) => {
  return (
    <Flex
      justify='center'
      align='center'
      boxSize={boxSize}
      borderRadius='50%'
      p={3}
      color={item.color || style.text}
      bg={item.bg || 'gray.200'}
      m={2}
      opacity={opacity}
      transition='opacity .5s, height .5s'
      onClick={item.onClick}
      sx={{
        ':hover': { opacity: 0.75 }
      }}
    >
      <Box>
        <Flex mb={1} justify='center' align='center'>
          <Box className={item.icon || 'fas fa-home'} fontSize={fontSize} />
        </Flex>
        <Box
          width='55px'
          textAlign='center'
          fontSize='10px'
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}
        >
          {item.name}
        </Box>
      </Box>
    </Flex>
  )
}
