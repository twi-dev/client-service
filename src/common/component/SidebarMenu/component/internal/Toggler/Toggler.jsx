import {createElement, Component} from "react"
import {inject, observer} from "mobx-react"
import {shape, func, bool} from "prop-types"

import isFunction from "lodash/isFunction"

import Button from "common/component/Button"

import Element from "../Element"
import Icon from "../Element/Icon"
import Label from "../Element/Label"

import {container} from "./menu-toggler.css"

@inject("menu") @observer
class Toggler extends Component {
  static propTypes = {
    menu: shape({
      isOpen: bool.isRequired,
      isHidden: bool.isRequired,
      open: func.isRequired,
      close: func.isRequired
    }).isRequired,
    onClose: func,
    onOpen: func
  }

  static defaultProps = {
    onClose: null,
    onOpen: null
  }

  get label() {
    return this.props.menu.isOpen ? "Collapse" : "Expand"
  }

  toggle = event => {
    const {menu, onClose, onOpen} = this.props

    if (menu.isOpen) {
      menu.close()

      if (isFunction(onClose)) {
        onClose(event)
      }
    } else {
      menu.open()

      if (isFunction(onOpen)) {
        onOpen(event)
      }
    }
  }

  render() {
    const {isOpen, isHidden} = this.props.menu

    return (
      <Button
        className={container}
        disabled={isHidden}
        onClick={this.toggle}
      >
        <Element title={this.label}>
          <Icon>{isOpen ? "<<" : ">>"}</Icon>

          <Label>{this.label}</Label>
        </Element>
      </Button>
    )
  }
}

export default Toggler
