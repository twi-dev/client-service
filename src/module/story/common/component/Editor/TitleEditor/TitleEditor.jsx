import React, {Component} from "react"
import {func, string} from "prop-types"
import {observer} from "mobx-react"

import Title from "common/component/Title"
import TextArea from "common/component/EnhancedTextField/TextAreaWithAutoSize"

import {container, field} from "./title-editor.sss"

/**
 * An editor component for story title
 */
@observer class TitleEditor extends Component {
  static displayName = "StoryTitleEditor"

  static propTypes = {
    title: string.isRequired,
    onInput: func,
    onEnter: func
  }

  static defaultProps = {
    onInput: () => {},
    onEnter: () => {}
  }

  componentDidMount = () => this.textarea.focus()

  setRef = ref => {
    if (ref) {
      this.textarea = ref.base
    }
  }

  selectFilledInputOnFocue = () => {
    if (this.props.title) {
      this.textarea.select()
    }
  }

  blur = () => this.textarea.blur()

  render() {
    return (
      <div className={container}>
        {this.props.title && <Title title={this.props.title} />}

        <TextArea
          placeholder="Enter a story title"
          name="title"
          class={field}
          value={this.props.title}
          onInput={this.props.onInput}
          onFocus={this.selectFilledInputOnFocue}
          onEsc={this.blur}
          onEnter={this.props.onEnter}
          ref={this.setRef}
          autocomplete="off"
          maxRows={2}
        />
      </div>
    )
  }
}

export default TitleEditor
