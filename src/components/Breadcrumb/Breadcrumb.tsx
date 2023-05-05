import {setClassNames} from "../set-class-names";
import {BreadcrumbProps} from "../../../globals";


export function Breadcrumb(props: BreadcrumbProps) {
  return (
    <ul
      id={props.id}
      style={props.style}
      class={`uk-breadcrumb ${setClassNames(props)}`}
    >
      {props.children}
    </ul>
  );
}