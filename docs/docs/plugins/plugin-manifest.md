---
sidebar_position: 1
---

# Plugin Manifest

Plugins must have a `manifest.json` file in the plugin's root folder.

Example:

```json title=manifest.json
{
  "id": "xxxxxxxxxxx",
  "name": "PluginName",
  "description": "description",
  "version": "1.1.1",
  "script": "dist/script.js",
  "options": "dist/options.html",
  "updateUrl": "https://example.com/manifest.json",
  "homepage": "https://example.com"
}
```

## id?: string

The plugin's unique id. If no id is provided, a random id will be used instead.

## name: string

Name of plugin.

## description?: string

Description of plugin.

## version?: string

Version number of plugin.

## script: string

Javascript file containing the plugin code.

## options?: string | ManifestOptions

Optional options page configuration. Can be a string path to an HTML file, or a ManifestOptions object.

### ManifestOptions

- **page**: string - Path to the options HTML file.
- **sameOrigin?**: boolean - Whether the options page should run in the same origin.

## homepage?: string

Optional URL for the plugin's home page.

## updateUrl?: string

Optional url to get future updated versions of the manifest.json file.

## authentication?: ManifestAuthentication

Optional authentication configuration for the plugin.

### ManifestAuthentication

- **loginUrl**: string - URL to the login page.
- **cookiesToFind?**: string[] - Cookies to look for after login.
- **loginButton?**: string - Selector for the login button.
- **headersToFind?**: string[] - Headers to look for after login.
- **domainHeadersToFind**: Record\<string, string[]\> - Domain-specific headers to find.
- **completionUrl?**: string - URL that indicates login is complete.
