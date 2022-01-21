import React, { Fragment } from 'react'
import { Flex } from '@chakra-ui/react'
import SideNavItem from '../molecules/SideNavItem'
import { map, compose, assoc, sortBy } from 'ramda'
export default ({
  setOpenMenus,
  openMenus,
  menu,
  selected_key,
  height,
  nav,
  style
}) => {
  return (
    <Flex
      bg='white'
      w='100%'
      display={nav.side === 0 ? 'none' : 'flex'}
      direction='column'
      zIndex={4}
    >
      {compose(
        map(v => (
          <SideNavItem
            {...{
              height,
              item: v,
              nav,
              style,
              selected: v.key === selected_key,
              selected_key,
              isOpen: openMenus[v.key],
              openMenu: item => {
                setOpenMenus(
                  assoc(item.key, !(openMenus[v.key] === true))(openMenus)
                )
              }
            }}
          />
        )),
        sortBy(v => v.index * 1)
      )(menu)}
      <Flex flex={1} />
    </Flex>
  )
}
