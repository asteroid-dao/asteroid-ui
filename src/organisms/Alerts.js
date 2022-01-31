import React, { Fragment } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { reject, propEq, map, compose, assoc, sortBy, isNil } from 'ramda'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import { CloseButton } from '@chakra-ui/react'
export default ({ alerts, setAlerts }) => {
  return map(v => {
    const alert = (
      <Alert
        key={v.key}
        status={v.status || 'info'}
        onClick={v.onClick}
        cursor={!isNil(v.onClick) || !isNil(v.href) ? 'pointer' : 'default'}
        sx={{
          ':hover': { opacity: !isNil(v.onClick) || !isNil(v.href) ? 0.75 : 1 }
        }}
      >
        <AlertIcon />
        <AlertTitle mr={2}>{v.title}</AlertTitle>
        <AlertDescription>{v.description}</AlertDescription>
        {v.close ? (
          <CloseButton
            position='absolute'
            right='8px'
            top='8px'
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
              setAlerts(reject(propEq('key', v.key))(alerts))
            }}
          />
        ) : null}
      </Alert>
    )
    return !isNil(v.href) ? (
      <Box as='a' href={v.href} target={v.target}>
        {alert}
      </Box>
    ) : (
      alert
    )
  })(alerts)
}
