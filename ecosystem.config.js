module.exports = {
  apps : [
      {
        name: "blog",
        script: "server/server.js",
        watch: true,
        env_production: {
            "PORT": 3000,
            "NODE_ENV": "production",
        }
      }
  ]
}
