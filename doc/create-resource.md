# Create resource

```jsx
import React from 'react';
import { createResource } from 'redux-resource';

class UserList extends React.Component {
  state = { fullName: '' };

  onSubmit = () => {
    this.props.createResource('users', service.postUser, { fullName: this.state.fullName });
  };

  onNameChange = e => {
    this.setState({ fullName: e.target.value });
  };

  render() {
    return (
      <div>
        <input type="text" onChange={this.onNameChange} value={this.state.fullName} />
        <button onClick={onSubmit}>save</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createResource,
};
```

---

[back](../README.md)
