/** @format */

// Todo: abstract form inputs and dedupe

import { ErrorMessage, Field, Form, FormikErrors, FormikProps, withFormik } from 'formik'
import { Anchor, Box, Button, Heading, Paragraph, Text, TextInput } from 'grommet'
import * as React from 'react'
import styled from 'styled-components'
import withLayout from '../root/layout/withLayout'

interface SimpleSearchCitationFormValues {
  volume: string
  reporter: string
  page: string
}

const SimpleInput = (props: {
  as: string | React.ReactNode
  name: string
  placeholder: string
}) => (
  <Box>
    <Field as={props.as} name={props.name} {...props} />
    <ErrorMessage name={props.name} />
  </Box>
)

const SubmitButton = styled(Button)`
  max-width: 200px;
`
const CitationPage = (props: FormikProps<SimpleSearchCitationFormValues>) => (
  <Box direction="column" pad="medium" gap="small">
    <Heading level={1}>Citation Lookup Tool</Heading>
    <Text>If you have a citation you want to look up, put it in here, and we'll look it up.</Text>
    <Form>
      <Box direction="row" pad="medium" gap="medium">
        <SimpleInput as={TextInput} name="volume" placeholder="Volume" />
        <SimpleInput as={TextInput} name="reporter" placeholder="Reporter" />
        <SimpleInput as={TextInput} name="page" placeholder="Page" />
      </Box>
      <Box pad={{ horizontal: 'medium', vertical: 'none' }}>
        <SubmitButton type="submit" disabled={props.isSubmitting} primary label="Look It Up" />
      </Box>
    </Form>
    <Heading level={1}>About this Tool</Heading>
    <p>
      This tool generates URLs so that you can easily look up a citation that you know. If you're a
      person that prefers to just hack URLs, you can do that too, using a URL like
      {<code>/c/U.S./410/113/</code>}, which will take you straight to {<i>Roe v. Wade</i>}. Or you
      can always just come here and type in a citation that you know.
    </p>
    <p>
      This tool is limited by the citations that we have in our system. As we improve our collection
      and add citations to opinions that we have, this tool will automatically work for those
      opinions as well.
    </p>
    <p>
      You can
      {
        <Anchor
          label=" read more about this tool "
          href="https://free.law/2015/11/30/our-new-citation-finder/"
        />
      }
      on our blog.
    </p>
  </Box>
)

const Citations = withFormik<{ props: any }, SimpleSearchCitationFormValues>({
  displayName: 'SimpleCitationSearchForm',
  mapPropsToValues: props => ({
    volume: '',
    reporter: '',
    page: '',
  }),

  validate: (values: SimpleSearchCitationFormValues) => ({
    // write async form field validations
  }),

  handleSubmit: (values, { setSubmitting }) => {
    // prettier-ignore
    setTimeout(
      () => {
        alert(JSON.stringify(values, null, 2))
        setSubmitting(false)
      }, 
      1000)
  },
})(CitationPage)

export default withLayout(Citations)
