import { Field, Form, FormikProps, withFormik } from 'formik'
import {
  Box,
  Button,
  CheckBox,
  FormField,
  Heading,
  RadioButton,
  RadioButtonGroup,
  RangeInput,
  Select,
  Text,
  TextArea,
  TextInput,
} from 'grommet'
import * as React from 'react'
import { FaHeart } from 'react-icons/fa'
import { DonationFormValues } from '../../typings/index'

interface OtherProps {
  paymentOption: string,
  setPaymentOption: (label: string) => void
}

const DonationOption = (props: OtherProps) => {
  const StatefulButton = (buttonProps: {label: string}) => {
    const isActive = props.paymentOption === buttonProps.label
    const handleClick = props.setPaymentOption(buttonProps.label)
    return <Button label={buttonProps.label} onClick={handleClick} active={isActive}/>
  }
  return (
    <>
      <Heading level={3}>How Would You Like to Donate?</Heading>
      <Box direction="row">
        <StatefulButton label="PayPal"/>
        <StatefulButton label="CreditCard"/>
        <StatefulButton label="Check" />
        <StatefulButton label="Cryptocurrency"/>
      </Box>
    </>
  )
}

const InnerForm = (props: OtherProps & FormikProps<DonationFormValues>) => {
  const [paymentOption, setPaymentOption] = React.useState('CreditCard')
  const togglePaymentOption = (option: string) => setPaymentOption(option)
  const { touched, errors, values, handleBlur, handleChange, handleSubmit } = props
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="frequency"
        label="Donation Frequency"
        as={RadioButtonGroup}
        options={['Once', 'Monthly']}
      />
      <DonationOption paymentOption={paymentOption} setPaymentOption={setPaymentOption} />
      {(paymentOption === 'CreditCard' || paymentOption === 'PayPal') && (
        <>
          <FormField
            name="firstName"
            label="First Name"
            component={Field}
            {...props}
          />
          <FormField
            name="lastName"
            label="Last Name"
            component={Field}
            {...props}
          />
          <FormField
            name="email"
            label="Email Address"
            component={Field}
            {...props}
          />
          <FormField
            name="mailingAddress1"
            label="Address Line 1"
            component={Field}
            {...props}
          />
          <FormField
            name="mailingAddress2"
            label="Address Line 2"
            component={Field}
            {...props}
          />
          <FormField
            name="city"
            label="City"
            component={Field}
            {...props}
          />
          <FormField
            name="state"
            label="State"
            component={Field}
            {...props}
          />
          <FormField
            name="zipCode"
            label="Zip Code"
            component={Field}
            {...props}
          />
          <FormField
            name="donationReminderOptIn"
            label="Send me a reminder to donate again in one year"
            component={RadioButton}
            {...props}
          />
          <FormField
            name="monthlyNewsletterOptIn"
            label="Send me the monthly Free Law Project newsletter"
            component={RadioButton}
            {...props}
          />
          <Button icon={<FaHeart />} label="Donate to Free Law Project"/>
        </>)}
      {(paymentOption === 'Check') && <Heading level={4}>Check Placeholder</Heading>}
      {(paymentOption === 'Cryptocurrency') && <Heading level={4}>Cryptocurrency Placeholder</Heading>}
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
})(InnerForm)

export default DonationForm
