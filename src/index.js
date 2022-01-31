import React, { Fragment } from 'react'
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { use100vh } from 'react-div-100vh'
import { useEffect, useState } from 'react'

import Div100vh from 'react-div-100vh'
import {
  useBoolean,
  useBreakpointValue,
  Text,
  Flex,
  Box,
  Image,
  Button,
  ChakraProvider,
  useDisclosure
} from '@chakra-ui/react'
import {
  is,
  map,
  range,
  propEq,
  reject,
  append,
  isNil,
  mergeLeft,
  assoc,
  compose,
  sortBy
} from 'ramda'

const default_style = {
  highlight: '#CD5C5C',
  primary: '#9B2C2C',
  text: '#1A202C'
}

import { useToast } from '@chakra-ui/react'
import AvatarMenu from './organisms/AvatarMenu'
import TopMenu from './organisms/TopMenu'
import CircleMenu from './organisms/CircleMenu'
import SideMenu from './organisms/SideMenu'
import HorizontalMenu from './organisms/HorizontalMenu'
import Modal from './organisms/Modal'
import Alerts from './organisms/Alerts'
import Brand from './atoms/Brand'
import Title from './atoms/Title'
import Loading from './molecules/Loading'

const AtomicNav = ({
  setStates,
  brand,
  smenu,
  tmenu,
  bmenu,
  cmenu,
  title,
  border,
  height,
  alerts = [],
  setAlerts,
  children,
  style = {},
  loading,
  isBmenu
}) => {
  const _style = mergeLeft(style, default_style)
  const variant = useBreakpointValue({
    base: 0,
    md: 1,
    xl: 2
  })
  const [modal, setModal] = useState(null)
  const [bp, setBP] = useState(2)
  const [side, setSide] = useState(2)
  const [open, setOpen] = useBoolean()
  const [isCmenu, setIsCmenu] = useBoolean()
  const [fullscreen, setFullscreen] = useBoolean()
  const [opacity, setOpacity] = useState(true)
  const [opacityC, setOpacityC] = useState(true)
  const [opacityF, setOpacityF] = useState(true)
  const [opacityG, setOpacityG] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const height_vh = use100vh()
  useEffect(() => {
    if (is(Function)(setStates))
      setStates({
        setModal,
        setOpen,
        setSide,
        bp,
        open,
        side,
        opacity,
        opacityC,
        opacityF,
        opacityG,
        modal: { isOpen, onOpen, onClose },
        toast,
        isFullscreen: fullscreen,
        fullscreen: setFullscreen,
        height:
          height_vh -
          (!fullscreen ? height.replace(/px/, '') * 1 : 0) -
          (fullscreen || !isBmenu ? 0 : height.replace(/px/, '') * 1)
      })
  }, [
    height_vh,
    side,
    open,
    opacity,
    opacityG,
    opacityC,
    opacityF,
    fullscreen,
    isOpen,
    bp,
    isBmenu
  ])

  useEffect(() => {
    setBP(variant)
    if (!open) setSide(variant)
  }, [variant])

  useEffect(() => {
    let to = null
    try {
      clearTimeout(to)
    } catch (e) {}
    if (side !== 2) {
      setOpacity(false)
    } else {
      to = setTimeout(() => {
        setOpacity(true)
      }, 500)
    }
  }, [side])

  useEffect(() => {
    let to = null
    try {
      clearTimeout(to)
    } catch (e) {}
    if (side === 2) {
      setOpacityG(false)
    } else {
      to = setTimeout(() => {
        setOpacityG(true)
      }, 500)
    }
  }, [side])

  useEffect(() => {
    let to = null
    try {
      clearTimeout(to)
    } catch (e) {}
    if (fullscreen) {
      setOpacityF(false)
    } else {
      to = setTimeout(() => {
        setOpacityF(true)
      }, 0)
    }
  }, [fullscreen])

  useEffect(() => {
    let to = null
    try {
      clearTimeout(to)
    } catch (e) {}
    if (!isCmenu) {
      setOpacityC(false)
    } else {
      to = setTimeout(() => {
        setOpacityC(true)
      }, 0)
    }
  }, [isCmenu])

  const toggleSide = () => {
    switch (side) {
      case 0: {
        setSide(variant === 0 ? 2 : variant)
        if (variant === 0) setOpen.toggle()
        break
      }
      case 1: {
        if (variant === 1) setOpen.toggle()
        setSide(variant === 1 ? 2 : 0)
        break
      }
      case 2: {
        if (variant !== 2) setOpen.toggle()
        setSide(variant)
        break
      }
    }
  }

  return (
    <Div100vh>
      <style global jsx>{`
        /* ===== Scrollbar CSS ===== */
        /* Firefox */
        * {
          scrollbar-width: 5px;
          scrollbar-color: #b3afb3 #ffffff;
        }

        /* Chrome, Edge, and Safari */
        *::-webkit-scrollbar {
          width: 5px;
        }

        *::-webkit-scrollbar-track {
          background: #ddd;
        }

        *::-webkit-scrollbar-thumb {
          background-color: #b3afb3;
          border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: ${style.highlight};
        }
      `}</style>
      <Flex
        color={_style.text}
        zIndex='sticky'
        position='fixed'
        w='100%'
        h={height}
        display={fullscreen ? 'none' : 'flex'}
        opacity={opacityF ? 1 : 0}
        transition='opacity .5s'
      >
        <Flex
          w={side === 2 ? '250px' : height}
          transition='width .5s'
          borderBottom={border}
          bg='white'
        >
          <Flex
            boxSize={`calc(${height} - 3px)`}
            color='red.300'
            justify='center'
            align='center'
            onClick={toggleSide}
            sx={{ cursor: 'pointer', ':hover': { opacity: 0.75 } }}
          >
            {bp === 2 ? (
              <Brand
                {...{
                  logo: brand,
                  style: mergeLeft(_style.brand || {}, { p: 3 })
                }}
              />
            ) : open ? (
              <Box
                color={_style.highlight}
                as='i'
                className='fas fa-angle-double-left'
              />
            ) : (
              <Box
                color={_style.highlight}
                as='i'
                className='fas fa-angle-double-right'
              />
            )}
          </Flex>
          <Box
            flex={1}
            display={side === 2 ? 'flex' : 'none'}
            width='100%'
            opacity={opacity ? 1 : 0}
          >
            {title}
          </Box>
        </Flex>
        <Flex flex={1} bg='white'>
          {tmenu}
        </Flex>
      </Flex>
      <Flex w='100%' h='100%' direction='column'>
        <Flex flex={1}>
          <Flex
            bg='white'
            display={fullscreen ? 'none' : 'flex'}
            opacity={opacityF ? 1 : 0}
            w={
              bp === 2
                ? '250px'
                : side === 0
                ? 0
                : side === 1 || bp === 1
                ? height
                : 0
            }
            transition='width .5s, opacity .5s'
            mt={fullscreen ? 0 : height}
          ></Flex>
          <Flex flex={1} direction='column' position='relative' width='100%'>
            <Box
              w={`calc(100% - ${
                fullscreen
                  ? '0px'
                  : bp === 2
                  ? '250px'
                  : side === 0
                  ? '0px'
                  : side === 1 || bp === 1
                  ? height
                  : '0px'
              })`}
              position='fixed'
              mt={fullscreen ? 0 : height}
              zIndex={3}
              bg='white'
            >
              <Alerts {...{ alerts, setAlerts }} />
            </Box>
            <Box
              w='100%'
              flex={1}
              mt={`calc(${fullscreen ? '0px' : height} + ${
                alerts.length * 48
              }px)`}
              mb={
                fullscreen || !isBmenu
                  ? 0
                  : `calc(${height} + env(safe-area-inset-bottom))`
              }
              id='main-container'
            >
              {children}
            </Box>
            <Flex
              zIndex={4}
              cursor='pointer'
              onClick={toggleSide}
              display={open && bp !== 2 ? 'block' : 'none'}
              bg='rgba(0,0,0,.5)'
              h='100%'
              position='absolute'
              w='100%'
              top='0'
              left='0'
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        zIndex={4}
        position='fixed'
        left='0'
        top='0'
        bg='white'
        display={fullscreen ? 'none' : 'flex'}
        opacity={opacityF ? 1 : 0}
        w={side === 0 ? 0 : side === 1 ? height : '250px'}
        transition='width .5s, opacity .5s'
        pt={fullscreen ? 0 : height}
        height='100%'
        sx={{ overflowY: 'auto' }}
        borderRight={border}
      >
        {smenu}
      </Flex>
      {isBmenu ? (
        <Box
          w={`calc(100% - ${
            side === 2 ? '250px' : side === 1 ? height : '0px'
          })`}
          ml={side === 2 ? '250px' : side === 1 ? height : 0}
          position='fixed'
          bottom='0'
          left='0'
          display={fullscreen ? 'none' : 'flex'}
          opacity={opacityF ? 1 : 0}
          transition='opacity .5s, margin .5s, width .5s'
          h={`calc(${height} + env(safe-area-inset-bottom))`}
          bg='white'
        >
          <Flex h={height} w='100%'>
            {bmenu}
          </Flex>
        </Box>
      ) : null}
      <CircleMenu
        {...{
          mb: `calc(${
            fullscreen || !isBmenu ? '0px' : height
          } + 10px + env(safe-area-inset-bottom))`,
          isCmenu,
          setIsCmenu,
          style: _style,
          opacityC,
          menu: cmenu
        }}
      />
      {isNil(modal) ? null : !isNil(modal.html) ? (
        <Flex
          zIndex={2000}
          bg='rgba(0,0,0,.5)'
          h='100%'
          position='fixed'
          w='100%'
          height='100%'
          top='0'
          left='0'
          justify='center'
          align='center'
          onClick={() => {
            setModal(null)
          }}
        >
          {modal.html}
        </Flex>
      ) : (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered={true}
          modal={modal}
        />
      )}
      {!isNil(loading) ? <Loading {...{ style, text: loading }} /> : null}
    </Div100vh>
  )
}

