import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>
        <h1>Zoe: Advanced AI System</h1>
        <nav>
          <ul>
            <li><a href="/">Zoe's Game</a></li>
            {/* <li><a href="/phoebe">Phoebe</a></li> */}
            <li><a href="/neural">Neural</a></li>
            <li><a href="/engine">Engine</a></li>
            <li><a href="/instaApp">InstaApp</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;