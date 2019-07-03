> WIP

# HOC

## withResource

```javascript
import React from 'react';
import { useEffect } from 'react';
import { withResource } from 'reresource';

const DetailsComponent = ({
  user,
  loadUser,
  group,
  loadGroup,
  company,
  loadCompany,
  userID,
}) => {
  useEffect(() => {
    loadUser(userID);
  }, [userID]);

  useEffect(() => {
    if (!user.data) return;
    loadGroup(user.data.group_id);
    loadCompany(user.data.company_id);
  }, [user]);

  return (
    <div>
      <p>
        User: <b>{user.data ? user.data.name : ''}</b>
      </p>
      <p>
        Group: <b>{group.data ? group.data.name : ''}</b>
      </p>
      <p>
        Company: <b>{company.data ? company.data.name : ''}</b>
      </p>
    </div>
  );
};

export default compose(
  withResource({
    resourceType: 'users',
    serviceFunction: usersAPI.list,
    name: 'user',
  }),
  withResource({
    resourceType: 'groups',
    serviceFunction: groupsAPI.list,
    name: 'group',
  }),
  withResource({
    resourceType: 'companies',
    serviceFunction: companyAPI.list,
    name: 'company',
  })
)(DetailsComponent);
```

## withQuery

```javascript
import React from 'react';
import { useEffect } from 'react';
import { withQuery } from 'reresource';

const UserList = ({ resource, loadResource }) => {
  useEffect(() => {
    if (resource.initialized) return;
    loadResource({ page: 0 });
  }, [resource, loadResource]);

  if (resource.error) return <div>Error</div>;
  if (resource.loading) return <div>Loading</div>;
  if (!resource.data) return null;

  return (
    <ul>
      {resource.data.map(x => (
        <li>{x.name}</li>
      ))}
    </ul>
  );
});


export default withQuery({
  resourceType: 'users',
  serviceFunction: usersApi.list,
})(UserList)
```

## withCreate

```javascript
const Form = ({ resource, createResource, ...props }) => {
  const [name, setName] = useState('');
  const onSubmit = () => {
    createResource({ name });
  };

  if (resource.data.id)
    return (
      <p>
        User created <a href={`/users/${resource.data.id}`}>view it here</a>
      </p>
    );

  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button type="submit" onClick={onSubmit} disabled={resource.initialized}>
        Submit
      </button>
    </div>
  );
};

export default withCreate({
  resourceType: 'users',
  serviceFunction: usersAPI.create,
});
```
