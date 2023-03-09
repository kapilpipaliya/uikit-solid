import _classNames from "classnames";

import { ComponentProps } from "../Form";

export type LabelComponentProps = ComponentProps & LabelProps;

export function Label(props: LabelComponentProps) {
  const metaProps = () => props.meta.properties.props as LabelProps

  return (
    <div
      classList={{
        [`uk-label-${metaProps().color}`]: !!metaProps().color,
      }}
    >
      {props.content}
    </div>
  );
}
