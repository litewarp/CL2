/** @format */

import { Anchor, Box, Button, Heading, Paragraph, Text } from 'grommet'
import * as React from 'react'
import withLayout from '../root/layout/withLayout'
import DonateForm from './_donateForm'

const Donate = () => (
  <Box align="center">
    <Heading level={3}>Donate to Free Law Project</Heading>
    <Paragraph>
      Support our efforts to make high quality legal data widely available. Help us reform and
      enhance the legal ecosystem.
    </Paragraph>
    <Paragraph>
      CourtListener and RECAP are run by Free Law Project, a U.S. 501(c)(3) non-profit, tax id
      #46-3342480.
    </Paragraph>
    <Button primary label="Donation FAQ" href="/help/donations" />
    <DonateForm />
    <Text size="xxsmall">
      Online donations are considered unrestricted and will be used to support Free Law Project's
      various initiatives as determined by the board of directors. Please{' '}
      {<Anchor href="/contact" label="get in touch" />} if you wish to make a restricted donation
      for a particular purpose.
    </Text>
  </Box>
)

export default withLayout(Donate)
