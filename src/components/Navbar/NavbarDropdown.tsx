import {BaseContainerProps} from "../../../globals";
import {setClassNames} from "../../utils/set-class-names";

export function NavbarDropdown(props: BaseContainerProps) {
  return (
    <div
      id={props.id}
      style={props.style}
      class={`uk-navbar-dropdown ${setClassNames(props)}`}
    >
      <ul class="uk-nav uk-navbar-dropdown-nav">{props.children}</ul>
    </div>
  );
}
