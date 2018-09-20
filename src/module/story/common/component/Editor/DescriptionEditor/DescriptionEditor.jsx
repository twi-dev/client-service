import React, {Component, createRef} from "react"
import {observer} from "mobx-react"
import {func, string} from "prop-types"

import TextArea from "common/component/EnhancedTextField/TextAreaWithAutoSize"

import {field} from "./description-editor.scss"

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

  ref = createRef()

  onBackspace = event => {
    if (event.key.toLowerCase() === "backspace") {
      return void this.props.onBackspace(event)
    }

    this.props.onKeyUp(event)
  }

  focus = () => this.ref.current.textarea.focus()

  blur = () => this.ref.current.textarea.blur()

  render() {
    return (
      <TextArea
        name="description"
        placeholder="A few more words to explain what is your story about"
        className={field}
        onInput={this.props.onInput}
        value={this.props.description}
        onKeyUp={this.onBackspace}
        ref={this.ref}
      />
    )
  }
}

export default DescriptionEditor
