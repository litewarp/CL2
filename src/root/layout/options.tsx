import { Anchor, Box, Menu } from 'grommet'
import * as React from 'react'
import { FaHeart } from 'react-icons/fa'

export default () => (
  <Box direction="row" justify="around" align="center" border="horizontal" >
    <Menu
      label="Opinions"
      items={[
        { label: 'Advanced Search', href: '/opinion' },
        { label: 'Citation Look Up', href: '/c' }
      ]}
      size="small"
    />
    <Anchor label="RECAP Archive" size="small" href="recap" color="dark-6"/>
    <Anchor label="Oral Arguments" size="small" href="audio" color="dark-6"/>
    <Anchor label="Judges" size="small" href="person" color="dark-6"/>
    <Menu
      label="Visualizations"
      items={[
        { label: 'Gallery', href: '/visualizations/gallery' },
        { label: 'SCOTUS Networks', href: '/visualizations/scotus-mapper' },
        { label: 'New Network', href: '/visualizations/scotus-mapper/new' }
      ]}
      size="small"
    />
    <Anchor label="Donate" size="small" href="/donate/?referrer=navbar-v2" icon={<FaHeart/>}/>
  </Box>
)
