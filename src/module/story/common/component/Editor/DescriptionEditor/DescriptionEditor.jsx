import {h, Component} from "preact"
import {observer} from "mobx-preact"
import {func, string} from "prop-types"

import TextArea from "common/component/EnhancedTextField/TextAreaWithAutoSize"

import {field} from "./description-editor.sss"

@observer class DescriptionEditor extends Component {
  static displayName = "StoryDescriptionEditor"

  static propTypes = {
    description: string,
    onInput: func
  }

  static defaultProps = {
    description: "",
    onInput: () => {}
  }

  render() {
    return (
      <TextArea
        name="description"
        placeholder="Write a story description here"
        class={field}
        onInput={this.props.onInput}
        value={this.props.description}
      />
    )
  }
}

export default DescriptionEditor
