/** @format */
import { Field, FieldInputProps, FormikProps } from 'formik'
import { CheckBox, Heading, List, Text } from 'grommet'
import * as React from 'react'
import { AdvancedSearchFormProps } from './Search'

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

export default PrecedentialStatusField
