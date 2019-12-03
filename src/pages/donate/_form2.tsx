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
import { Box, Button, CheckBox, Heading } from 'grommet'
import * as React from 'react'
import { FaHeart } from 'react-icons/fa'
import { DonationFormValues } from '../../typings/index'

const SimpleInput = (props: {
  as: string | React.ReactNode,
  name: string,
  label: string
}) => (
  <Box>
    <Heading level={5}>{props.label}</Heading>
    <Field as={props.as} name={props.name} />
    <ErrorMessage name={props.name} />
  </Box>
)

// contains internal state and form elements
// gets passed the formikbag from the HOC withFormik component
const DonationInnerForm = (props: FormikProps<DonationFormValues>) => {

  const [donationFrequency, setDonationFrequency] = React.useState('Monthly')
  const [donationMethod, setDonationMethod] = React.useState('CreditCard')
  const { values, handleChange, handleSubmit, handleBlur } = props

  return (
  <Form onSubmit={handleSubmit}>
    <Field name="donationFrequency">
    {({
      field,
      form: { touched, errors },
      meta,
    }) => (
      <>
        <Heading level={3}>Donation Frequency</Heading>
        <Box direction="row">
          <Button
            active={donationFrequency === 'Once'}
            label="Once"
            onClick={() => setDonationFrequency('Once')}
          />
          <Button
            active={donationFrequency === 'Monthly'}
            label="Monthly"
            onClick={() => setDonationFrequency('Monthly')}
          />
        </Box>
      </>
    )}
    </Field>
    <ErrorMessage name="donationFrequency"/>

    <Field name="donationMethod">
    {({
      field,
      form: { touched, errors },
      meta,
    }) => (
      <>
        <Heading level={3}>How Would You Like to Donate?</Heading>
        <Box direction="row">
          <Button
            active={donationMethod === 'PayPal'}
            label="PayPal"
            onClick={() => setDonationMethod('Paypal')}
          />
          <Button
            active={donationMethod === 'CreditCard'}
            label="CreditCard"
            onClick={() => setDonationMethod('CreditCard')}
          />
          <Button
            active={donationMethod === 'Check'}
            label="Check"
            onClick={() => setDonationMethod('Check')}
          />
          <Button
            active={donationMethod === 'Cryptocurrency'}
            label="Cryptocurrency"
            onClick={() => setDonationMethod('Cryptocurrency')}
          />
        </Box>
      </>
    )}
    </Field>
    <ErrorMessage name="donationMethod"/>

    {(donationMethod === 'CreditCard' || donationMethod === 'PayPal') && (
      <Box direction="column">
        <SimpleInput as="input" name="firstName" label="First Name" />
        <SimpleInput as="input" name="lastName" label="Last Name" />
        <SimpleInput as="input" name="email" label="Email Address" />
        <SimpleInput as="input" name="firstName" label="First Name" />
        <SimpleInput as="input" name="mailingAddress1" label="Address Line 1" />
        <SimpleInput as="input" name="mailingAddress2" label="Address Line 2" />
        <SimpleInput as="input" name="city" label="City" />
        <SimpleInput as="select" name="state" label="State" />
        <SimpleInput as="select" name="zipCode" label="ZipCode" />
        <Field
          as={CheckBox}
          checked={values.donationReminderOptIn}
          name="donationReminderOptIn"
          label="Send me a reminder to donate again in one year"
        />
        <ErrorMessage name="donationReminderOptIn" />
        <Field
          as={CheckBox}
          checked={values.monthlyNewsletterOptIn}
          name="monthlyNewsletterOptIn"
          label="Send me the monthly Free Law Project newsletter"
        />
        <ErrorMessage name="monthlyNewsletterOptIn" />
      </Box>
    )}
    <Button icon={<FaHeart />} type="submit" label="Donate to Free Law Project"/>
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
