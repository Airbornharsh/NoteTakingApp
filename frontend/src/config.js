const config = {
  STRIPE_KEY:
    "pk_test_51LIOa4SGwJMZZgsD0kDU6E7jKk6rlbISG1XBZWbZ9OX4wJAnqotx3AL2CsymzWkjVRxN8wkJw4ptot2kcPXQCAYK001TcndJ6z",
  // Backend config
  s3: {
    REGION: process.env.REACT_APP_REGION,
    BUCKET: process.env.REACT_APP_BUCKET,
  },
  apiGateway: {
    REGION: process.env.REACT_APP_REGION,
    URL: process.env.REACT_APP_API_URL,
  },
  cognito: {
    REGION: process.env.REACT_APP_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
  social: {
    FB: "589302102787090",
  },
};

export default config;
