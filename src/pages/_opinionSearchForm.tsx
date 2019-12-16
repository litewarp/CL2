/** @format */
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ErrorMessage,
  Field,
  FieldInputProps,
  Form,
  FormikErrors,
  FormikProps,
  withFormik,
} from 'formik'
import { Box, Button, CheckBox, Heading, Layer, List, Select, Text, TextInput } from 'grommet'
import * as React from 'react'

const precedentOptions = [
  { name: 'Precedential', count: '(3,609,604)', value: 'precedential' },
  { name: 'Non-Precedential', count: '(613,304)', value: 'non_precedential' },
  { name: 'Errata', count: '(615)', value: 'errata' },
  { name: 'Separate Opinion', count: '(333)', value: 'separate_opinion' },
  { name: 'In-chambers', count: '(14)', value: 'in_chambers' },
  { name: 'Relating-to-orders', count: '(239)', value: 'relating_to_orders' },
  { name: 'Unkown Status', count: '(5,348)', value: 'unknown' },
]
const PrecedentialStatusField = () => {
  const [showPrecedentOptions, setShowPrecedentOptions] = React.useState(false)
  return (
    <Field name="precedentialStatus">
      {({
        field: { name, value },
        form: { touched, errors, setFieldValue },
      }: {
        field: FieldInputProps<[]>
        form: FormikProps<AdvancedSearchFormProps>
      }) => (
        <>
          <Heading level={5}>Precedential Status: </Heading>
          <List
            primaryKey={(item, index) => (
              <CheckBox
                name={item.value}
                key={`precedential_status_${index}`}
                // workaround: type item.value as never
                checked={value ? value.includes(item.value as never) : false}
                label={<Text size="xsmall">{item.name}</Text>}
                onBlur={() => setShowPrecedentOptions(false)}
                onChange={({ target }: { target: HTMLInputElement }) => {
                  if (target.name === 'seeMore') {
                    setShowPrecedentOptions(true)
                  } else {
                    // workaround: type target.name as never
                    value && value.includes(target.name as never)
                      ? setFieldValue(
                          name,
                          value.filter(i => i !== target.name)
                        )
                      : setFieldValue(name, [...value, target.name])
                  }
                }}
              />
            )}
            secondaryKey={(item, index) => (
              <Text size="xsmall" key={`precedential_status2_${index}`}>
                {item.count}
              </Text>
            )}
            data={
              showPrecedentOptions
                ? precedentOptions
                : precedentOptions
                    .slice(0, 2)
                    .concat([{ name: 'See More', count: '', value: 'seeMore' }])
            }
          />
        </>
      )}
    </Field>
  )
}
export interface AdvancedSearchFormProps {
  jurisdictions: never[]
  caseName: string
  citation: string
  neutralCitation: string
  judge: string
  searchResultsOrder: string
  filedAfter: string
  filedBefore: string
  minCites: number
  maxCites: number
  docketNumber: string
  precedentialStatus: never[]
}

const SelectInput = (props: {
  name: string
  label: string
  options: string[] | Array<{ label: string; value: string }>
  labelKey?: string
  valueKey?: string
}) => (
  <Box>
    <Heading level={5}>{props.label}</Heading>
    <Field name={props.name}>
      {({ field, form }: { field: FieldInputProps<{}>; form: FormikProps<{}> }) => (
        <Select
          options={props.options}
          {...field}
          // setFieldValue's first argument is typed as never
          // see https://github.com/jaredpalmer/formik/issues/323
          onChange={(option: string) => form.setFieldValue(field.name as never, option)}
        />
      )}
    </Field>
    <ErrorMessage name={props.name} />
  </Box>
)

const SimpleInput = (props: {
  as: string | React.ReactNode
  name: string
  label: string
  placeholder?: string
}) => (
  <Box>
    <Heading level={5}>{props.label}</Heading>
    <Field as={props.as} name={props.name} {...props} />
    <ErrorMessage name={props.name} />
  </Box>
)

const AdvancedSearchForm = (props: FormikProps<AdvancedSearchFormProps>) => {
  const [showJurisdictions, setShowJurisdictions] = React.useState(false)
  return (
    <Box pad="medium" direction="column" align="center" gap="medium">
      <Form>
        <Box direction="row">
          <Box direction="column" pad="medium">
            <Button
              margin="medium"
              label="Select Jurisdictions"
              onClick={() => setShowJurisdictions(true)}
            />
            {showJurisdictions && (
              <Layer
                onEsc={() => setShowJurisdictions(false)}
                onClickOutside={() => setShowJurisdictions(false)}>
                <Box direction="row">
                  <Heading level={3}>Select Jurisdictions</Heading>
                </Box>
              </Layer>
            )}
            <SimpleInput as={TextInput} name="caseName" label="Case Name:" />
            <SimpleInput
              as={TextInput}
              name="filedAfter"
              placeholder="YYYY-MM-DD"
              label="Filed After:"
            />
            <SimpleInput as={TextInput} name="citation" label="Citation:" />
          </Box>

          <Box direction="column" pad="medium">
            <SelectInput
              name="resultsOrder"
              label="Search Results Order:"
              labelKey="label"
              valueKey="value"
              options={[
                { label: 'Relevance', value: 'relevance' },
                { label: 'Newest First', value: 'newest' },
                { label: 'Oldest First', value: 'oldest' },
                { label: 'Most Cited First', value: 'mostCited' },
                { label: 'Least Cited First', value: 'leastCited' },
              ]}
            />
            <SimpleInput as={TextInput} name="judge" label="Judge:" />
            <SimpleInput
              as={TextInput}
              name="filedBefore"
              placeholder="YYYY-MM-DD"
              label="Filed Before:"
            />
            <SimpleInput as={TextInput} name="neutralCitation" label="Neutral Citation:" />
          </Box>

          <Box direction="column" pad="medium">
            <PrecedentialStatusField />
            <Box direction="row">
              <SimpleInput as={TextInput} name="minCites" label="Min Cites:" />
              <SimpleInput as={TextInput} name="maxCites" label="Max Cites:" />
            </Box>
            <SimpleInput as={TextInput} name="docketNumber" label="Docket Number:" />
          </Box>
        </Box>
        <Box direction="row-responsive" justify="end">
          <Button type="submit" label="Search" primary icon={<FontAwesomeIcon icon={faSearch} />} />
        </Box>
      </Form>
    </Box>
  )
}

const AdvancedOpinionSearch = withFormik({
  displayName: 'AdvancedOpinionSearchForm',
  mapPropsToValues: () => ({
    caseName: '',
    filedAfter: '',
    filedBefore: '',
    precedentialStatus: [],
    minCites: 0,
    maxCites: 0,
    docketNumber: '',
    citation: '',
    neutralCitation: '',
    jurisdictions: [],
    judge: '',
    searchResultsOrder: '',
  }),

  validate: () => {
    return []
  },
  handleSubmit: (values, { setSubmitting }) => {
    // prettier-ignore
    setTimeout(
      () => {
        alert(JSON.stringify(values, null, 2))
        setSubmitting(false)
      },
      1000)
  },
})(AdvancedSearchForm)

export default AdvancedOpinionSearch
