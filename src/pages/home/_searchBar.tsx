
import { Anchor, Box, Button, Heading, TextInput } from 'grommet'
import { Search } from 'grommet-icons'
import * as React from 'react'
import styled from 'styled-components'

// override grommet with styled-components
const FullHeading = styled(Heading)` max-width: 100%`
const ItalicHeading = styled(FullHeading)` font-variant: italic`

const SearchBar = () => (
  <>
    <FullHeading level={3} margin="none">
      Search millions of opinions by case name, topic, or citation.
    </FullHeading>
    <FullHeading level={5} margin="none">
      403 Jurisdictions. Sponsored by the Non-Profit Free Law Project.
    </FullHeading>
    <Box width="large" direction="row" align="center" round="small" border="all" pad="medium">
      <TextInput type="search" plain={true} />
      <Button
        icon={<Search />}
        label="Search"
        color="accent-2"
        primary={true}
        onClick={() => {}}
        />
      </Box>
    <ItalicHeading level={4} margin='none'>
      - or -
    </ItalicHeading>
    <Anchor
      href="/opinion"
      label={<FullHeading level={4} margin='none'>Advanced Search</FullHeading>}
    />
  </>
)

export default SearchBar
