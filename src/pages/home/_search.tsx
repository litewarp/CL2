/** @format */

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Anchor, Box, Button, Heading, TextInput } from 'grommet'
import * as React from 'react'
import styled from 'styled-components'

// override grommet with styled-components
const FullHeading = styled(Heading)`
  max-width: 100%;
  text-align: center;
`
const ItalicHeading = styled(FullHeading)`
  font-style: italic;
`

const SearchBar = () => (
  <>
    <FullHeading level={1}>
      Search millions of opinions by case name, topic, or citation.
    </FullHeading>
    <FullHeading level={2}>
      403 Jurisdictions. Sponsored by the Non-Profit Free Law Project.
    </FullHeading>
    <Box
      width="large"
      direction="row"
      align="center"
      round="medium"
      border="all"
      pad={{ vertical: 'small' }}>
      <TextInput type="search" plain />
      <Button
        icon={<FontAwesomeIcon icon={faSearch} />}
        label="Search"
        color="accent-2"
        primary
        onClick={() => ({ result: 'Yay! You searched!' })}
      />
    </Box>
    <ItalicHeading level={4}>- or -</ItalicHeading>
    <Anchor href="/opinion" label={<FullHeading level={4}>Advanced Search</FullHeading>} />
  </>
)

export default SearchBar
