[redux-resource](../README.md) > ["helpers"](../modules/_helpers_.md)

# External module: "helpers"

## Index

### Functions

* [getFrom](_helpers_.md#getfrom)
* [getQueries](_helpers_.md#getqueries)

---

## Functions

<a id="getfrom"></a>

###  getFrom

▸ **getFrom**(state: *`object`*, resource: *`string`*, id?: *`string` \| `number`*): [StructuredResource](../interfaces/_reducers_types_.structuredresource.md)

*Defined in [helpers.ts:11](https://github.com/rcelha/redux-resource/blob/2e19365/src/helpers.ts#L11)*

Get a resource from the store

It works with single resource or lists, depending on whether you sent and `id` or not

**Parameters:**

**state: `object`**

| Name | Type |
| ------ | ------ |
| resources | `object` |

**resource: `string`**

**`Optional` id: `string` \| `number`**

**Returns:** [StructuredResource](../interfaces/_reducers_types_.structuredresource.md)

___
<a id="getqueries"></a>

###  getQueries

▸ **getQueries**(state: *`object`*, resource: *`string`*, queries?: *[`object`]*): [StructuredResource](../interfaces/_reducers_types_.structuredresource.md)

*Defined in [helpers.ts:33](https://github.com/rcelha/redux-resource/blob/2e19365/src/helpers.ts#L33)*

Get one or more queries

When there is more than one query, it combines they in a singe StructuredResource, appending the data, and merging the metadata

**Parameters:**

**state: `object`**

| Name | Type |
| ------ | ------ |
| resources | `object` |

**resource: `string`**

**`Default value` queries: [`object`]**

**Returns:** [StructuredResource](../interfaces/_reducers_types_.structuredresource.md)

___

