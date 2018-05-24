import {h, Component} from "preact"
import {shape, string, func} from "prop-types"
import {observer} from "mobx-preact"
import {computed} from "mobx"

import preventDefault from "core/helper/decorator/preventDefault"

import TitleEditor from "./TitleEditor"
import DescriptionEditor from "./DescriptionEditor"

import {container} from "./editor.sss"

@observer class Editor extends Component {
  static displayName = "StoryEditor"

  static propTypes = {
    story: shape({
      title: string,
      description: string,
      updateTextField: func.isRequired
    }).isRequired
  }

  @computed get story() {
    return this.props.story
  }

  setDescriptionRef = ref => {
    if (ref) {
      this.__description = ref.base
    }
  }

  setTitleRef = ref => {
    if (ref) {
      this.__title = ref.textarea
    }
  }

  switchToDescriptionField = () => void this.__description.focus()

  switchToTitleField = () => {
    if (!this.story.description) {
      this.__title.focus()
    }
  }

  render() {
    return (
      <div class={container}>
        <TitleEditor
          ref={this.setTitleRef}
          title={this.story.title}
          onInput={this.story.updateTextField}
          onEnter={preventDefault(this.switchToDescriptionField)}
        />

        <DescriptionEditor
          ref={this.setDescriptionRef}
          description={this.story.description}
          onInput={this.story.updateTextField}
          onBackspace={this.switchToTitleField}
        />
      </div>
    )
  }
}

export default Editor
