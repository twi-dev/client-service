import {h} from "preact"
import {element, arrayOf} from "prop-types"

import Fragment from "common/component/Fragment"

import Header from "./Header"

const Layout = ({children, ...props}) => (
  <Fragment>
    <Header {...props} />

    {children}

    <div>Shortcuts</div>
  </Fragment>
)

Layout.propTypes = {
  children: arrayOf(element.isRequired).isRequired
}

export default Layout
