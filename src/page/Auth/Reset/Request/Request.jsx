import {createElement, useState} from "react"
import {useForm} from "react-hook-form"

import useTitle from "lib/hook/useTitle"

import Form from "component/Form"
import Input from "component/Input"
import Button from "component/Button/Primary"

import request from "api/mutation/auth/reset/request"

function Request() {
  useTitle("Reset a password")

  const {register, handleSubmit} = useForm({mode: "onBlur"})

  const [isSent, set] = useState(false)
  // const [isLoading, setLoading] = useState(false)

  function submit({email}) {
    request(email).then(() => set(true)).catch(console.error)
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Input ref={register({required: true})} />

      <Button wide type="submit">Submit</Button>

      {
        do {
          if (isSent) {
            <div>Your request has been sent!</div>
          }
        }
      }
    </Form>
  )
}

export default Request
