> WIP

# Update resource

```jsx
import React from 'react';
import { getResource, fetchResource, updateResource } from 'reresource';

class UserRepr extends React.Component {
  state = {
    fullName: this.props.user.fullName,
  };

  componentDidMount() {
    this.props.fetchResource('users', service.fetchUser, 1);
  }

  onSubmit = () => {
    this.props.updateResource('users', service.putUser, {
      id: this.props.userId,
      fullName: this.state.fullName,
    });
  };

  onNameChange = e => {
    this.setState({ fullName: e.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.onNameChange}
          value={this.state.fullName}
        />
        <button onClick={onSubmit}>save</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: getResource(state, 'users', props.id),
});

const mapDispatchToProps = {
  fetchResource,
  updateResource,
};
```

---

[back](../README.md)
