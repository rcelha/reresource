[redux-resource](../README.md) > ["saga/index"](../modules/_saga_index_.md)

# External module: "saga/index"

## Index

### Functions

* [listResources](_saga_index_.md#listresources)
* [saga](_saga_index_.md#saga)

---

## Functions

<a id="listresources"></a>

###  listResources

▸ **listResources**(action: *[ResourceAction](../interfaces/_actions_types_.resourceaction.md)*): `IterableIterator`<`SimpleEffect`<"CALL", `CallEffectDescriptor`> \| `SimpleEffect`<"PUT", `PutEffectDescriptor`<[ResourceSuccessAction](../interfaces/_actions_types_.resourcesuccessaction.md)>> \| `SimpleEffect`<"PUT", `PutEffectDescriptor`<[ResourceFailureAction](../interfaces/_actions_types_.resourcefailureaction.md)>>>

*Defined in [saga/index.ts:42](https://github.com/rcelha/redux-resource/blob/1562510/src/saga/index.ts#L42)*

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

*Defined in [saga/index.ts:91](https://github.com/rcelha/redux-resource/blob/1562510/src/saga/index.ts#L91)*

**Returns:** `IterableIterator`<`SimpleEffect`<"FORK", `ForkEffectDescriptor`>>

___

