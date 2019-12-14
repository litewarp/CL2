/** @format */

import { faNewspaper, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InitialProps } from '@jaredpalmer/after'
import { Anchor, Box, Button, CheckBox, Grid, Heading, Paragraph, Text, TextInput } from 'grommet'
import React from 'react'
import Helmet from 'react-helmet'
import { prefetchQuery, useQuery } from 'react-query'
import styled from 'styled-components'
import { fetchLatestAudio, fetchLatestOpinion } from '../../root/api'
import withLayout from '../../root/layout/withLayout'
import { StatelessPage } from '../../typings'
import { ScotusNetwork, TheNumbers } from './_analytics'
import { LatestAudioList, LatestOpinionList } from './_latest'

const links = [
  {
    name: 'courtListener',
    label: 'CourtListener',
    href: 'https://github.com/freelawproject/courtlistener',
  },
  { name: 'freeLawProject', label: 'Free Law Project', href: 'https://free.law' },
  {
    name: 'juriscraper',
    label: 'Juriscraper',
    href: 'https://github.com/freelawproject/juriscraper',
  },
  { name: 'recap', label: 'RECAP', href: 'https://free.law/recap' },
]

const MaxHeading = styled(Heading)`
  max-width: 100%;
`

// workaround: type Component as any
// see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356
const Link: any = ({ name }: { name: string }) => {
  const option = links.find(l => l.name === name)
  return option && <Anchor label={option.label} href={option.href} />
}

const Home: StatelessPage<{}> = () => (
  <>
    <Helmet>
      <title>Non-Profit Free Legal Search Engine and Alert System</title>
    </Helmet>
    <Box gap="medium" align="center" alignSelf="center" width="1440px">
      <MaxHeading responsive level={1}>
        Search millions of opinions by case name, topic, or citation.
      </MaxHeading>
      <MaxHeading responsive level={2}>
        403 Jurisdictions. Sponsored by the Non-Profit Free Law Project.
      </MaxHeading>
      <Box width="large" direction="row" align="center" round="medium" border="all">
        <TextInput type="search" plain />
        <Button
          icon={<FontAwesomeIcon icon={faSearch} />}
          label="Search"
          color="accent-2"
          primary
          onClick={() => ({ result: 'Yay! You searched!' })}
        />
      </Box>
      <Heading level={4}>- or -</Heading>
      <Anchor href="/opinion" label={<Heading level={4}>Advanced Search</Heading>} />

      <Box direction="row" wrap>
        <Box basis="1/2" pad="medium" gap="medium">
          <Heading level={3} margin={{ bottom: 'xsmall' }}>
            About CourtListener
          </Heading>
          <Paragraph
            size="small"
            margin={{ top: 'none', right: 'none', left: 'none', bottom: 'small' }}
            fill>
            CourtListener is a free legal research website containing millions of legal opinions
            from federal and state courts. With CourtListener, lawyers, journalists, academics, and
            the public can research an important case, stay up to date with new opinions as they are
            filed, or do deep analysis using our raw data.
          </Paragraph>
        </Box>
        <Box basis="1/2" pad="medium" gap="medium">
          <Heading level={3} margin={{ bottom: 'xsmall' }}>
            About Free Law Project
          </Heading>
          <Paragraph
            size="small"
            margin={{ top: 'none', right: 'none', left: 'none', bottom: 'small' }}
            fill>
            {<Link name="freeLawProject" />} seeks to provide free access to primary legal
            materials, develop legal research tools, and support academic research on legal corpora.
            We work diligently with volunteers to expand our efforts at building an open source,
            open access, legal research ecosystem. Currently Free Law Project sponsors the
            development of {<Link name="courtListener" />}, {<Link name="juriscraper" />}, and{' '}
            {<Link name="recap" />}
          </Paragraph>
        </Box>

        <Box basis="1/2" pad="medium" gap="medium">
          <LatestOpinionList />
        </Box>
        <Box basis="1/2" pad="medium" gap="medium">
          <LatestAudioList />
        </Box>
        <Box basis="1/2" pad="medium" gap="medium">
          <ScotusNetwork />
        </Box>
        <Box basis="1/2" pad="medium" gap="medium">
          <TheNumbers />
        </Box>

        <Box direction="row" pad="medium" align="center" fill="horizontal">
          <Box direction="column">
            <Heading level={6} margin="none">
              Newsletter
            </Heading>
            <Text size="small" margin="none">
              Sign up to receive the Free Law Project newsletter with tips and announcements
            </Text>
          </Box>
          <Box direction="row" gap="small" margin={{ left: 'auto' }}>
            <TextInput placeholder="Email Address" size="xsmall" />
            <Button
              icon={<FontAwesomeIcon icon={faNewspaper} />}
              label="Subscribe"
              onClick={() => ({ subscribe: 'Yay!' })}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  </>
)

// Call getInitialProps prior to initial render
Home.getInitialProps = async (props: InitialProps) => {
  const latestAudioData = prefetchQuery('latestAudio', fetchLatestAudio)
  const latestOpinionData = prefetchQuery('latestOpinions', fetchLatestOpinion)
  return { ...props, latestAudioData, latestOpinionData }
}

// wrap the page with our layout
export default withLayout(Home)
