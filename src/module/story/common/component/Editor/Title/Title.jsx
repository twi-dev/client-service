import {h, Component} from "preact"
import {func, string} from "prop-types"
import {observer} from "mobx-preact"

import Input from "common/component/EnhancedTextField/Input"

import {container} from "./title.sss"

/**
 * An editor component for story title
 */
@observer class Title extends Component {
  static displayName = "StoryTitleEditor"

  static propTypes = {
    title: string.isRequired,
    resetTitle: func,
    onInput: func
  }

  static defaultProps = {
    onInput: () => {},
    resetTitle: () => {}
  }

  componentDidMount = () => this.base.focus()

  selectFilledInputOnFocues = () => {
    if (this.props.title) {
      this.base.select()
    }
  }

  resetTitle = () => {
    this.props.resetTitle()

    this.base.blur()
  }

  render() {
    return (
      <Input
        placeholder="Enter a story title"
        name="title"
        class={container}
        value={this.props.title}
        onInput={this.props.onInput}
        onFocus={this.selectFilledInputOnFocues}
        onEsc={this.resetTitle}
        autocomplete="off"
      />
    )
  }
}

export default Title
