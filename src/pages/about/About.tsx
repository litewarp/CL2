/** @format */

import { Anchor, Box, Heading, Image, List } from 'grommet'
import * as React from 'react'
import withLayout from '../../root/layout/withLayout'
import { AboutHeader, Contributions, Team } from './_about'

const AboutPage = () => (
  <Box>
    <AboutHeader />
    <Contributions />
    <Team />
  </Box>
)
export default withLayout(AboutPage)
