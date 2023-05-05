import {BaseContainerProps} from "../../../globals";
import {setClassNames} from "../set-class-names";

export function CardBody(props: BaseContainerProps) {
  return (
    <div
      id={props.id}
      style={props.style}
      class={`uk-card-body ${setClassNames(props)}`}
    >
      {props.children}
    </div>
  );
}
