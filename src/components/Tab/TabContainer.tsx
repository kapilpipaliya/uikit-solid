import {TabContainerProps} from "../../../globals";
import {createEffect} from "solid-js";


export function TabContainer(props: TabContainerProps) {
  // TODO:
  const renderChildren = key => {
    return React.Children.map(props.children, (child, idx) => {
      const comp = child as React.ReactElement<any>;
      if (comp.key === key) {
        return comp;
      }
    });
  };

  const validateIdProp = () => {
    if (!props.id) {
      console.error('ID property is required to register to tab events');
    }
  };

  createEffect(() => {
    if (props.onBeforeShow) {
      validateIdProp();
      UIkit.util.on(props.id, 'beforeshow', () => {
        console.log('eventFired');
        props.onBeforeShow();
      });
    }

    if (props.onShow) {
      validateIdProp();
      UIkit.util.on(props.id, 'show', props.onShow);
    }

    if (props.onShown) {
      validateIdProp();
      UIkit.util.on(props.id, 'shown', props.onShown);
    }

    if (props.onBeforeHide) {
      validateIdProp();
      UIkit.util.on(props.id, 'beforehide', props.onBeforeHide);
    }

    if (props.onHide) {
      validateIdProp();
      UIkit.util.on(props.id, 'hide', props.onHide);
    }

    if (props.onHidden) {
      validateIdProp();
      UIkit.util.on(props.id, 'hidden', props.onHidden);
    }
  });

  return (
    <div
      id={props.id}
      style={props.style}
      classList={setClassNames(props)}
    >
      <ul uk-tab={props.options ? props.options : ''}>{renderChildren('tab')}</ul>
      <ul id={props.id ? props.id : ''} class="uk-switcher">
        {renderChildren('tab-content')}
      </ul>
    </div>
  );
}

export default TabContainer;
