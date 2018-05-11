import {h, Component} from "preact"
import {shape} from "prop-types"
import {observer} from "mobx-preact"
import {computed} from "mobx"

import TitleEditor from "./TitleEditor"
import DescriptionEditor from "./DescriptionEditor"

import {container} from "./editor.sss"

@observer class Editor extends Component {
  static displayName = "StoryEditor"

  static propTypes = {
    story: shape({}).isRequired
  }

  @computed get story() {
    return this.props.story
  }

  render() {
    const {title, resetTitle, updateTextField: onInput} = this.props.story

    return (
      <div class={container}>
        <TitleEditor {...{title, onInput, resetTitle}} />

        <DescriptionEditor
          description={this.story.description}
          onInput={this.story.updateTextField}
        />
      </div>
    )
  }
}

export default Editor