const Core = props => (
  <ChakraProvider theme={extendTheme(props.theme || {})}>
    <AtomicNav {...props}>{props.children}</AtomicNav>
  </ChakraProvider>
)

export const Nav = ({
  setNav,
  bmenu = [],
  smenu = [],
  cmenu = [],
  tmenu = [],
  border = '3px solid #eee',
  height = '60px',
  bmenu_selected,
  tmenu_selected,
  smenu_selected,
  style = {},
  alerts,
  setAlerts,
  avatar,
  dropdown,
  appname = 'Atomic UI',
  logo,
  loading,
  children,
  theme,
  side_tabs,
  side_tab_selected,
  nav
}) => {
  const _style = mergeLeft(style, default_style)
  const [_nav, setStates] = useState(nav || { modal: {} })
  useEffect(() => {
    if (!isNil(setNav)) setNav(_nav)
  }, [_nav])
  const [openMenus, setOpenMenus] = useState({})
  const brand = <Image src={logo} sx={{ ...(style.logo || {}) }} />
  const title = <Title {...{ style: _style, appname }} />
  const _smenu = (
    <SideMenu
      {...{
        tab_selected: side_tab_selected,
        setStates,
        tabs: side_tabs,
        nav: _nav,
        height,
        openMenus,
        setOpenMenus,
        menu: smenu,
        selected_key: smenu_selected,
        style: _style
      }}
    />
  )

  const _tmenu = (
    <TopMenu
      {...{
        nav: _nav,
        extra: <AvatarMenu {...{ avatar, dropdown }} />,
        border,
        style: _style,
        menu: tmenu,
        selected: tmenu_selected
      }}
    />
  )

  const _bmenu = (
    <HorizontalMenu
      {...{
        borderPosition: 't',
        menu: bmenu,
        nav,
        border,
        style: _style,
        selected: bmenu_selected
      }}
    />
  )
  return (
    <Core
      {...{
        theme,
        loading,
        brand,
        setStates,
        setAlerts,
        title,
        isBmenu: bmenu.length > 0,
        smenu: _smenu,
        bmenu: _bmenu,
        tmenu: _tmenu,
        cmenu,
        alerts,
        border,
        height,
        style: _style
      }}
    >
      {children}
    </Core>
  )
}
