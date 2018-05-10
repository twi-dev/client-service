import {h, Component} from "preact"
import {shape} from "prop-types"
import {observer} from "mobx-preact"

import TitleEditor from "./Title"

import {container} from "./editor.sss"

@observer class Editor extends Component {
  static displayName = "StoryEditor"

  static propTypes = {
    story: shape({}).isRequired
  }

  render() {
    const {title, resetTitle, updateTextField: onInput} = this.props.story

    return (
      <div class={container}>
        <TitleEditor {...{title, onInput, resetTitle}} />

        <div>StoryEditor</div>
      </div>
    )
  }
}

export default Editor
