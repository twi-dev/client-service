import React, {Component, createRef} from "react"
import {shape, string, func} from "prop-types"
import {observer} from "mobx-react"
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

  __titleRef = createRef()

  __descriptionRef = createRef()

  @preventDefault jumpToDescription = () => {
    this.__descriptionRef.current.focus()
  }

  jumpToTitle = () => {
    if (!this.story.description) {
      this.__titleRef.current.focus()
    }
  }

  render() {
    return (
      <div className={container}>
        <TitleEditor
          ref={this.__titleRef}
          title={this.story.title}
          onInput={this.story.updateTextField}
          onEnter={this.jumpToDescription}
        />

        <DescriptionEditor
          ref={this.__descriptionRef}
          description={this.story.description}
          onInput={this.story.updateTextField}
          onBackspace={this.jumpToTitle}
        />
      </div>
    )
  }
}

export default Editor
