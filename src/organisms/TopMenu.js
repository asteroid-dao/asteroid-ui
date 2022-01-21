import React, { Fragment } from 'react'
import { Flex } from '@chakra-ui/react'
import HorizontalMenu from './HorizontalMenu'

export default ({ menu, extra, selected, nav, style, border }) => {
  return (
    <>
      <HorizontalMenu
        {...{ menu, selected, nav, border, style, test: border }}
      />
      {menu.length === 0 || (nav.side === 2 && nav.bp !== 2) ? (
        <Flex
          flex={1}
          {...{
            borderBottom: border
          }}
        />
      ) : null}
      {extra}
    </>
  )
}
