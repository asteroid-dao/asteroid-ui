import React, { Fragment } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { sortBy, map, compose } from 'ramda'
import CircleItem from '../molecules/CircleItem'
export default ({ menu, mb, style, isCmenu, setIsCmenu, opacityC }) => {
  return menu.length === 0 ? null : (
    <Flex
      zIndex={3}
      align='flex-end'
      justify='flex-end'
      cursor='pointer'
      position='fixed'
      bottom='0'
      right='0'
      mx={3}
      wrap='wrap'
      mb={mb}
      transition='margin .5s'
    >
      {!isCmenu
        ? null
        : compose(
            map(v => (
              <CircleItem
                key={v.key}
                {...{ item: v, style, boxSize: '75px' }}
              />
            )),
            sortBy(v => v.index * 1)
          )(menu)}
      <Flex
        boxSize={isCmenu ? '75px' : '60px'}
        borderRadius='50%'
        p={3}
        color={style.text}
        bg='gray.200'
        m={2}
        justify='center'
        align='center'
        cursor='pointer'
        transition='width .5s, height .5s'
        sx={{
          ':hover': { opacity: 0.75 }
        }}
        onClick={() => setIsCmenu.toggle()}
      >
        {isCmenu ? (
          <Box className='fas fa-times' />
        ) : (
          <Box className='fas fa-bars' />
        )}
      </Flex>
    </Flex>
  )
}
