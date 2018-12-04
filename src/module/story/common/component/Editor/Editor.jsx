import React, {Component, createRef} from "react"
import {shape, string, func} from "prop-types"
import {computed} from "mobx"

import connect from "core/model/connect"
import preventDefault from "core/helper/decorator/preventDefault"

import TitleEditor from "./TitleEditor"
import DescriptionEditor from "./DescriptionEditor"
import CoverUploader from "./CoverUploader"

import {container} from "./editor.scss"

const mapStoresToProps = ({story}) => ({story})

@connect(mapStoresToProps)
class Editor extends Component {
  static displayName = "StoryEditor"

  static propTypes = {
    story: shape({
      title: string,
      description: string,
      updateTitleText: func.isRequired,
      updateDescriptionText: func.isRequired
    }).isRequired
  }

  __titleRef = createRef()

  __descriptionRef = createRef()

  @computed get story() {
    return this.props.story
  }

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
          onChange={this.story.updateTitleText}
          onEnter={this.jumpToDescription}
        />

        <DescriptionEditor
          ref={this.__descriptionRef}
          description={this.story.description}
          onChange={this.story.updateDescriptionText}
          onBackspace={this.jumpToTitle}
        />

        <CoverUploader />
      </div>
    )
  }
}

export default Editor
