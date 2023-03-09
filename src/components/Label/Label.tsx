import _classNames from "classnames";
import { setClassNames } from "../../utils/set-class-names";
import { ComponentProps } from "../Form";

export type LabelComponentProps = ComponentProps & LabelProps;

export function Label(props: LabelComponentProps) {
  const _setClassNames = (): string => {
    return _classNames("uk-label", {
      [`uk-label-${props.color}`]: !!props.color,
    });
  };

  return (
    <div
      id={props.id ? props.id : null}
      style={props.style ? props.style : null}
      className={`${_setClassNames()}`}
    >
      {props.content}
    </div>
  );
}
