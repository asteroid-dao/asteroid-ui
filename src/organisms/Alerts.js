import React, { Fragment } from 'react'
import { Flex } from '@chakra-ui/react'
import { reject, propEq, map, compose, assoc, sortBy } from 'ramda'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import { CloseButton } from '@chakra-ui/react'
export default ({ alerts, setAlerts }) => {
  return map(v => {
    return (
      <Alert key={v.key} status={v.status || 'info'}>
        <AlertIcon />
        <AlertTitle mr={2}>{v.title}</AlertTitle>
        <AlertDescription>{v.description}</AlertDescription>
        {v.close ? (
          <CloseButton
            position='absolute'
            right='8px'
            top='8px'
            onClick={() => {
              setAlerts(reject(propEq('key', v.key))(alerts))
            }}
          />
        ) : null}
      </Alert>
    )
  })(alerts)
}
