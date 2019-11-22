import { Anchor, Heading, Paragraph } from 'grommet'
import * as React from 'react'

const createLink = ({ name }: { name: string }) => {
  const props = {
    courtlistener: { href: 'https://github.com/freelawproject/courtlistener', label: 'CourtListener' },
    freelaw: { href: 'https://free.law', label: 'Free Law Project' },
    juriscraper: { href: 'https://github.com/freelawproject/juriscraper', label: 'Juriscraper' },
    recap: { href: 'https://free.law/recap', label: 'RECAP' }
  }
  const { href, label } = props[name]
  return <Anchor label={label} href={href}/>
}

export const AboutCourtListener = () => (
  <>
    <Heading level={3} margin={{bottom: 'xsmall'}}>About CourtListener</Heading>
    <Paragraph size="small" margin={{ top: 'none', right: 'none', left: 'none', bottom: 'small' }} fill={true}>
      CourtListener is a free legal research website containing millions of legal opinions from federal and state courts. With CourtListener, lawyers, journalists, academics, and the public can research an important case, stay up to date with new opinions as they are filed, or do deep analysis using our raw data.
    </Paragraph>
  </>
)

export const AboutFreeLawProject = () => (
  <>
    <Heading level={3} margin={{bottom: 'xsmall'}}>About Free Law Project</Heading>
    <Paragraph size="small" margin={{ top: 'none', right: 'none', left: 'none', bottom: 'small' }} fill={true}>
      {createLink({ name: 'freelaw' })} seeks to provide free access to primary legal materials, develop legal research tools, and support academic research on legal corpora. We work diligently with volunteers to expand our efforts at building an open source, open access, legal research ecosystem. Currently Free Law Project sponsors the development of {createLink({ name: 'courtlistener' })}, {createLink({ name: 'juriscraper' })}, and {createLink({name: 'recap' })}
    </Paragraph>
  </>
)
