
import { Anchor, Box, Button, Heading, TextInput } from 'grommet'
import * as React from 'react'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'

// override grommet with styled-components
const FullHeading = styled(Heading)` max-width: 100%`
const ItalicHeading = styled(FullHeading)` font-style: italic`

const SearchBar = () => (
  <>
    <FullHeading level={3}>
      Search millions of opinions by case name, topic, or citation.
    </FullHeading>
    <FullHeading level={5}>
      403 Jurisdictions. Sponsored by the Non-Profit Free Law Project.
    </FullHeading>
    <Box width="large" direction="row" align="center" round="medium" border="all">
      <TextInput type="search" plain/>
      <Button
        icon={<FaSearch />}
        label="Search"
        color="accent-2"
        primary
        onClick={() => ({ result: 'Yay! You searched!' })}
      />
    </Box>
    <ItalicHeading level={4}>
      - or -
    </ItalicHeading>
    <Anchor
      href="/opinion"
      label={<FullHeading level={4}>Advanced Search</FullHeading>}
    />
  </>
)

export default SearchBar
