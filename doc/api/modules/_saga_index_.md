[reresource](../README.md) > ["saga/index"](../modules/_saga_index_.md)

# External module: "saga/index"

## Index

### Functions

* [cacheCreatedResource](_saga_index_.md#cachecreatedresource)
* [listResources](_saga_index_.md#listresources)
* [saga](_saga_index_.md#saga)

---

## Functions

<a id="cachecreatedresource"></a>

###  cacheCreatedResource

▸ **cacheCreatedResource**(action: *[ResourceSuccessAction](../interfaces/_actions_types_.resourcesuccessaction.md)*): `IterableIterator`<`SimpleEffect`<"PUT", `PutEffectDescriptor`<[ResourceSuccessAction](../interfaces/_actions_types_.resourcesuccessaction.md)>>>

*Defined in [saga/index.ts:93](https://github.com/rcelha/reresource/blob/2e19365/src/saga/index.ts#L93)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| action | [ResourceSuccessAction](../interfaces/_actions_types_.resourcesuccessaction.md) |

**Returns:** `IterableIterator`<`SimpleEffect`<"PUT", `PutEffectDescriptor`<[ResourceSuccessAction](../interfaces/_actions_types_.resourcesuccessaction.md)>>>

___
<a id="listresources"></a>

###  listResources

▸ **listResources**(action: *[ResourceAction](../interfaces/_actions_types_.resourceaction.md)*): `IterableIterator`<`SimpleEffect`<"CALL", `CallEffectDescriptor`> \| `SimpleEffect`<"PUT", `PutEffectDescriptor`<[ResourceSuccessAction](../interfaces/_actions_types_.resourcesuccessaction.md)>> \| `SimpleEffect`<"PUT", `PutEffectDescriptor`<[ResourceFailureAction](../interfaces/_actions_types_.resourcefailureaction.md)>>>

*Defined in [saga/index.ts:44](https://github.com/rcelha/reresource/blob/2e19365/src/saga/index.ts#L44)*

*__todo__*: Avoid fetching the same list multiple times

**Parameters:**

| Name | Type |
| ------ | ------ |
| action | [ResourceAction](../interfaces/_actions_types_.resourceaction.md) |

**Returns:** `IterableIterator`<`SimpleEffect`<"CALL", `CallEffectDescriptor`> \| `SimpleEffect`<"PUT", `PutEffectDescriptor`<[ResourceSuccessAction](../interfaces/_actions_types_.resourcesuccessaction.md)>> \| `SimpleEffect`<"PUT", `PutEffectDescriptor`<[ResourceFailureAction](../interfaces/_actions_types_.resourcefailureaction.md)>>>

___
<a id="saga"></a>

###  saga

▸ **saga**(): `IterableIterator`<`SimpleEffect`<"FORK", `ForkEffectDescriptor`>>

*Defined in [saga/index.ts:139](https://github.com/rcelha/reresource/blob/2e19365/src/saga/index.ts#L139)*

**Returns:** `IterableIterator`<`SimpleEffect`<"FORK", `ForkEffectDescriptor`>>

___

