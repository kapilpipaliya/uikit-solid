import {BaseContainerProps} from "../../../globals";
import {setClassNames} from "../set-class-names";


export function CardHeader(props: BaseContainerProps) {
  return (
    <div
      id={props.id}
      style={props.style}
      class={`uk-card-header ${setClassNames(props)}`}
    >
      {props.children}
    </div>
  );
}
