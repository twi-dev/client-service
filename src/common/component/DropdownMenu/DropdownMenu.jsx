import {createElement, useState, useRef, useEffect} from "react"
import {useClickOutside, useHover} from "use-events"
import {string, node, bool} from "prop-types"

import cn from "classnames"

import Button from "common/component/Button/Secondary"

import {container, hidden, list} from "./dropdown-menu.css"

function DropdownMenu({children, className, ...props}) {
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
      <Button onClick={toggle}>
        Open
      </Button>

      <div className={cn(list, {[hidden]: !isVisible})}>
        {children}
      </div>
    </div>
  )
}

DropdownMenu.propTypes = {
  opensOnHover: bool,
  className: string,
  children: node.isRequired
}

DropdownMenu.defaultProps = {
  opensOnHover: false,
  className: undefined
}

export default DropdownMenu
