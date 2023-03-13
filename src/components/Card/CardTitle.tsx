import {BaseContainerProps} from "../../../globals";
import {setClassNames} from "../../utils/set-class-names";


export function CardTitle(props: BaseContainerProps) {
  return (
    <h3
      id={props.id}
      style={props.style}
      class={`uk-card-title ${setClassNames(props)}`}
    >
      {props.children}
    </h3>
  );
}
