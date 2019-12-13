/** @format */
import * as React from 'react'
import { Field } from 'formik'
import { CheckBox, Heading, List, Text } from 'grommet'

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
      {({ field, form: { touched, errors, setFieldValue }, meta }) => {
        console.log(field)
        return (
          <>
            <Heading level={5}>Precedential Status: </Heading>
            <List
              primaryKey={(item, index) => (
                <CheckBox
                  name={item.value}
                  key={`precedential_status_${index}`}
                  checked={field.value ? field.value.includes(item.value) : false}
                  label={<Text size="xsmall">{item.name}</Text>}
                  onBlur={() => setShowPrecedentOptions(false)}
                  onChange={event => {
                    if (event.target.name === 'seeMore') {
                      setShowPrecedentOptions(true)
                    } else {
                      field.value && field.value.includes(event.target.name)
                        ? setFieldValue(
                            field.name,
                            field.value.filter(i => i !== event.target.name)
                          )
                        : setFieldValue(field.name, [...field.value, event.target.name])
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
        )
      }}
    </Field>
  )
}

export default PrecedentialStatusField
