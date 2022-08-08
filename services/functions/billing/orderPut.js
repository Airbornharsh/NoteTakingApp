// Load the AWS SDK for Node.js
import AWS from "aws-sdk";

export async function orderPut({ emailId, orderId }) {
  console.log("BILLING");
  const db = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "Order",
    Item: {
      // emailId: emailId,
      // orderId: orderId,
    },
  };

  db.put(params)
    .promise()
    .then((response) => {
      console.log("SUCCESS", response);
    })
    .catch((error) => {
      console.log(error);
    });
}
