# Polarity - Cyware Integration

The Polarity Cyware integration allows Polarity to search Cyware indicators including IPs, Hashes, URLs, Domains, and emails.

For more information on Cyware, please visit [official website](https://www.cyware.com/).

| ![](./assets/integration-example-ip.png) | ![](./assets/integration-example-hash.png) |
|------------------------------------------|--------------------------------------------|
| *IP Address Example*                     | *Hash Example*                             |

## Cyware Integration Options
### Cyware API URL
The base URL of the Cyware API including the scheme (i.e., https://). For example, `https://myorg.cyware.com/ctixapi`

### Cyware Web App URL
The base URL of the Cyware Web App including the scheme (i.e., https://). For example, `https://myorg.cyware.com/ctix`. This option must be visible to all users.

### Access ID
Your Cyware Access ID

### Secret Key
Your Cyware Secret Key

### Minimum Analyst Score

The minimum analyst score an indicator should have to be returned. An indicator with a score equal to or greater than the provided minimum will be returned. Defaults to 0. It is recommended to clear the integration cache after making changes to this setting.

## Installation Instructions

Installation instructions for integrations are provided on the [PolarityIO GitHub Page](https://polarityio.github.io/).

## Polarity

Polarity is a memory-augmentation platform that improves and accelerates analyst decision making.  For more information about the Polarity platform please see:

https://polarity.io/
