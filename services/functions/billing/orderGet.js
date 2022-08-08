import handler from "../../util/handler";
import dynamoDb from "../../util/dynamodb";

export const orderGet = handler(async ({ emailId }) => {
  const params = {
    TableName: "airbornharsh-notes-Detail",
    Key: {
      emailId: emailId,
      orderId: "razorpay_order_id_value_notes",
    },
  };

  const result = await dynamoDb.get(params);

  console.log(result);

  return result.Item;
});
