import React, { Fragment } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import SideNavItem from '../molecules/SideNavItem'
import { map, compose, assoc, sortBy } from 'ramda'
import { isNil } from 'ramda'
export default ({
  setOpenMenus,
  openMenus,
  tabs,
  menu,
  selected_key,
  height,
  item_height,
  nav,
  style,
  tab_selected
}) => {
  return (
    <Flex
      bg='white'
      w='100%'
      display={nav.side === 0 ? 'none' : 'flex'}
      direction='column'
      zIndex={4}
    >
      {!isNil(tabs) ? (
        <Flex width='100%'>
          <Flex
            display={nav.side === 1 ? 'flex' : 'none'}
            width='57px'
            height='35px'
            justify='center'
            align='center'
            fontSize='20px'
            sx={{ cursor: 'pointer', ':hover': { opacity: 0.75 } }}
            onClick={() => {
              if (nav.side === 1) {
                nav.setOpen.toggle()
                nav.setSide(2)
              }
            }}
          >
            <Box as='i' className={'fas fa-bars'} />
          </Flex>
          {map(v => {
            const selected = tab_selected === v.key
            return (
              <Flex
                display={nav.side !== 1 ? 'flex' : 'none'}
                opacity={nav.opacity ? 1 : 0}
                flex={1}
                bg={selected ? style.highlight : '#eee'}
                color={selected ? 'white' : ''}
                sx={{
                  cursor: selected ? 'default' : 'pointer',
                  ':hover': { opacity: selected ? 1 : 0.75 }
                }}
                onClick={v.onClick}
                height='35px'
                justify='center'
                align='center'
              >
                <Box display={nav.opacity ? 'span' : 'none'}>{v.name}</Box>
              </Flex>
            )
          })(tabs)}
        </Flex>
      ) : null}
      {compose(
        map(v => (
          <SideNavItem
            {...{
              height,
              item: v,
              item_height,
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
