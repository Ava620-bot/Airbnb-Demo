import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

function Map() {

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        longitude: 37.7577,
        latitude: -122.4376,
        zoom: 11,
    });

  return (
    <ReactMapGL
    mapStyle="mapbox://styles/avanish07srivas/cl1mfca80001d14mobw1wumpl"
    //here process is functionality which gets where to go in the react and get what you are looking for
    mapboxApiAccessToken={process.env.mapbox_key}
    // here we are spreading out the viewport variable stuff openly using spread operator
    {...viewport}
    >

    </ReactMapGL>
  );
}

export default Map;