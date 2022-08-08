// Load the AWS SDK for Node.js
import AWS from "aws-sdk";
import handler from "../../util/handler";

const db = new AWS.DynamoDB();

export const orderGet = handler(async (emailId) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      emailId: emailId,
    },
  };

  const returningData = {};

  // Call DynamoDB to add the item to the table
  db.getItem(params, function (err, data) {
    if (err) {
      console.log("Error143", err);
    } else {
      console.log("Success", data);
      returningData.data = data;
    }
  });
  return returningData;
});
