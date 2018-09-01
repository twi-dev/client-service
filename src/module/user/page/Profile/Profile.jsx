import React, {Fragment} from "react"
import {shape} from "prop-types"

import Title from "common/component/Title"

const Profile = ({user}) => (
  <Fragment>
    <Title title={user.login} />

    <div>{user.login}</div>
  </Fragment>
)

Profile.propTypes = {
  user: shape({}).isRequired
}

export default Profile
