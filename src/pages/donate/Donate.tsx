import { Box } from 'grommet'
import * as React from 'react'
import withLayout from '../../root/layout/withLayout'
import DonateForm from './_form2'

const Donate = () => (
  <Box>
    <DonateForm />
  </Box>
)

export default withLayout(Donate)
