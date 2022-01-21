import React, { Fragment } from 'react'
import { Text, Flex, Box, Image, Button } from '@chakra-ui/react'
import { isNil } from 'ramda'
export default ({
  nav,
  border,
  style,
  item,
  selected,
  borderPosition = 'b'
}) => {
  return (
    <Box
      display={nav.side === 2 && nav.bp !== 2 ? 'none' : 'flex'}
      opacity={
        nav.bp === 2 ? 1 : nav.side === 2 || nav.opacityG === false ? 0 : 1
      }
      href={item.href}
      as={!isNil(item.href) ? 'a' : ''}
      target={item.target}
      bg='white'
      justifyContent='center'
      flex={1}
      alignItems='center'
      {...{
        [`border${borderPosition === 't' ? 'Top' : 'Bottom'}`]: selected
          ? `3px solid ${style.highlight}`
          : border
      }}
      flexDirection={['column', null, null, null, 'row']}
      color={selected ? style.highlight : style.text}
      cursor='pointer'
      sx={{ ':hover': { opacity: 0.75 } }}
      onClick={() => {
        if (!isNil(item.onClick)) item.onClick()
      }}
      transition='border .3s, opacity .5s'
    >
      <Box
        fontSize={['12px', null, null, null, '16px']}
        className={item.icon || 'fas fa-home'}
        mr={[0, null, null, null, 3]}
        mb={[2, null, null, null, 0]}
      />
      <Box textAlign='center' fontSize={['11px', null, null, null, '16px']}>
        {item.name}
      </Box>
    </Box>
  )
}
