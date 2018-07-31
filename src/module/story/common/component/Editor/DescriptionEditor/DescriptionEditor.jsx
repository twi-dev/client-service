import React, {Component, createRef} from "react"
import {observer} from "mobx-react"
import {func, string} from "prop-types"

import TextArea from "common/component/EnhancedTextField/TextAreaWithAutoSize"

import {field} from "./description-editor.sss"

@observer class DescriptionEditor extends Component {
  static displayName = "StoryDescriptionEditor"

  static propTypes = {
    description: string,
    onInput: func,
    onKeyUp: func,
    onBackspace: func
  }

  static defaultProps = {
    description: "",
    onInput: () => {},
    onKeyUp: () => {},
    onBackspace: () => {}
  }

  onBackspace = event => {
    if (event.key.toLowerCase() === "backspace") {
      return void this.props.onBackspace(event)
    }

    this.props.onKeyUp(event)
  }

  focus = () => this.__ref.current.textarea.focus()

  blur = () => this.__ref.current.textarea.blur()

  __ref = createRef()

  render() {
    return (
      <TextArea
        name="description"
        placeholder="Write the story description here"
        class={field}
        onInput={this.props.onInput}
        value={this.props.description}
        onKeyUp={this.onBackspace}
        ref={this.__ref}
      />
    )
  }
}

export default DescriptionEditor
