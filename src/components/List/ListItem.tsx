import {BaseContainerProps} from "../../../globals";
import {setClassNames} from "../../utils/set-class-names";


export function ListItem(props: BaseContainerProps) {
  return (
    <li
      id={props.id}
      style={props.style}
      classList={setClassNames(props)}
    >
      {props.children}
    </li>
  );
}
