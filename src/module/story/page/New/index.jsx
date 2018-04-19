import prefetch from "core/hoc/prefetch"
import connect from "core/model/connect"

export default prefetch(() => import("./New"), {
  beforeLoad: () => ({state: {foo: "Foo"}}),
  beforeRender: (Target, props) => connect(props.state)(Target)
})
