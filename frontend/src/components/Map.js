import { world_map } from 'world-map.ts';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapsComponent, LayersDirective, LayerDirective } from '@syncfusion/ej2-react-maps';


class Map extends React.Component {
  constructor(props) {
    super(props);
    //tuo costruttore
  }

  componentDidMount() {

  }

  render() {
    <MapsComponent id="maps" height="200px" width="500px">

      <LayersDirective>
          <LayerDirective shapeData={world_map} shapeSettings={{
            autofill: true
          }}
          layerType='OSM'>
          </LayerDirective >
      </LayersDirective>
    </MapsComponent>
  }
}
