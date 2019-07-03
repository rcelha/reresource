# reresource

👋

[![Build Status](https://dev.azure.com/rcelha0341/rcelha/_apis/build/status/rcelha.redux-resource?branchName=master)](https://dev.azure.com/rcelha0341/rcelha/_build/latest?definitionId=1&branchName=master)
[![Version](https://img.shields.io/npm/v/reresource.svg?label=version)](https://npmjs.com/package/reresource)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/rcelha/reresource#docs)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/rcelha/reresource/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/rcelha/reresource/blob/master/LICENSE)
[![Twitter: rcelha](https://img.shields.io/twitter/follow/rcelha.svg?style=social)](https://twitter.com/rcelha)

> Manage resources in redux sanely

## Install

```sh
yarn add reresource
```

## Usage

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

## Docs

1. [Data-flow](/doc/data-flow.md)
1. Examples
   1. [Fetch resource](/doc/fetch-resource.md)
   1. [List resources](/doc/list-resources.md)
   1. [Create resource](/doc/create-resource.md)
   1. [Update resource](/doc/update-resource.md)
   1. [Delete resource](/doc/delete-resource.md)
1. [HOC](/doc/hoc.md)
1. [API docs](/doc/api/README.md)

## Run tests

```sh
yarn test
```

## Author

👤 **Rodrigo Correa Alves**

- Twitter: [@rcelha](https://twitter.com/rcelha)
- Github: [@rcelha](https://github.com/rcelha)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Rodrigo Correa Alves](https://github.com/rcelha).

This project is [MIT](https://github.com/rcelha/reresource/blob/master/LICENSE) licensed.
