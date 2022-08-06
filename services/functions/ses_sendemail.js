import AWS from "aws-sdk";
import handler from "../util/handler";

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export const main = handler(async (event) => {
  const { receiverAddress, name } = JSON.parse(event.body);

  AWS.config.update({ region: "ap-south-1" });

  const message = () => {
    return `Welcome ${event.userName} to Not-Taking-App`;
  };

  // Create sendEmail params
  var params = {
    Destination: {
      ToAddresses: ["airbornharsh69@gmail.com"],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: message(),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Welcome to Not-Taking-App",
      },
    },
    Source: "harshkeshri1234567@gmail.com",
  };

  // Create the promise and SES service object
  const sendPromise = ses.sendEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (err) {
      console.log(err);
      return err;
    });
});
