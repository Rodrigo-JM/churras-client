module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'churras-client',
      script: 'yarn',
      args: 'run start',
    },
  ],
};
