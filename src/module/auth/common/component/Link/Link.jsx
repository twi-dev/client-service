import {h} from "preact"
import {Link as RouterLink} from "react-router-dom"

import {container} from "./link.sss"

const Link = props => <div class={container}><RouterLink {...props} /></div>

export default Link
