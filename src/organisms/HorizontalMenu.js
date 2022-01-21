import React, { Fragment } from 'react'
import { Text, Flex, Box, Image, Button } from '@chakra-ui/react'
import { sortBy, compose, map } from 'ramda'
import NavItem from '../molecules/NavItem'
export default ({
  menu,
  selected,
  nav,
  style,
  border,
  borderPosition = 'b'
}) => {
  return compose(
    map(v => (
      <NavItem
        {...{
          borderPosition,
          nav,
          border,
          style,
          item: v,
          selected: selected === v.key
        }}
      />
    )),
    sortBy(v => v.index * 1)
  )(menu)
}
