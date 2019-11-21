import * as React from 'react'
import { Box, Heading, Text } from 'grommet'

const Opinion = ({ link, caption, dateFiled, status, docketNumber }) => (
  <>
    <Anchor href={link} label={caption}/>
    <Text size="small">`Date Filed: ${dateFiled}`</Text>
    <Text size="small">`Status: ${status}`</Text>
    <Text size="small">`Docket Number: ${docketNumber}`</Text>
  </>
)

const LatestOpinions = (data) => (
  <Box>
    {data.map((opinion, index) => <Opinion key=`top_five_${index}` {...opinion} />)}
  </Box>
)

export default LatestOpinions
