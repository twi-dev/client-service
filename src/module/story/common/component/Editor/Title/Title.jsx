import {h, Component} from "preact"
import {func, string} from "prop-types"
import {observer} from "mobx-preact"

import DocumentTitle from "common/component/Title"
import Input from "common/component/EnhancedTextField/Input"

import {container, field} from "./title.sss"

/**
 * An editor component for story title
 */
@observer class Title extends Component {
  static displayName = "StoryTitleEditor"

  static propTypes = {
    title: string.isRequired,
    resetTitle: func,
    onInput: func,
    onBlur: func
  }

  static defaultProps = {
    onInput: () => {},
    resetTitle: () => {},
    onBlur: () => {}
  }

  componentDidMount = () => this.__inputRef.focus()

  setRef = ref => {
    if (ref) {
      this.__inputRef = ref.base
    }
  }

  selectFilledInputOnFocues = () => {
    if (this.props.title) {
      this.__inputRef.select()
    }
  }

  resetTitle = () => {
    this.props.resetTitle()

    this.__inputRef.blur()
  }

  blur = () => {
    this.__inputRef.blur()

    this.props.onBlur()
  }

  render() {
    return (
      <div class={container}>
        {this.props.title && <DocumentTitle title={this.props.title} />}

        <Input
          placeholder="Enter a story title"
          name="title"
          class={field}
          value={this.props.title}
          onInput={this.props.onInput}
          onFocus={this.selectFilledInputOnFocues}
          onEsc={this.resetTitle}
          onEnter={this.blur}
          ref={this.setRef}
          autocomplete="off"
        />
      </div>
    )
  }
}

export default Title
