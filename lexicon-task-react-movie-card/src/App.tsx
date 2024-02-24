import { AddMovie } from './componens/AddMovie';
import React from 'react';

export const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Movie List</h1>
      <AddMovie />
    </div>
  );
};


