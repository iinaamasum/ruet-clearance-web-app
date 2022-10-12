import React from 'react';
import './LoadingComponent.css';

export default function LoadingComponent() {
  return (
    <div className="flex items-center justify-center h-screen">
      <span className="loader"></span>
    </div>
  );
}
