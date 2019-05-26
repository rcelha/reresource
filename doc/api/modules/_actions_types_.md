[redux-resource](../README.md) > ["actions/types"](../modules/_actions_types_.md)

# External module: "actions/types"

## Index

### Interfaces

* [ResourceAction](../interfaces/_actions_types_.resourceaction.md)
* [ResourceFailureAction](../interfaces/_actions_types_.resourcefailureaction.md)
* [ResourceOptions](../interfaces/_actions_types_.resourceoptions.md)
* [ResourceSuccessAction](../interfaces/_actions_types_.resourcesuccessaction.md)
* [ServiceOptions](../interfaces/_actions_types_.serviceoptions.md)
* [ServiceReturn](../interfaces/_actions_types_.servicereturn.md)

### Type aliases

* [ServiceFunction](_actions_types_.md#servicefunction)

---

## Type aliases

<a id="servicefunction"></a>

###  ServiceFunction

**Ƭ ServiceFunction**: *`function`*

*Defined in [actions/types.ts:6](https://github.com/rcelha/redux-resource/blob/1562510/src/actions/types.ts#L6)*

#### Type declaration
▸(serviceParameters: *[ServiceOptions](../interfaces/_actions_types_.serviceoptions.md)*): `Promise`<[ServiceReturn](../interfaces/_actions_types_.servicereturn.md)>

**Parameters:**

| Name | Type |
| ------ | ------ |
| serviceParameters | [ServiceOptions](../interfaces/_actions_types_.serviceoptions.md) |

**Returns:** `Promise`<[ServiceReturn](../interfaces/_actions_types_.servicereturn.md)>

___

