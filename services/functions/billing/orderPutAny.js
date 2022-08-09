import * as uuid from "uuid";
import dynamodb from "../../util/dynamodb";
import handler from "../../util/handler";

export const orderPutAny = handler(async ({ emailId, orderIdValue }) => {
  console.log("BILLING");

  const params = {
    TableName: "airbornharsh-notes-Detail",
    Item: {
      emailId: emailId,
      orderId: uuid.v1(),
      orderIdValue: orderIdValue,
      createdAt: Date.now(),
    },
  };

  await dynamodb.put(params);
});
