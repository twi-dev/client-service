import {createElement, Fragment} from "react"

import Title from "lib/component/Title"

import DropdownMenu from "common/component/DropdownMenu"

const Home = () => (
  <Fragment>
    <Title title="Feed" />

    <div>User′s feed page will be here</div>

    <DropdownMenu>
      <div>
        Foo
      </div>
    </DropdownMenu>
  </Fragment>
)

export default Home
