module.exports = {
  name: 'Cyware',
  acronym: 'CY',
  description: 'Search Cyware',
  entityTypes: ['IPv4', 'IPv6', 'MD5', 'SHA1', 'SHA256', 'domain', 'url', 'email'],
  styles: ['./client/styles.less'],
  defaultColor: 'light-blue',
  onDemandOnly: true,
  block: {
    component: {
      file: './client/block.js'
    },
    template: {
      file: './client/block.hbs'
    }
  },
  request: {
    cert: '',
    key: '',
    passphrase: '',
    ca: '',
    proxy: ''
  },
  logging: {
    level: 'info'
  },
  options: [
    {
      key: 'url',
      name: 'Cyware API URL',
      description:
        'The base URL of the Cyware API including the scheme (i.e., https://). For example, `https://myorg.cyware.com/ctixapi`',
      default: '',
      type: 'text',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'appUrl',
      name: 'Cyware Web App URL',
      description:
        'The base URL of the Cyware Web App including the scheme (i.e., https://). For example, `https://myorg.cyware.com/ctix`.  This option must be visible to all users.',
      default: '',
      type: 'text',
      userCanEdit: false,
      adminOnly: false
    },
    {
      key: 'accessId',
      name: 'Access ID',
      description: 'Your Cyware Access ID',
      default: '',
      type: 'text',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'secretKey',
      name: 'Secret Key',
      description: 'Your Cyware Secret Key',
      default: '',
      type: 'password',
      userCanEdit: false,
      adminOnly: true
    }
  ]
};
