import {setClassNames} from "../../utils/set-class-names";
import {BadgeProps} from "../../../globals";


export function Badge(props: BadgeProps) {
  return (
    <span
      id={props.id}
      style={props.style}
      class={`uk-badge ${setClassNames(props)}`}
    >
      {props.count}
    </span>
  );
}
