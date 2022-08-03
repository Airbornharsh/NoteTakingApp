import AWS from "aws-sdk";
import handler from "../util/handler";

export const main = handler(async (event) => {
  const { receiverAddress } = JSON.parse(event.body);

  // Set the region
  AWS.config.update({ region: "ap-south-1" });

  // Create sendEmail params
  var params = {
    Destination: {
      ToAddresses: [receiverAddress],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: "HTML_FORMAT_BODY",
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Test email",
      },
    },
    Source: "harshkeshri1234567@gmail.com" /* required */,
  };

  // Create the promise and SES service object
  const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(function (data) {
      console.log(data.MessageId);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
});
