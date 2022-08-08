import dynamodb from "../../util/dynamodb";
import handler from "../../util/handler";

export const orderPut = handler(async ({ emailId, orderIdValue }) => {
  console.log("BILLING");

  const params = {
    TableName: "airbornharsh-notes-Detail",
    Item: {
      emailId: emailId,
      orderId: "razorpay_order_id_value_notes",
      orderIdValue: orderIdValue,
    },
  };

  await dynamodb.put(params);
});
