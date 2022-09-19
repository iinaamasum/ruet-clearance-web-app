import React from 'react';
import loader from '../../assets/logo/loader.gif';

export default function LoadingComponent() {
  return (
    <div className="flex h-screen items-center justify-center">
      <img src={loader} alt="loading-gif" />
    </div>
  );
}
