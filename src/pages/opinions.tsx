/** @format */
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Anchor, Box, Button, Heading, Paragraph, TextInput } from 'grommet'
import * as React from 'react'
import withLayout from '../root/layout/withLayout'
import OpinionSearchForm from './_opinionSearchForm'

const links = [
  { name: 'freeLawProject', href: 'https://free.law', label: 'Free Law Project' },
  { name: 'publicResourceOrg', label: 'Public.Resource.org', href: 'https://public.resource.org' },
  { name: 'scotusDB', label: 'Supreme Court Database', href: 'https://scdb.wustl.edu' },
  {
    name: 'financialSupport',
    label: 'financial and volunteer support',
    href: 'https://free.law/thanks',
  },
  { name: 'coveragePage', label: 'coverage page', href: 'https://www.courtlistener.com/coverage' },
  {
    name: 'libraryOfCongress',
    label: 'Library of Congress',
    href:
      'https://free.law/2011/05/25/updated-supreme-court-case-dates-and-the-first-release-of-early-scotus-data-in-machine-readable-form/',
  },
  {
    name: 'freeLawScotusDB',
    label: 'Supreme Court Database',
    href:
      'https://free.law/2014/12/21/courtlistener-is-now-integrated-with-the-supreme-court-database/',
  },
  {
    name: 'ongoingBasis',
    label: 'ongoing basis',
    href: 'https://www.courtlistener.com/coverage/#scraped-jurisdictions',
  },
  {
    name: 'citationAlert',
    label: 'citation alert',
    href: 'https://free.law/2016/01/30/citation-searching-on-courtlistener/',
  },
  {
    name: 'customRssFeeds',
    label: 'custom RSS feeds',
    href: 'https://www.courtlistener.com/feeds/',
  },
]

// workaround: type Component as any
// see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356
const Link: any = ({ name }: { name: string }) => {
  const option = links.find(l => l.name === name)
  return option && <Anchor label={option.label} href={option.href} />
}

const OpinionPage: React.FC = () => (
  <>
    <Box direction="column" align="center" gap="medium" pad="medium">
      <Heading level={1}>Advanced Opinion Search</Heading>
      <Heading level={2} textAlign="center">
        Search millions of opinions across hundreds of jurisdictions. Updated constantly.
      </Heading>
      <Button label="Learn More" />
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
    </Box>
    <OpinionSearchForm />
    <Box pad="medium">
      <Heading level={2}>About the CourtListener Corpus of Opinions</Heading>
      <Box direction="row">
        <Box direction="column" pad="medium">
          <Heading level={3}>Background</Heading>
          <Paragraph>
            The opinions in CourtListener have been collected since 2009 by{' '}
            <Link name="freeLawProject" />, a non-profit devoted to high-quality legal data. We have
            collected these opinions so that lawyers, researchers, journalists, corporate
            organizations, and the public can have easy access to them.
          </Paragraph>
          <Paragraph>
            We have gathered and curated these opinions from a variety of sources, including court
            websites, information donations, <Link name="publicResourceOrg" />, and the{' '}
            <Link name="scotusDB" />.
          </Paragraph>
          <Paragraph>
            This work has been possible thanks to <Link name="financialSupport" /> from a growing
            list of people and organizations. If this work is valuable to you, your research, or
            your organization, please donate so our work can continue and thrive.
          </Paragraph>
          <Button
            label="Donate Now"
            href="https://www.courtlistener.com/donate/?referrer=opinion-adv-search"
            primary
          />
        </Box>
        <Box direction="column" pad="medium">
          <Heading level={3}>Coverage</Heading>
          <Paragraph>
            Our collection of opinions combines the best data from many sources. On our{' '}
            <Link name="coveragePage" />, you can see court-by-court graphs of what we have and can
            see which courts we get data from on an ongoing basis.
          </Paragraph>
          <Paragraph>
            We are particularly proud of our Supreme Court data, which we consider to be the best
            collection available. We have made thousands of corrections to the other publicly
            available data sets, and have enhanced it with data from the{' '}
            <Link name="libraryOfCongress" /> and the <Link name="freeLawScotusDB" />.
          </Paragraph>
          <Button
            label="Learn About Our Supreme Court Data"
            href="https://free.law/supreme-court-data"
          />
          <Heading level={3}>CiteGeist Relevancy Engine</Heading>
          <Paragraph>
            The CourtListener search engine has been optimized over the years to provide the most
            relevant and important cases at the top of the results. The system we use for this is
            named CiteGeist, and it works by analyzing your query and combining that with
            information about the citations between cases.
          </Paragraph>
          <Button
            label="Read About CiteGeist"
            href="https://free.law/2013/11/12/courtlistener-improves-search-results-thanks-to-volunteer-contributor/"
          />
        </Box>
        <Box direction="column" pad="medium">
          <Heading level={3}>Alerts</Heading>
          <Paragraph>
            For the courts where we get content on an <Link name="ongoingBasis" />, you can set up
            alerts for any search query. This way, you get an email whenever there is a new opinion
            matching your query.
          </Paragraph>
          <Paragraph>
            Some popular queries are your company name or that of your competitor, a legal area that
            you follow, or even a <Link name="citationAlert" /> that emails when a certain case is
            cited. We also offer <Link name="customRssFeeds" /> for any search query.
          </Paragraph>
          <Paragraph>
            To get started, do a search, then save it as an alert from the sidebar of your list of
            results.
          </Paragraph>
          <Heading level={3}>Even More Advanced Searching</Heading>
          <Paragraph>
            You can do even more advanced searches by using fielded searches and query operators.
          </Paragraph>
          <Button label="Learn More" href="https://www.courtlistener.com/help/search-operators/" />
        </Box>
      </Box>
    </Box>
  </>
)

export default withLayout(OpinionPage)
