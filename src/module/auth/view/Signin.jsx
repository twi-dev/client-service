import {h} from "preact"

import {container, box, title} from "../style/form.sss"

const Home = () => (
  <div class={container}>
    <div class={box}>
      <div class={title}>Signin</div>
      <div>
        <input type="text" placeholder="Email or login..." />
        <input type="password" placeholder="Password..." />
        <button>Sign in</button>
      </div>
    </div>
  </div>
)

export default Home
