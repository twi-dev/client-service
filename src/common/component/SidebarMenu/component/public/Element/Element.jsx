import {h, Component} from "preact"
import {string, arrayOf, element, shape} from "prop-types"

import Link from "react-router-dom/Link"
import withRouter from "react-router-dom/withRouter"
import cn from "classnames"

import {active} from "./menu-element.sss"

@withRouter class Element extends Component {
  static displayName = "MenuElement"

  static propTypes = {
    href: string.isRequired,
    children: arrayOf(element.isRequired).isRequired,
    match: shape({path: string}).isRequired
  }

  get isActive() {
    return this.props.match.path === this.props.href
  }

  render() {
    return (
      <div class={cn({[active]: this.isActive})}>
        <Link to={this.props.href}>
          {this.props.children}
        </Link>
      </div>
    )
  }
}

export default Element
