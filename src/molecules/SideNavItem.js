import React, { Fragment } from 'react'
import { Text, Flex, Box, Image, Button } from '@chakra-ui/react'
import { is, assoc, compose, map, sortBy, isNil } from 'ramda'

const SideNavItem = ({
  isOpen,
  height,
  child = false,
  nav,
  style,
  item,
  selected,
  selected_key,
  openMenu
}) => {
  return (
    <>
      <Flex
        href={item.href}
        as={!isNil(item.href) ? 'a' : ''}
        target={item.target}
        title={item.name}
        onClick={() => {
          if (!isNil(item.children)) {
            openMenu(item)
            if (nav.side === 1) {
              nav.setOpen.toggle()
              nav.setSide(2)
            }
          } else if (!isNil(item.onClick)) {
            item.onClick()
          }
        }}
        align='center'
        height={child ? '35px' : height}
        cursor='pointer'
        color={selected ? style.highlight : style.text}
        sx={{ ':hover': { opacity: 0.75 } }}
        transition='border .3s'
      >
        <Flex
          boxSize={`calc(${height} - 3px)`}
          justify='center'
          align='center'
          fontSize='20px'
        >
          {child ? null : is(Object)(item.icon) ? (
            <item.icon />
          ) : (
            <Box as='i' className={item.icon || 'fas fa-home'} />
          )}
        </Flex>
        <Box
          w={!isNil(item.children) ? '158px' : '178px'}
          display={nav.side === 2 ? 'block' : 'none'}
          opacity={nav.opacity ? 1 : 0}
        >
          <Text
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {item.name}
          </Text>
        </Box>
        {!isNil(item.children) ? (
          <Box
            flex={1}
            display={nav.side === 2 ? 'block' : 'none'}
            opacity={nav.opacity ? 1 : 0}
            pr={3}
            textAlign='right'
            color={isOpen ? style.highlight : ''}
          >
            <Box
              as='i'
              className={`fas fa-chevron-${isOpen ? 'down' : 'right'}`}
            />
          </Box>
        ) : null}
      </Flex>
      {isOpen !== true || nav.side === 1
        ? null
        : compose(
            map(v => (
              <SideNavItem
                {...{
                  item: v,
                  child: true,
                  nav,
                  style,
                  height,
                  selected: selected_key === v.key
                }}
              />
            )),
            sortBy(v => v.index * 1)
          )(item.children || [])}
    </>
  )
}

export default SideNavItem
