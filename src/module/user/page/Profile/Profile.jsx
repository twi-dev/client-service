import {h} from "preact"
import {objectOf, string} from "prop-types"

import {query} from "core/transport/graphql"

import Title from "common/component/Title"
import Fragment from "common/component/Fragment"

import Model from "common/model/store/user/User"

import getUser from "./user.gql"

const Profile = ({user}) => (
  <Fragment>
    <Title title={user.login} />
    <div>{user.login}</div>
  </Fragment>
)

Profile.getInitialProps = async ({match}) => {
  const {login} = match.params

  const res = await query({
    query: getUser,
    variables: {
      login
    }
  })

  const user = Model.create({
    ...res.data.user,
    dates: {
      registeredAt: new Date(res.data.user.dates.registeredAt)
    }
  })

  return {user}
}

Profile.propTypes = {
  user: objectOf(string).isRequired // tmp
}

export default Profile
