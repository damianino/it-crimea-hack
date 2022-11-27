import * as yup from 'yup'

export const FORM_ERRORS = {
  required: 'Required field',
}

export const MintingFormSchema = yup.object({
  description: yup.string().required(FORM_ERRORS.required),
  source: yup.mixed(),
  name: yup.string().required(FORM_ERRORS.required),
})
