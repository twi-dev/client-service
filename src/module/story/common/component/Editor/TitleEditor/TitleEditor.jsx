import {h, Component} from "preact"
import {func, string} from "prop-types"
import {observer} from "mobx-preact"

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
    resetTitle: func,
    onInput: func,
    onEnter: func
  }

  static defaultProps = {
    onInput: () => {},
    resetTitle: () => {},
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

  resetTitle = () => {
    this.props.resetTitle()

    this.textarea.blur()
  }

  render() {
    return (
      <div class={container}>
        {this.props.title && <Title title={this.props.title} />}

        <TextArea
          placeholder="Enter a story title"
          name="title"
          class={field}
          value={this.props.title}
          onInput={this.props.onInput}
          onFocus={this.selectFilledInputOnFocue}
          onEsc={this.resetTitle}
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
