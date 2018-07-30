import React, {Fragment} from "preact"
import {shape} from "prop-types"

import Title from "common/component/Title"
import Layout from "common/component/Layout"

const Profile = ({user}) => (
  <Fragment>
    <Title title={user.login} />

    <Layout>
      <div>{user.login}</div>
    </Layout>
  </Fragment>
)

Profile.propTypes = {
  user: shape({}).isRequired
}

export default Profile
