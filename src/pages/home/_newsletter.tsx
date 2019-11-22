import { Box, Button, Heading, Text, TextInput } from 'grommet'
import { Article } from 'grommet-icons'
import * as React from 'react'
import styled from 'styled-components'

const SubscribeButton = styled(Button)`
  border-radius: 0;
  border: 1px solid #444444
  padding-bottom: .25rem;
`
const Newsletter = () => (
  <>
    <Box direction="column">
      <Heading level={6} margin="none">Newsletter</Heading>
      <Text size="small" margin="none">
        Sign up to receive the Free Law Project newsletter with tips and announcements
      </Text>
    </Box>
    <Box direction="row" margin={{ left: 'auto' }}>
      <TextInput placeholder="Email Address" size="xsmall" />
      <SubscribeButton size="small" icon={<Article />} label="Subscribe" onClick={()=>{}}/>
    </Box>
  </>
)

export default Newsletter
