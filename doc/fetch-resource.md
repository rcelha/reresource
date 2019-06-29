# Fetch single resource

```jsx
import React from 'react';
import { getResource, fetchResource } from 'reresource';

class UserRepr extends React.Component {
  componentDidMount() {
    this.props.fetchResource('users', service.fetchUser, 1);
  }

  render() {
    if (this.props.user.error) return <div>Error loading user</div>;
    if (this.props.user.loading) return <div>loading...</div>;
    return <div>{this.props.user.data.fullName}</div>;
  }
}

const mapStateToProps = (state, props) => ({
  user: getResource(state, 'users', props.id),
});

const mapDispatchToProps = {
  fetchResource,
};
```

It's also possible to fetch a single resource ignoring the entity cache

```jsx
this.props.fetchResource('users', service.fetchUser, 1, { ignoreCache: true });
```

If you need to pass extra arguments to the service:

```jsx
const args = { id: 1 params: { cacheBuster: Math.random() } };
this.props.fetchResource('users', service.fetchUser, args);

// It is also possible by partially applying your service function, by it needs to receive the `id` as **last** parameter

const fetchUser = service.fetchUser.bind(null, { params: { cacheBuster } });
this.props.fetchResource('users', fetchUser, 1);
```

---

[back](../README.md)
