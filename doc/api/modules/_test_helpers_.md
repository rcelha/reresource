[reresource](../README.md) > ["test-helpers"](../modules/_test_helpers_.md)

# External module: "test-helpers"

## Index

### Variables

* [USERS](_test_helpers_.md#users)

### Functions

* [setupStore](_test_helpers_.md#setupstore)
* [sleep](_test_helpers_.md#sleep)

### Object literals

* [service](_test_helpers_.md#service)

---

## Variables

<a id="users"></a>

### `<Const>` USERS

**● USERS**: *`Dictionary`<`object`>* =  keyBy(
  [
    { id: 1, name: 'Rodrigo' },
    { id: 2, name: 'Fernanda' },
    { id: 11, name: 'Cherry' },
    { id: 12, name: 'Tyrion' },
    { id: 21, name: 'Liz' },
    { id: 22, name: 'Edo' },
  ],
  'id'
)

*Defined in [test-helpers.ts:18](https://github.com/rcelha/reresource/blob/2e19365/src/test-helpers.ts#L18)*

___

## Functions

<a id="setupstore"></a>

### `<Const>` setupStore

▸ **setupStore**(): `Store`<`Object`, `AnyAction`> & `object`

*Defined in [test-helpers.ts:11](https://github.com/rcelha/reresource/blob/2e19365/src/test-helpers.ts#L11)*

**Returns:** `Store`<`Object`, `AnyAction`> & `object`

___
<a id="sleep"></a>

### `<Const>` sleep

▸ **sleep**(milliseconds: *`number`*): `Promise`<`Object`>

*Defined in [test-helpers.ts:7](https://github.com/rcelha/reresource/blob/2e19365/src/test-helpers.ts#L7)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| milliseconds | `number` |

**Returns:** `Promise`<`Object`>

___

## Object literals

<a id="service"></a>

### `<Const>` service

**service**: *`object`*

*Defined in [test-helpers.ts:30](https://github.com/rcelha/reresource/blob/2e19365/src/test-helpers.ts#L30)*

<a id="service.fetchuser"></a>

####  fetchUser

▸ **fetchUser**(__namedParameters: *`object`*): `object`

*Defined in [test-helpers.ts:31](https://github.com/rcelha/reresource/blob/2e19365/src/test-helpers.ts#L31)*

**Parameters:**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| id | `number` |

**Returns:** `object`

___
<a id="service.fetchusers"></a>

####  fetchUsers

▸ **fetchUsers**(__namedParameters?: *`object`*): `object`

*Defined in [test-helpers.ts:35](https://github.com/rcelha/reresource/blob/2e19365/src/test-helpers.ts#L35)*

**Parameters:**

**`Default value` __namedParameters: `object`**

| Name | Type | Default value |
| ------ | ------ | ------ |
| p | `number` | 0 |

**Returns:** `object`

___
<a id="service.postuser"></a>

####  postUser

▸ **postUser**(__namedParameters?: *`object`*): `object`

*Defined in [test-helpers.ts:43](https://github.com/rcelha/reresource/blob/2e19365/src/test-helpers.ts#L43)*

**Parameters:**

**`Default value` __namedParameters: `object`**

| Name | Type | Default value |
| ------ | ------ | ------ |
| expand | `boolean` | false |

**Returns:** `object`

___

___

