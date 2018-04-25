import {h} from "preact"
import {shape} from "prop-types"

import Title from "common/component/Title"
import Fragment from "common/component/Fragment"

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
