import {useParams, useHistory} from "react-router-dom"
import {useForm} from "react-hook-form"
import {createElement} from "react"

import Form from "component/Form"
import Input from "component/Input"
import Button from "component/Button/Primary"

import confirm from "api/mutation/auth/reset/confirm"

function Confirm() {
  const {register, handleSubmit: handle} = useForm({model: "onBlur"})
  const {hash} = useParams()

  const history = useHistory()

  function submit({password}) {
    confirm({password, hash})
      .then(() => history.push("/"))
      .catch(console.error)
  }

  return (
    <Form onSubmit={handle(submit)}>
      <Input
        ref={register({required: true})}
        name="password"
      />

      <Button>
        Confirm
      </Button>
    </Form>
  )
}

export default Confirm
