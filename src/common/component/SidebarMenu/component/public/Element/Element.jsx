import React, {Component} from "react"
import {string, oneOfType, arrayOf, element, shape} from "prop-types"
import {parse} from "url"

import withRouter from "react-router-dom/withRouter"
import Link from "react-router-dom/Link"
import cn from "classnames"

import Plain from "../../internal/Element"

import {container, active} from "./menu-element.scss"

@withRouter class Element extends Component {
  static displayName = "MenuElement"

  static propTypes = {
    href: string.isRequired,
    match: shape({path: string}).isRequired,
    children: oneOfType([string, element, arrayOf(element)]).isRequired
  }

  get isActive() {
    return this.props.match.path === parse(this.props.href).path
  }

  render() {
    return (
      <li className={cn(container, {[active]: this.isActive})}>
        <Link to={this.props.href}>
          <Plain>
            {this.props.children}
          </Plain>
        </Link>
      </li>
    )
  }
}

export default Element
