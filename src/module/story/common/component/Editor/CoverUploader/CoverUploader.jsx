import {createElement} from "react"

import Dropzone from "react-dropzone"

import {container} from "./cover-uploader.scss"

const CoverUploader = () => (
  <Dropzone className={container}>
    Upload a cover.
  </Dropzone>
)

export default CoverUploader
