const config = {
  RAZORPAY_KEY_ID: "rzp_live_VRSEOVqdNxOi5n",
  // Backend config
  s3: {
    REGION: "ap-south-1",
    BUCKET: "airbornharsh-notes-storages-uploadsbucketc4b27cc7-1f3vii59bu926",
  },
  apiGateway: {
    REGION: "ap-south-1",
    URL: "https://288pu529b5.execute-api.ap-south-1.amazonaws.com",
  },
  cognito: {
    COGNITO_DOMAIN: "notetakingapp-not",
    REGION: "ap-south-1",
    USER_POOL_ID: "ap-south-1_8GuiuzecO",
    APP_CLIENT_ID: "lc37l1g1u81724d2u0lst68dk",
    IDENTITY_POOL_ID: "ap-south-1:70bdcdb7-73e6-4e40-8cc3-4341a8b918db",
  },
  social: {
    FB: "589302102787090",
  },
};

export default config;
