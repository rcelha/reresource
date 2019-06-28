# List resources

```jsx
import React from 'react';
import { getResource, fetchResourceList } from 'redux-resource';

class UserList extends React.Component {
  componentDidMount() {
    this.props.fetchResourceList('users', service.fetchAllUsers);
  }

  render() {
    return (
      <li>
        {this.props.users.data.map(user => (
          <ul key={user.id}>{user.fullName}</ul>
        ))}
      </li>
    );
  }
}

const mapStateToProps = (state, props) => ({
  users: getResource(state, 'users'),
});

const mapDispatchToProps = {
  fetchResourceList,
};
```

## Additional parameters

When you backend requires additional parameters, you can do exactly the same as on `fetchResource`:

```jsx
// Sending as actionCreator parameter ...
this.props.fetchResourceList('users', service.fetchAllUsers, { page: 2 });

// ... or by binding
this.props.fetchResourceList('users', service.fetchAllUsers.bind(undefined, { page: 2 }));
```

## Caching

When one lists a resource, all the items get cached by they id.
So when some one click on the details below, it doesn't need to go to the backend (or can do it optmisticly)

```jsx
import React from 'react';
import { getResource, fetchResourceList } from 'redux-resource';

class UserList extends React.Component {
  componentDidMount() {
    this.props.fetchResourceList('users', service.fetchAllUsers);
  }

  onSelectUser = user => {
    this.props.fetchResource('users', service.fetchUser, user.id);
  };

  render() {
    return (
      <div>
        <div>
          <p>Selected user: {user.data.fullName}</p>
          <img src={user.data.avatarUrl} />
        </div>
        <hr />
        <li>
          {this.props.users.data.map(user => (
            <ul key={user.id} onClick={() => this.onSelectUser(user)}>
              {user.fullName}
            </ul>
          ))}
        </li>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  users: getResource(state, 'users'),
  user: getResource(state, 'users', props.id),
});

const mapDispatchToProps = {
  fetchResourceList,
};
```

Again, we can inform `redux-resource` to skip caching

```javascript
this.props.fetchResourceList('users', service.fetchAllUsers, null, { ignoreCache: true });
```

---

[back](../README.md)
