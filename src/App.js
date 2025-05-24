import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import CollageCreator from './components/CollageCreator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isBordered>
        <NavbarBrand>
          <p className="font-bold text-inherit text-2xl">CollageCraft</p>
        </NavbarBrand>
        <NavbarContent justify="start">
          <NavbarItem className="hidden sm:flex ml-2">
            <span className="text-sm text-gray-500">Interactive Diptych & Triptych Creator</span>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CollageCreator />
      </main>
    </div>
  );
}

export default App;