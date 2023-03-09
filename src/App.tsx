import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { newVertex } from './utils/newVertex';
import { Vertex } from './components/Form';
import { Label } from './components/Label/Label';

const App: Component = () => {
  const meta = newVertex(0, ["Meta"], {
    id: "meta1",
    props: { enableThreeStateBehavior: false },
  });
  const data = newVertex(0, ["Vertex"], { id: "vertex1" });
  const setValue = (attribute: Vertex, data: any) => {
    console.log(attribute, data);
  };

  return (
    <div>
      <h1>uikit solidjs</h1>

      <h3>Label</h3>
      <Label content="Label" color="primary" meta={meta} data={data} setValue={setValue} />
    </div>
  );
};

export default App;
