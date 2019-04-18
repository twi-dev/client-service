import {createElement, Fragment} from "react"
import {shape} from "prop-types"

import connect from "core/model/connect"
import Title from "common/component/Title"

const mapStoresToProps = ({user}) => ({user})

const Profile = ({user}) => (
  <Fragment>
    <Title title={user.login} />

    <div>{user.login}</div>
  </Fragment>
)

Profile.propTypes = {
  user: shape({}).isRequired
}

export default Profile |> connect(mapStoresToProps)
