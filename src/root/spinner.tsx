/** @format */

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

type IconSize =
  | 'lg'
  | 'xs'
  | 'sm'
  | '1x'
  | '2x'
  | '3x'
  | '4x'
  | '5x'
  | '6x'
  | '7x'
  | '8x'
  | '9x'
  | '10x'

export default (props: { size?: IconSize; spin?: boolean }) => (
  <FontAwesomeIcon icon={faSpinner} size={props.size} spin={props.spin} {...props} />
)
