import {createElement, useState, useRef, useEffect} from "react"
import {string, node, bool, oneOfType, func} from "prop-types"
import {useClickOutside, useHover} from "use-events"

import cn from "classnames"

import RenderFrom from "lib/component/RenderFrom"

import Button from "component/Button/Secondary"

import List from "./List"

import {container} from "./dropdown-menu.css"

function DropdownMenu({button, list, children, className, ...props}) {
  const base = useRef(null)

  const [isMouseOver, bind] = useHover()
  const [isVisible, set] = useState(false)

  function toggle() {
    if (!props.opensOnHover) {
      set(!isVisible)
    }
  }

  useClickOutside([base], () => {
    if (!props.opensOnHover) {
      set(false)
    }
  })

  useEffect(() => {
    if (props.opensOnHover) {
      set(isMouseOver)
    }
  }, [isMouseOver])

  return (
    <div {...bind} ref={base} className={cn(container, className)}>
      <RenderFrom onClick={toggle}>
        {
          do {
            if (button) {
              button
            } else {
              <Button>
                Open
              </Button>
            }
          }
        }
      </RenderFrom>

      {
        do {
          if (list) {
            createElement(list, {isVisible}, children)
          } else {
            <List isVisible={isVisible}>
              {children}
            </List>
          }
        }
      }
    </div>
  )
}

DropdownMenu.propTypes = {
  opensOnHover: bool,
  className: string,
  children: node.isRequired,
  button: oneOfType([node, func]),
  list: func
}

DropdownMenu.defaultProps = {
  opensOnHover: false,
  className: undefined,
  button: undefined,
  list: undefined
}

export default DropdownMenu
