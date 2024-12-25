// import { createResponse } from "@/utils/req";

// export function checkMissingFields(requiredFields:string[], data: object) {
//   const missingFields = requiredFields.filter(field => !data[field]);

//   if (missingFields.length > 0) {
//     return createResponse(
//       `Some field(s) are missing: ${missingFields.join(', ')}`,
//       false,
//       {},
//       400
//     );
//   }

//   return null;
// }