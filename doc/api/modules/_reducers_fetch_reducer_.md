[redux-resource](../README.md) > ["reducers/fetch-reducer"](../modules/_reducers_fetch_reducer_.md)

# External module: "reducers/fetch-reducer"

## Index

### Functions

* [reducer](_reducers_fetch_reducer_.md#reducer)
* [set](_reducers_fetch_reducer_.md#set)

### Object literals

* [INITIAL_RESOURCE](_reducers_fetch_reducer_.md#initial_resource)

---

## Functions

<a id="reducer"></a>

###  reducer

▸ **reducer**(state?: *`object`*, action: *[ResourceAction](../interfaces/_actions_types_.resourceaction.md) \| [ResourceSuccessAction](../interfaces/_actions_types_.resourcesuccessaction.md) \| [ResourceFailureAction](../interfaces/_actions_types_.resourcefailureaction.md)*): `object`

*Defined in [reducers/fetch-reducer.ts:26](https://github.com/rcelha/redux-resource/blob/1562510/src/reducers/fetch-reducer.ts#L26)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` state | `object` |  {} |
| action | [ResourceAction](../interfaces/_actions_types_.resourceaction.md) \| [ResourceSuccessAction](../interfaces/_actions_types_.resourcesuccessaction.md) \| [ResourceFailureAction](../interfaces/_actions_types_.resourcefailureaction.md) | - |

**Returns:** `object`

___
<a id="set"></a>

### `<Const>` set

▸ **set**(a: *`any`*, b: *`any`*, c: *`any`*): `any`

*Defined in [reducers/fetch-reducer.ts:15](https://github.com/rcelha/redux-resource/blob/1562510/src/reducers/fetch-reducer.ts#L15)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| a | `any` |
| b | `any` |
| c | `any` |

**Returns:** `any`

___

## Object literals

<a id="initial_resource"></a>

### `<Const>` INITIAL_RESOURCE

**INITIAL_RESOURCE**: *`object`*

*Defined in [reducers/fetch-reducer.ts:17](https://github.com/rcelha/redux-resource/blob/1562510/src/reducers/fetch-reducer.ts#L17)*

<a id="initial_resource.cached"></a>

####  cached

**● cached**: *`false`* = false

*Defined in [reducers/fetch-reducer.ts:19](https://github.com/rcelha/redux-resource/blob/1562510/src/reducers/fetch-reducer.ts#L19)*

___
<a id="initial_resource.data"></a>

####  data

**● data**: *`null`* =  null

*Defined in [reducers/fetch-reducer.ts:21](https://github.com/rcelha/redux-resource/blob/1562510/src/reducers/fetch-reducer.ts#L21)*

___
<a id="initial_resource.error"></a>

####  error

**● error**: *`null`* =  null

*Defined in [reducers/fetch-reducer.ts:23](https://github.com/rcelha/redux-resource/blob/1562510/src/reducers/fetch-reducer.ts#L23)*

___
<a id="initial_resource.initialized"></a>

####  initialized

**● initialized**: *`false`* = false

*Defined in [reducers/fetch-reducer.ts:20](https://github.com/rcelha/redux-resource/blob/1562510/src/reducers/fetch-reducer.ts#L20)*

___
<a id="initial_resource.loading"></a>

####  loading

**● loading**: *`false`* = false

*Defined in [reducers/fetch-reducer.ts:18](https://github.com/rcelha/redux-resource/blob/1562510/src/reducers/fetch-reducer.ts#L18)*

___
<a id="initial_resource.meta"></a>

####  meta

**● meta**: *`null`* =  null

*Defined in [reducers/fetch-reducer.ts:22](https://github.com/rcelha/redux-resource/blob/1562510/src/reducers/fetch-reducer.ts#L22)*

___

___

