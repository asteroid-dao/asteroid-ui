import React, { Fragment } from 'react'
import { map, isNil } from 'ramda'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'

export default ({ modal, isOpen, onClose, isCentered }) => {
  return (
    <Modal {...{ isOpen, onClose, isCentered }}>
      <ModalOverlay />
      <ModalContent sx={isNil(modal.style) ? {} : modal.style}>
        {isNil(modal.title) ? null : <ModalHeader>{modal.title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{modal.body}</ModalBody>
        {isNil(modal.footer) ? null : (
          <ModalFooter>
            {map(v => (
              <Button
                ml={2}
                onClick={v.onClick}
                variant={v.variant}
                colorScheme={v.scheme}
              >
                {v.title}
              </Button>
            ))(modal.footer)}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}
