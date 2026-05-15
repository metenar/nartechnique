"use client";

import dynamic from "next/dynamic";
import React from "react";

const MapWrapper = dynamic(() => import("./ServiceMap"), { 
  ssr: false,
  loading: () => <div style={{height: '400px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading interactive map...</div>
});

export default MapWrapper;
