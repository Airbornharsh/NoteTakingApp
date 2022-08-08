const aws = require("aws-sdk");

const ses = new aws.SES();

export const handler = (event, context, callback) => {
  console.log(event);

  if (event.email) {
    sendEmail(
      event.email,
      `Your Password: ${event.password}`,
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
        Data: "WELCOME TO NOT",
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
