import type { Component } from 'solid-js';

import { newVertex } from './utils/newVertex';
import { Vertex } from './components/Form';
import { Label } from './components/Label/Label';

export const App = () => {
  const meta = newVertex(0, ["Meta"], {
    id: "meta1",
    props: { enableThreeStateBehavior: false, content: "Label", color: "primary" },
  });
  const data = newVertex(0, ["Vertex"], { meta1: "Sample Label" });

  const setValue = (attribute: Vertex, data: any) => {
    console.log(attribute, data);
  };

  return (
    <div>
      <h1>uikit solidjs</h1>

      <h3>Label</h3>
      <Label meta={meta} data={data} setValue={setValue} />
    </div>
  );
};
