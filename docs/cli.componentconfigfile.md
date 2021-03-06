<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@zeplin/cli](./cli.md) &gt; [ComponentConfigFile](./cli.componentconfigfile.md)

## ComponentConfigFile interface

Component configuration structure

<b>Signature:</b>

```typescript
export interface ComponentConfigFile 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [bitbucket](./cli.componentconfigfile.bitbucket.md) | <code>GitConfig</code> |  |
|  [components](./cli.componentconfigfile.components.md) | <code>ComponentConfig[]</code> | Union of [ComponentConfigBase](./cli.componentconfigbase.md) and [ComponentConfigCustom](./cli.componentconfigcustom.md) |
|  [github](./cli.componentconfigfile.github.md) | <code>GitConfig</code> | [GitConfig](./cli.gitconfig.md) |
|  [gitlab](./cli.componentconfigfile.gitlab.md) | <code>GitConfig</code> |  |
|  [links](./cli.componentconfigfile.links.md) | <code>LinkConfig[]</code> | Base URLs for custom link composition |
|  [plugins](./cli.componentconfigfile.plugins.md) | <code>Plugin[]</code> | [Plugin](./cli.plugin.md) names and their configurations |
|  [projects](./cli.componentconfigfile.projects.md) | <code>string[]</code> | Zeplin project IDs which the components belong to |
|  [styleguides](./cli.componentconfigfile.styleguides.md) | <code>string[]</code> | Zeplin styleguide IDs which the components belong to |

