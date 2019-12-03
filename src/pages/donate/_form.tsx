import { FormikBag, withFormik } from 'formik'
import {
  Box,
  Button,
  CheckBox,
  Form,
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

const ControlledTextInput = (props) => (
  <>
    <TextInput {...props} />
  </>
)

const DonationOption = (props: { paymentOption: string, setPaymentOption: (label: string) => void }) => {
  const StatefulButton = (buttonProps: {label: string}) => (
    <Button
      label={buttonProps.label}
      onClick={() => props.setPaymentOption(buttonProps.label)}
      active={props.paymentOption === buttonProps.label}
    />
  )
  return (
    <>
      <Heading level={3}>How Would You Like to Donate?</Heading>
      <Box directon="row">
        <StatefulButton label="PayPal"/>
        <StatefulButton label="CreditCard"/>
        <StatefulButton label="Check" />
        <StatefulButton label="Crytocurrency"/>
      </Box>
    </>
  )
}

const DonateForm = (props: FormikBag) => {
  const [paymentOption, setPaymentOption] = React.useState('CreditCard')
  const togglePaymentOption = (option) => setPaymentOption(option)
  return (
    <Form onSubmit={props.handleSubmit}>
      <FormField
        name="frequency"
        label="Donation Frequency"
        component={RadioButtonGroup}
        options={['Once', 'Monthly']}
        errors={props.touched.name && props.errors.name}
        value={props.values.name}
        onBlur={props.handleBlur}
        touched={props.touched.name}
        onChange={props.handleChange}
      />
      <FormField
        name="amount"
        label="Donation Amount"
        component={RadioButtonGroup}
        options={['$5,000', '$1,000', '$500']}
        errors={props.touched.name && props.errors.name}
      />
      <DonationOption paymentOption={paymentOption} setPaymentOption={setPaymentOption} />
      <FormField
        name="firstName"
        label="First Name"
        component={ControlledTextInput}
        {...props}
      />
      <FormField
        name="lastName"
        label="Last Name"
        component={ControlledTextInput}
        {...props}
      />
      <FormField
        name="email"
        label="Email Address"
        component={ControlledTextInput}
        {...props}
      />
      <FormField
        name="mailingAddress1"
        label="Address Line 1"
        component={ControlledTextInput}
        {...props}
      />
      <FormField
        name="mailingAddress2"
        label="Address Line 2"
        component={ControlledTextInput}
        {...props}
      />
      <FormField
        name="city"
        label="City"
        component={ControlledTextInput}
        {...props}
      />
      <FormField
        name="state"
        label="State"
        component={ControlledTextInput}
        {...props}
      />
      <FormField
        name="zipCode"
        label="Zip Code"
        component={ControlledTextInput}
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
    </Form>
  )
}

const StatefulDonationForm = withFormik({
  displayName: 'Donation Form',
  mapPropsToValues: () => ({
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

  validate: (values) => ({}),

  handleSubmit: (values, {setSubmitting}) => {
    setTimeout(
    () => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    },
    1000)
  },
})(DonateForm)

export default StatefulDonationForm
