/** @format */

import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Heading, Text, TextInput } from 'grommet'
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
      <Heading level={6} margin="none">
        Newsletter
      </Heading>
      <Text size="small" margin="none">
        Sign up to receive the Free Law Project newsletter with tips and announcements
      </Text>
    </Box>
    <Box direction="row" margin={{ left: 'auto' }} gap="small">
      <TextInput placeholder="Email Address" size="xsmall" />
      <SubscribeButton
        icon={<FontAwesomeIcon icon={faNewspaper} />}
        label="Subscribe"
        onClick={() => ({ subscribe: 'Yay!' })}
      />
    </Box>
  </>
)

export default Newsletter
