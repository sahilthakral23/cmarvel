module.exports = {
  database: {
    default: {
      host: process.env.DBHOST,
      user: process.env.DBUSER || 'root',
      password: process.env.DBPASSWORD
    },
  },
};
