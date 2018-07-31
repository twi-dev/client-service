import React, {Component, createRef} from "react"
import {func, string} from "prop-types"
import {observer} from "mobx-react"

import Title from "common/component/Title"
import TextArea from "common/component/EnhancedTextField/TextArea"

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

  componentDidMount = () => this.__ref.current?.focus()

  __ref = createRef()

  selectFilledInputOnFocue = () => {
    if (this.props.title) {
      this.__ref.current.select()
    }
  }

  focus = () => this.__ref.current.focus()

  blur = () => this.__ref.current.blur()

  render() {
    return (
      <div className={container}>
        {this.props.title && <Title title={this.props.title} />}

        <TextArea
          placeholder="Enter a story title"
          name="title"
          className={field}
          value={this.props.title}
          onInput={this.props.onInput}
          onFocus={this.selectFilledInputOnFocue}
          onEsc={this.blur}
          onEnter={this.props.onEnter}
          ref={this.__ref}
          autoComplete="off"
        />
      </div>
    )
  }
}

export default TitleEditor
