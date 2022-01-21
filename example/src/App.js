import React, { useEffect, useState } from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import Highlight from 'react-highlight.js'
import { FaEthereum, FaTwitter } from 'react-icons/fa'
import {
  ChakraProvider,
  Text,
  Flex,
  Box,
  Image,
  Button
} from '@chakra-ui/react'
import { map, range, append, isNil, slice, concat } from 'ramda'
import { Nav } from 'atm2'
import GithubCSS from './GithubCSS'
import Dracula from './Dracula'
export default proeps => {
  const positions = [
    'top',
    'top-right',
    'top-left',
    'bottom',
    'bottom-right',
    'bottom-left'
  ]
  const status = ['info', 'success', 'error', 'warning']
  const colors = [
    '#001f3f',
    '#0074D9',
    '#39CCCC',
    '#B10DC9',
    '#F012BE',
    '#85144b',
    '#FF4136',
    '#FF851B',
    '#3D9970',
    '#2ECC40',
    '#111111'
  ]
  const top_icons = [
    'fas fa-fighter-jet',
    'fas fa-rocket',
    'fas fa-space-shuttle',
    'fas fa-helicopter'
  ]
  const bottom_icons = [
    'fas fa-car',
    'fas fa-car-side',
    'fas fa-car-alt',
    'fas fa-truck-pickup',
    'fas fa-truck-moving',
    'fas fa-trailer',
    'fas fa-shipping-fast',
    'fas fa-train',
    'fas fa-subway'
  ]
  const side_icons = [
    'fa fa-dog',
    'fa fa-fish',
    'fa fa-spider',
    'fa fa-dragon',
    'fa fa-frog',
    'fa fa-dove',
    'fa fa-crow',
    'fa fa-kiwi-bird',
    'fa fa-horse-head',
    'fa fa-cat',
    'fa fa-horse',
    'fa fa-otter',
    'fa fa-hippo'
  ]
  const [nav, setNav] = useState({ modal: {} })
  const [tSelected, setTSelected] = useState('tmenu2')
  const [sSelected, setSSelected] = useState('github')
  const [bSelected, setBSelected] = useState('bmenu3')
  const [highlight, setHighlight] = useState(getRand(colors))
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(null)
  const [_cmenu, setCmenu] = useState([])
  const [_smenu, setSmenu] = useState([])
  const [amenu, setAmenu] = useState(
    map(i => {
      const id = `tmenu${i + 1}`
      return { key: id, title: `Avatar Menu ${i + 1}` }
    })(range(0, 3))
  )
  const [tmenu, setTmenu] = useState(
    map(i => {
      const id = `tmenu${i + 1}`
      return {
        key: id,
        name: `Top ${i + 1}`,
        icon: getRand(top_icons),
        onClick: () => setTSelected(id)
      }
    })(range(0, 3))
  )
  const [bmenu, setBmenu] = useState(
    map(i => {
      const id = `bmenu${i + 1}`
      return {
        key: id,
        name: `Bottom ${i + 1}`,
        icon: getRand(bottom_icons),
        onClick: () => setBSelected(id)
      }
    })(range(0, 3))
  )
  const cmenu = [
    {
      name: 'Loading',
      icon: 'fas fa-circle-notch',
      onClick: () => {
        setLoading('Loading...')
        setTimeout(() => setLoading(null), 2000)
      }
    },
    {
      name: 'Modal',
      icon: 'fas fa-window-maximize',
      onClick: () => {
        nav.modal.onOpen()
      }
    },
    {
      name: 'Full Screen',
      icon: nav.isFullscreen
        ? 'fas fa-compress-arrows-alt'
        : 'fas fa-expand-arrows-alt',
      onClick: () => {
        nav.fullscreen.toggle()
      }
    }
  ]
  function getRand(opts) {
    return opts[Math.floor(Math.random() * opts.length)]
  }
  function addAlert(text = 'This is Asteroid UI!', status = 'info') {
    setAlerts(
      append(
        {
          key: 'alert' + Date.now(),
          title: 'Alert',
          status,
          description: text,
          close: true
        },
        alerts
      )
    )
  }
  const smenu = [
    {
      key: 'theme',
      name: 'Theme',
      icon: 'fas fa-palette',
      children: [
        {
          key: 'change color',
          name: 'Change Color',
          onClick: () => setHighlight(getRand(colors))
        }
      ]
    },
    {
      key: 'top-menu',
      name: 'Top Menu',
      icon: 'fas fa-arrow-alt-circle-up',
      children: [
        {
          key: 'add-top',
          name: 'Add Item',
          onClick: () => {
            let id = 'tmenu' + (tmenu.length + 1)
            setTmenu(
              append(
                {
                  key: id,
                  name: `Top ${tmenu.length + 1}`,
                  icon: getRand(top_icons),
                  onClick: () => {
                    setTSelected(id)
                  }
                },
                tmenu
              )
            )
          }
        },
        {
          key: 'remove-top',
          name: 'Remove Item',
          onClick: () => {
            setTmenu(slice(0, -1, tmenu))
          }
        }
      ]
    },
    {
      key: 'bottom-menu',
      name: 'Bottom Menu',
      icon: 'fas fa-arrow-alt-circle-down',
      children: [
        {
          key: 'add-bottom',
          name: 'Add Item',
          onClick: () => {
            let id = 'bmenu' + (bmenu.length + 1)
            setBmenu(
              append(
                {
                  key: id,
                  name: `Bottom ${bmenu.length + 1}`,
                  icon: getRand(bottom_icons),
                  onClick: () => setBSelected(id)
                },
                bmenu
              )
            )
          }
        },
        {
          key: 'remove-bottom',
          name: 'Remove Item',
          onClick: () => {
            setBmenu(slice(0, -1, bmenu))
          }
        }
      ]
    },
    {
      key: 'smenu',
      name: 'Side Menu',
      icon: 'fas fa-arrow-alt-circle-left',
      children: [
        {
          key: 'add-side',
          name: 'Add Item',
          onClick: () => {
            let id = 'smenu' + (_smenu.length + 1)
            setSmenu(
              append(
                {
                  key: id,
                  name: `Side ${_smenu.length + 1}`,
                  icon: getRand(side_icons),
                  onClick: () => setSSelected(id)
                },
                _smenu
              )
            )
          }
        },
        {
          key: 'remove-side',
          name: 'Remove Item',
          onClick: () => {
            setSmenu(slice(0, -1, _smenu))
          }
        }
      ]
    },
    {
      key: 'circle',
      name: 'Circle Menu',
      icon: 'far fa-circle',
      children: [
        {
          key: 'add-circle',
          name: 'Add Item',
          onClick: () => {
            let id = 'cmenu' + (_cmenu.length + 1)
            setCmenu(
              append(
                {
                  key: id,
                  name: `Circle ${_cmenu.length + 1}`,
                  icon: 'far fa-circle'
                },
                _cmenu
              )
            )
          }
        },
        {
          key: 'remove-circle',
          name: 'Remove Item',
          onClick: () => {
            setCmenu(slice(0, -1, _cmenu))
          }
        }
      ]
    },
    {
      key: 'avatar-menu',
      name: 'Avatar Menu',
      icon: 'fas fa-user',
      children: [
        {
          key: 'add-avatar',
          name: 'Add Item',
          onClick: () => {
            let id = 'amenu' + (amenu.length + 1)
            setAmenu(
              append(
                {
                  key: id,
                  title: `Avatar Menu ${amenu.length + 1}`
                },
                amenu
              )
            )
          }
        },
        {
          key: 'remove-avatar',
          name: 'Remove Item',
          onClick: () => {
            setAmenu(slice(0, -1, amenu))
          }
        }
      ]
    },
    {
      key: 'toast',
      name: 'Toasts',
      icon: 'fas fa-bread-slice',
      children: [
        {
          key: 'add-success',
          name: 'Success Toast',
          onClick: () => {
            nav.toast({
              title: 'Success Toast',
              description: 'Toast successfully added!',
              status: 'success',
              duration: 9000,
              isClosable: true
            })
          }
        },
        {
          key: 'add-error',
          name: 'Error Toast',
          onClick: () => {
            nav.toast({
              title: 'Error Toast',
              description: 'Something went wrong...',
              status: 'error',
              duration: 9000,
              isClosable: true
            })
          }
        },
        {
          key: 'add-warning',
          name: 'Warning Toast',
          onClick: () => {
            nav.toast({
              title: 'Warning Toast',
              description: 'You have been warned!',
              status: 'warning',
              duration: 9000,
              isClosable: true
            })
          }
        },
        {
          key: 'add-info',
          name: 'Info Toast',
          onClick: () => {
            nav.toast({
              title: 'Info Toast',
              description: 'FYI: You are awesome!',
              status: 'info',
              duration: 9000,
              isClosable: true
            })
          }
        },
        {
          key: 'add-random',
          name: 'Random Position',
          onClick: () => {
            nav.toast({
              title: 'Random Toast',
              description: 'Wow, you are lucky!',
              status: getRand(status),
              position: getRand(positions),
              duration: 9000,
              isClosable: true
            })
          }
        }
      ]
    },
    {
      key: 'alert',
      name: 'Alerts',
      icon: 'fas fa-exclamation-triangle',
      children: [
        {
          key: 'add-success',
          name: 'Success Alert',
          onClick: () => addAlert('Asteroid UI is awesome!', 'success')
        },
        {
          key: 'add-error',
          name: 'Error Alert',
          onClick: () => addAlert('Asteroid UI is terrible!', 'error')
        },
        {
          key: 'add-warning',
          name: 'Warning Alert',
          onClick: () => addAlert('Asteroid UI is dangerous!', 'warning')
        },
        {
          key: 'add-info',
          name: 'Info Alert',
          onClick: () => addAlert()
        }
      ]
    },
    {
      key: 'github',
      name: 'Github',
      href: 'https://github.com/asteroid-dao/asteroid-ui',
      icon: 'fab fa-github',
      target: '_blank'
    }
  ]
  const modal = {
    title: 'This is a Modal',
    body: 'Do you want to close this modal?',
    footer: [
      { title: 'Close', scheme: 'blue', onClick: nav.modal.onClose },
      {
        title: 'Keep it Open',
        variant: 'ghost',
        onClick: () => {
          nav.toast({
            title: 'Keeping it Open',
            description: 'Let us know when you want to close it!',
            status: 'info',
            duration: 9000,
            isClosable: true
          })
        }
      }
    ]
  }
  return (
    <ChakraProvider>
      <Nav
        {...{
          loading,
          alerts,
          setAlerts,
          modal: modal,
          setNav,
          bmenu,
          bmenu_selected: bSelected,
          tmenu_selected: tSelected,
          smenu_selected: sSelected,
          tmenu,
          smenu: concat(smenu, _smenu),
          cmenu: concat(cmenu, _cmenu),
          style: {
            highlight,
            brand: { p: 2 },
            logo: { borderRadius: '50%' }
          },
          avatar: {
            src: 'https://picsum.photos/100/100',
            title: 'Asteroid UI'
          },
          logo: 'https://picsum.photos/50/50',
          appname: (
            <>
              <Box as='span' mr={2} color='#aaa'>
                Asteroid
              </Box>
              <Box as='span'>UI</Box>
            </>
          ),
          dropdown: amenu
        }}
      >
        <GithubCSS />
        <Dracula />
        <Box p='30px' w='100%'>
          <Box className='markdown-body'>
            <h1>Asteroid UI for React</h1>
            <p>
              Asteroid UI aims to accelerate rapid prototyping of any web/mobile
              apps by providing a ready-to-use skeleton.
              <br />
              It's build with the atomic design paradigm in mind.
              <br />
              To grasp what's possible with Asteroid UI, you can play around
              with this page.
            </p>
            <Alert status='warning'>
              <AlertIcon />
              <AlertTitle mr={2}>Asteroid UI is in its infancy</AlertTitle>
              <AlertDescription>
                I don't recommend to use it in production (yet).
              </AlertDescription>
            </Alert>
            <h2>Installation</h2>
            <Highlight language='bash'>yarn add asteroid-ui</Highlight>
            <p>
              Add these 2 tags to HTML <code>head</code>.
            </p>
            <Highlight language='html'>{`<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
/>
<link
  key="fontawesome"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
  rel="stylesheet"
/>`}</Highlight>
            <h2>How to Use</h2>
            <p>
              <code>setNav</code> will be populated with various useful states
              and functions to menipurate the UI.
            </p>
            <Highlight language='javascript'>{`import React, { useState } from "react"
import { Nav } from 'asteroid-ui'

export default () =>{
  const [nav, setNav] = useState({ modal: {} })
  return <Nav {...{ setNav }}>app body</Nav>
}
`}</Highlight>
            <h3>Nav Props</h3>
            <Alert status='warning' mb={4}>
              <AlertIcon />
              <AlertTitle mr={2}>These props are subject to change</AlertTitle>
              <AlertDescription>
                but check out the example app for how to use them.
              </AlertDescription>
            </Alert>
            <ul>
              <li>setNav</li>
              <li>style</li>
              <li>logo</li>
              <li>appname</li>
              <li>avatar</li>
              <li>dropdown</li>
              <li>loading</li>
              <li>modal</li>
              <li>alerts</li>
              <li>setAlerts</li>
              <li>tmenu</li>
              <li>bmenu</li>
              <li>smenu</li>
              <li>cmenu</li>
              <li>tmenu_selected</li>
              <li>bmenu_selected</li>
              <li>smenu_selected</li>
            </ul>
            <h2>Change Themes</h2>
            <p>
              The simplest way to change the look is to specify the
              <code>style.highlight</code> prop.
            </p>
            <Flex wrap='wrap'>
              {map(v => (
                <Box
                  borderRadius='50%'
                  cursor='pointer'
                  _hover={{ opacity: 0.75 }}
                  boxSize='50px'
                  bg={v}
                  m={2}
                  onClick={() => {
                    setLoading('Changing Colors...')
                    setTimeout(() => {
                      setLoading(null)
                      nav.toast({
                        title: 'Theme Changed',
                        description: 'The 1s wait was totally unnecessary.',
                        status: 'success',
                        duration: 9000,
                        isClosable: true
                      })
                    }, 1000)
                    setHighlight(v)
                  }}
                />
              ))(colors)}
            </Flex>
            <h2>Fullscreen Mode</h2>
            <p>
              <code>nav.fullscreen.toggle()</code> toggles fullscreen mode, and{' '}
              <code>nav.isFullscreen</code> indicates if the app is in
              fullscreen mode.
            </p>
            <Button
              bg={highlight}
              color='white'
              onClick={() => nav.fullscreen.toggle()}
            >
              Toggle Fullscreen
            </Button>
            <h2>Loading</h2>
            <p>
              Give <code>loading</code> prop to <code>Nav</code> to block the
              entire screen.
            </p>
            <Button
              bg={highlight}
              color='white'
              onClick={() => {
                setLoading('Loading something...')
                setTimeout(() => {
                  setLoading(null)
                }, 1000)
              }}
            >
              Load Something for 1s
            </Button>
            <h2>Toasts</h2>
            <p>
              With <code>nav.toast</code>, toasts can be popped up in 4 variants
              <code>( success | error | warning | info )</code> at 6 locations{' '}
              <code>
                ( top | left | bottom | right | top-left | top-right |
                bottom-left | bottom-right )
              </code>
              .
            </p>
            <Flex wrap='wrap'>
              <Button
                mr={3}
                mb={4}
                bg='#38A169'
                color='white'
                onClick={() => {
                  nav.toast({
                    title: 'Random Toast',
                    description: 'Wow, you are lucky!',
                    status: 'success',
                    position: getRand(positions),
                    duration: 9000,
                    isClosable: true
                  })
                }}
              >
                Success Toast
              </Button>
              <Button
                mr={3}
                mb={4}
                bg='#E53E3E'
                color='white'
                onClick={() => {
                  nav.toast({
                    title: 'Error Toast',
                    description: 'Wow, you are lucky!',
                    status: 'error',
                    position: getRand(positions),
                    duration: 9000,
                    isClosable: true
                  })
                }}
              >
                Error Toast
              </Button>
              <Button
                mr={3}
                mb={4}
                bg='#DD6B20'
                color='white'
                onClick={() => {
                  nav.toast({
                    title: 'Warning Toast',
                    description: 'Wow, you are lucky!',
                    status: 'warning',
                    position: getRand(positions),
                    duration: 9000,
                    isClosable: true
                  })
                }}
              >
                Warning Toast
              </Button>
              <Button
                mb={4}
                bg='#3182CE'
                color='white'
                onClick={() => {
                  nav.toast({
                    title: 'Info Toast',
                    description: 'Wow, you are lucky!',
                    status: 'info',
                    position: getRand(positions),
                    duration: 9000,
                    isClosable: true
                  })
                }}
              >
                Info Toast
              </Button>
            </Flex>
            <Highlight language='javascript'>{`nav.toast({
  title: "Toast Title",
  description: "Toast Body",
  position: "bottom",
  status: "success",
  duration: 9000,
  isClosable: true
})`}</Highlight>
            <h2>Alerts</h2>
            <p>
              Alerts can be displayed at the bigining of the page in 4 variants
              <code>( success | error | warning | info )</code> by giving{' '}
              <code>alerts</code> prop to <code>Nav</code>.
            </p>
            <Flex wrap='wrap'>
              <Button
                mr={3}
                mb={4}
                bg='#38A169'
                color='white'
                onClick={() => {
                  addAlert('Asteroid UI is awesome!', 'success')
                }}
              >
                Success Alert
              </Button>
              <Button
                mr={3}
                mb={4}
                bg='#E53E3E'
                color='white'
                onClick={() => {
                  addAlert('Asteroid UI is awesome!', 'error')
                }}
              >
                Error Alert
              </Button>
              <Button
                mr={3}
                mb={4}
                bg='#DD6B20'
                color='white'
                onClick={() => {
                  addAlert('Asteroid UI is awesome!', 'warning')
                }}
              >
                Warning Alert
              </Button>
              <Button
                mb={4}
                bg='#3182CE'
                color='white'
                onClick={() => {
                  addAlert('Asteroid UI is awesome!', 'info')
                }}
              >
                Info Alert
              </Button>
            </Flex>
            <Highlight language='javascript'>{`{
  key: 'add-success',
  name: 'Success Alert',
  onClick: () => addAlert('Asteroid UI is awesome!', 'success')
}`}</Highlight>
            <h2>Modal</h2>
            <p>
              Modal can be displayed by giving <code>modal</code> prop to{' '}
              <code>Nav</code>, and execute <code>nav.modal.onOpen()</code>.
            </p>
            <Flex wrap='wrap'>
              <Button
                mr={3}
                mb={4}
                bg={highlight}
                color='white'
                onClick={() => {
                  nav.modal.onOpen()
                }}
              >
                Show Modal
              </Button>
            </Flex>
            <Highlight language='javascript'>{`{
  title: 'This is a Modal',
  body: 'Do you want to close this modal?',
  footer: [
    { title: 'Close', scheme: 'blue', onClick: nav.modal.onClose },
    {
      title: 'Keep it Open',
      variant: 'ghost',
      onClick: () => {}
    }
  ]
}`}</Highlight>
          </Box>
        </Box>
      </Nav>
    </ChakraProvider>
  )
}
