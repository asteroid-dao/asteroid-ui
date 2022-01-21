import React from 'react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Text, Flex, Box, Image, Button } from '@chakra-ui/react'
import { map, isNil, compose, sortBy } from 'ramda'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider
} from '@chakra-ui/react'

export default ({ avatar, dropdown }) => {
  return isNil(avatar) ? null : (
    <Flex width='60px'>
      <Menu>
        <MenuButton
          p={0}
          cursor='pointer'
          _hover={{ opacity: 0.75 }}
          title={avatar.title}
        >
          <Image
            cursor='pointer'
            sx={{ ':hover': { opacity: 0.75 } }}
            borderBottom='3px solid #eee'
            boxSize='60px'
            src={avatar.src}
          />
        </MenuButton>
        {isNil(dropdown) ? null : (
          <MenuList>
            {compose(
              map(v =>
                v.type === 'divider' ? (
                  <MenuDivider />
                ) : (
                  <MenuItem
                    key={v.title}
                    onClick={v.onClick}
                    as={!isNil(v.href) ? 'a' : ''}
                    href={v.href}
                    target={v.target}
                  >
                    {v.title}
                  </MenuItem>
                )
              ),
              sortBy(v => v.index * 1)
            )(dropdown)}
          </MenuList>
        )}
      </Menu>
    </Flex>
  )
}
