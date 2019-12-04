import {
  ErrorMessage,
  Field,
  FieldInputProps,
  FieldMetaProps,
  Form,
  FormikBag,
  FormikProps,
  withFormik,
} from 'formik'
import { Anchor, Box, Button, CheckBox, Heading, Image, Paragraph, Select, Text, TextInput } from 'grommet'
import * as React from 'react'
import { FaHeart } from 'react-icons/fa'
import { DonationFormValues } from '../../typings/index'
import states from './_states'

// tslint:disable:no-var-requires
const bitcoin = require('./bitcoin.png')
// tslint:disable:no-var-requires
const bitcoinCash = require('./bitcoinCash.png')
// tslint:disable:no-var-requires
const ethereum = require('./ethereum.png')

const SimpleInput = (props: {
  as: string | React.ReactNode,
  name: string,
  label: string
}) => (
  <Box>
    <Heading level={5}>{props.label}</Heading>
    <Field as={props.as} name={props.name} {...props} />
    <ErrorMessage name={props.name} />
  </Box>
)

const SelectInput = (props: {
  name: string,
  label: string,
  options: string[]
}) => (
  <Box>
    <Heading level={5}>{props.label}</Heading>
    <Field name={props.name} >
      {({ field, form }: { field: FieldInputProps, form: FormikBag }) => (
        <Select
          options={props.options}
          {...field}
          onChange={(option) => form.setFieldValue(field.name, option)}
        />
      )}
    </Field>
    <ErrorMessage name={props.name} />
    </Box>
  )

// contains internal state and form elements
// gets passed the formikbag from the HOC withFormik component
const DonationInnerForm = (props: FormikProps<DonationFormValues>) => {
  const { values, handleChange, handleSubmit, handleBlur } = props
  return (
  <Form onSubmit={handleSubmit}>
    <Field name="donationFrequency">
      {({ field, form }: { field: FieldInputProps, form: FormikBag }) => (
      <>
        <Heading level={3}>Donation Frequency</Heading>
        <Box direction="row">
          {['Once', 'Monthly'].map((button, index) => (
            <Button
              name={field.name}
              active={field.value === button}
              key={`donationFrequency__${index}`}
              label={button}
              onClick={() => form.setFieldValue(field.name, button)}
            />
          ))}
        </Box>
      </>
    )}
    </Field>
    <ErrorMessage name="donationFrequency"/>

    <Field name="donationMethod">
      {({ field, form }: { field: FieldInputProps, form: FormikBag }) => (
        <>
          <Heading level={3}>How Would You Like to Donate?</Heading>
          <Box direction="row">
            {['PayPal', 'CreditCard', 'Check', 'Cryptocurrency'].map((button, index) => (
              <Button
                name={field.name}
                active={field.value === button}
                key={`donationMethod__${index}`}
                label={button}
                onClick={() => form.setFieldValue(field.name, button)}
              />
            ))}
          </Box>
        </>
    )}
    </Field>
    <ErrorMessage name="donationMethod"/>

    <Box direction="column" align="center">
      {(values.donationMethod === 'CreditCard' || values.donationMethod === 'PayPal') && (
        <>
          <SimpleInput as={TextInput} name="firstName" label="First Name" />
          <SimpleInput as={TextInput} name="lastName" label="Last Name" />
          <SimpleInput as={TextInput} name="email" label="Email Address" />
          <SimpleInput as={TextInput} name="firstName" label="First Name" />
          <SimpleInput as={TextInput} name="mailingAddress1" label="Address Line 1" />
          <SimpleInput as={TextInput} name="mailingAddress2" label="Address Line 2" />
          <SimpleInput as={TextInput} name="city" label="City" />
          <SelectInput name="state" label="State" options={Object.values(states)} />
          <SimpleInput as={TextInput} name="zipCode" label="ZipCode" />
        </>
      )}

      {(values.donationMethod === 'CreditCard') && <Heading level={5}>CreditCard Form Placeholder</Heading>}

      {(values.donationMethod === 'CreditCard' || values.donationMethod === 'PayPal') && (
        <>
          <Field
            as={CheckBox}
            checked={values.donationReminderOptIn}
            name="donationReminderOptIn"
            label="Send me a reminder to donate again in one year"
          />
          <ErrorMessage name="donationReminderOptIn"/>
          <Field
            as={CheckBox}
            checked={values.monthlyNewsletterOptIn}
            name="monthlyNewsletterOptIn"
            label="Send me the monthly Free Law Project newsletter"
          />
          <ErrorMessage name="monthlyNewsletterOptIn" />
          <Button width="25%" icon={<FaHeart />} type="submit" label="Donate to Free Law Project"/>
        </>
      )}
      {(values.donationMethod === 'Check') && (
        <>
          <Paragraph>
            For instructions on donating by check, please
            {<Anchor href="/contact" label="get in touch"/>} on our contact page.
            Unfortunately, due to the nature of our work, we no longer have a public mailing address.
          </Paragraph>
          <Paragraph>
            We cannot accept starter checks, unnumbered checks or non-personalized checks.
          </Paragraph>
          <Paragraph>
            Thank you for your donation.
          </Paragraph>
        </>
      )}
      {(values.donationMethod === 'Cryptocurrency') && (
      <>
        <Paragraph>
          To donate to Free Law Project using Bitcoin, please use the address or QR code below.
        </Paragraph>
        <Image src={bitcoin} fit="contain"/>
        <Anchor href="bitcoin:19FBmVguf86kaxEM7air6EDrtq5bJSo8qs" label="19FBmVguf86kaxEM7air6EDrtq5bJSo8qs" />

        <Paragraph>
          To donate to Free Law Project using Bitcoin Cash, please use the address or QR code below.
        </Paragraph>
        <Image src={bitcoinCash} fit="contain"/>
        <Paragraph>
          To donate to Free Law Project using Ethereum, please use the QR code below.
        </Paragraph>
        <Image src={ethereum} fit="contain"/>
        <Paragraph>
          To donate to Free Law Project using Stellar Lumens, please use the following address and memo:
          <Text size="xxsmall">Address:  GDQP2KPQGKIHYJGXNUIYOMHARUARCA</Text>
          <Text size="xxsmall">Memo: 3316058103</Text>
        </Paragraph>

        <Text>Thank you for your donation.</Text>
      </>
      )}
      </Box>

  </Form>
  )
}

const DonationForm = withFormik<{}, DonationFormValues>({
  displayName: 'Donation Form',
  mapPropsToValues: (props: {}) => ({
    amount: '',
    city: '',
    creditCardCvc: '',
    creditCardExpMonth: '',
    creditCardExpYear: '',
    creditCardNumber: '',
    donationFrequency: 'Once',
    donationMethod: 'CreditCard',
    donationReminderOptIn: false,
    email: '',
    firstName: '',
    frequency: '',
    lastName: '',
    mailingAddress1: '',
    mailingAddress2: '',
    monthlyNewsletterOptIn: false,
    state: '',
    zip: '',
  }),

  validate: (values: DonationFormValues) => ({}),

  handleSubmit: (values, {setSubmitting}) => {
    setTimeout(
    () => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    },
    1000)
  },
})(DonationInnerForm)

export default DonationForm
