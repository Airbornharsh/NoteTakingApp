const aws = require("aws-sdk");

const ses = new aws.SES();

export const handler = (event, context, callback) => {
  console.log(event);

  if (event.request.userAttributes.email) {
    sendEmail(
      event.request.userAttributes.email,
      "Welcome to Not-Taking-App",
      function (status) {
        callback(null, event);
      }
    );
  } else {
    callback(null, event);
  }
};

function sendEmail(to, body, completedCallback) {
  const eParams = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: "Cognito Identity Provider registration completed",
      },
    },

    Source: "harshkeshri1234567@gmail.com",
  };

  const email = ses.sendEmail(eParams, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("===EMAIL SENT===");
    }
    completedCallback("Email sent");
  });
  console.log("EMAIL CODE END");
}
