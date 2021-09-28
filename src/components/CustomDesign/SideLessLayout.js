import React from 'react';
import Navbar from '../Header';

function SideLessLayout(props) {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '6rem' }}>{props.children}</div>
    </>
  );
}
export default SideLessLayout;
