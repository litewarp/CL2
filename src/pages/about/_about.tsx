import { Anchor, Box, Heading, Image, List, Paragraph, Text } from 'grommet'
import * as React from 'react'

// tslint:disable:no-var-requires
const brianProfile = require('./brian.jpeg')
// tslint:disable:no-var-requires
const mikeProfile = require('./mike.jpeg')

const createLink = ({ name }: { name: string }) => {
  const props = {
    berkeleyInfo: { href: 'ischool.berkeley.edu', label: 'University of California, Berkeley School of Information' },
    contributePage: { href: '/contribute', label: 'contribute page' },
    coveragePage: { href: '/coverage', label: 'coverage page' },
    freelaw: { href: 'https://free.law', label: 'Free Law Project' },
    getInTouch: { href: '/contact', label: 'get in touch' },
    newZ: { href: 'http://www.teararoa.org.nz/', label: 'New Zealand' },
    pcta: { href: 'pcta.org', label: 'United States' },
  }
  const { href, label } = props[name]
  return <Anchor label={label} href={href}/>
}

export const AboutHeader = () => (
  <Box>
    <Heading level={2}>About</Heading>
    <Paragraph>
      Started in 2010, CourtListener is a core project of the Free Law Project, a federally-recognized 501(c)(3)
      public charity and a California non-profit public benefit corporation. {createLink({ name: 'freelaw' })} seeks
      to provide free access to primary legal materials, develop legal research tools, and support academic research
      on legal corporations. CourtListener embodies all of these efforts, as the primary free repository of all the
      court opinions we have collected, as the platform on which we deploy legal research tools, and as the source of
      bulk downloads that enable academic researchers to study our collection.
    </Paragraph>
    <Paragraph>
      We collect legal opinions from court websites and from data donations, and are aiming to have the best, most
      complete data on the open Web within the next couple years. We are slowly expanding to provide search and
      awareness tools for as many state courts as possible, and we already have tools for all of the Federal Appeals
      Courts. For more details on which jurisdictions we support see our {createLink({name: 'coveragePage'})}.
      If you're able to help us acquire more cases, please {createLink({name: 'getInTouch'})}.
    </Paragraph>
  </Box>
)

export const Contributions = () => (
  <Box>
    <Heading level={2}>You Make CourtListener</Heading>
    <Paragraph>
      CourtListener is a community project and we enthusiastically welcome contributions.
      There are many ways to contribute, which are detailed on our {createLink({ name: 'contributePage'})}.
    </Paragraph>
    <Paragraph>
      We are thankful for the hard work of our past contributors:
    </Paragraph>
    <List
      data={[
        'Jason Aller for his work to make CourtListener mobile-friendly and for his enhancements to the coverage page.',
        'Karen Rustad & Rowyn McDonald for creating our citator, cross-linker and coverage graphs.',
        'Bo Jin (Krist) for creating the heart of our relevance engine.',
        'Josh de-Larios Heiman for his pro-bono legal expertise.',
       'Siddharth Agrawal & Andrew McConachie for their research on keyword identification.',
       'Sarah Tyler for her research into search relevance and user interfaces.',
       'Peter Nguyen for his design work for the jurisdiction picker.',
        'Ben Cassidy, Commetric, Inc., Bo Jin (Krist), Deb Linton, Matt Meiske, Andrew McConachie, Taliah B. Mirmalek, David Zvenyach for their work on the Juriscraper scraper framework.'
    ]}
    />
  </Box>
)

export const Team = () => (
  <Box>
    <Heading level={2}>Team</Heading>
    <Box>
      <Image fit="contain" src={brianProfile}/>
      <Heading level={3}>Brian W. Carver</Heading>
      <Paragraph>
        Brian W. Carver is the Co-Founder of the non-profit {createLink({ name: 'freelaw' })}, and an Assistant
        Professor at the {createLink({ name: 'berkeleyInfo' })}. He researches and teaches about intellectual property
        law and cyberlaw and is also engaged in efforts to increase the public's access to the law.
      </Paragraph>
    </Box>
    <Box>
      <Image fit="contain" src={mikeProfile}/>
      <Heading level={3}>Michael Lissner</Heading>
      <Paragraph>
        Michael Lissner is the Lead Developer and Co-Founder of the non-profit Free Law Project.
        Before founding {createLink({name: 'freelaw' })}, he spent several years working in the
        enterprise search and e-discovery fields, building bespoke search systems.
        He is a graduate of the {createLink({name: 'berkeleyInfo' })} and a long-distance walker,
        crossing both the {createLink({name: 'pcta'})} and {createLink({ name: 'newZ' })} on foot.
      </Paragraph>
    </Box>
  </Box>

)
