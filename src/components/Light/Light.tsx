import {BaseContainerProps} from "../../../globals";
import {setClassNames} from "../../utils/set-class-names";


export function Light(props: BaseContainerProps) {
  return (
    <div
      id={props.id}
      style={props.style}
      class={`uk-light ${setClassNames(props)}`}
    >
      {props.children}
    </div>
  );
}
