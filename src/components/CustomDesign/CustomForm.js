import React from 'react';

function CustomForm(props) {
  return (
    <div>
      <Form>{props.children}</Form>
    </div>
  );
}

export default CustomForm;
