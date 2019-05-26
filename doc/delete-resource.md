# Delete resource

```javascript
import React from 'react';
import { deleteResource } from 'redux-resource';

class UserList extends React.Component {
  onSaveClick = user => {
    this.props.deleteResource('users', service.deleteUser, 1);
  };

  render() {
    return (
      <li>
        {this.props.users.map(user => (
          <ul key={user.id}>
            {user.fullName} <button onClick={() => this.onDeleteClick(user)}>delete</button>
          </ul>
        ))}
      </li>
    );
  }
}

const mapDispatchToProps = {
  deleteResource,
};
```

---

[back](../README.md)
