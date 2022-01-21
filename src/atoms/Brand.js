import React, { Fragment } from 'react'
import { Text, Flex, Box, Image, Button } from '@chakra-ui/react'
export default ({ logo, style = { p: 3 } }) => <Box sx={style}>{logo}</Box>
