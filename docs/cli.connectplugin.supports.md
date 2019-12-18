<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@zeplin/cli](./cli.md) &gt; [ConnectPlugin](./cli.connectplugin.md) &gt; [supports](./cli.connectplugin.supports.md)

## ConnectPlugin.supports() method

CLI invokes this method for each component in the configuration file to determine if this plugin should process this component

<b>Signature:</b>

```typescript
supports(componentConfig: ComponentConfig): boolean;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  componentConfig | <code>ComponentConfig</code> | [ComponentConfig](./cli.componentconfig.md) |

<b>Returns:</b>

`boolean`

true if the plugin supports the component, false otherwise
