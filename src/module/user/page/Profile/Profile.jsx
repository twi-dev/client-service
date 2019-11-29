import {createElement} from "react"
import {shape} from "prop-types"

import connect from "lib/model/connect"

import Title from "common/component/Title"

const mapStoresToProps = ({user}) => ({user})

const Profile = ({user}) => (
  <>
    <Title title={user.login} />

    <div>{user.login}</div>
  </>
)

Profile.propTypes = {
  user: shape({}).isRequired
}

export default Profile |> connect(mapStoresToProps)
