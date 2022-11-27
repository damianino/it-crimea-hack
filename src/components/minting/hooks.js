import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { MintingFormSchema } from 'components/minting/form'
import { store } from 'store'

export const useMinting = () => {
  const { handleSubmit, control, watch } = useForm({
    resolver: yupResolver(MintingFormSchema),
    mode: 'onBlur',
  })

  console.log(watch('source'))

  const onSubmit = handleSubmit(async data => {
    await store.mintNft(data)

    // const response = await fetch(data.source)
    // const blob = await response.blob()
    //
    // let reader = new FileReader();
    // reader.readAsDataURL(blob); // конвертирует Blob в base64 и вызывает
    // onload  reader.onload = function(result) {
    // console.log(result.currentTarget.result) };
  })

  return { onSubmit, control }
}
