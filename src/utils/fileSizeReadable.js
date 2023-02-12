/* eslint-disable prefer-template */
const fileSizeReadable = (size) => {
   if (size >= 1000000000) {
      return Math.ceil(size / 1000000000) + 'GB'
   }

   if (size >= 1000000) {
      return Math.ceil(size / 1000000) + 'MB'
   }

   if (size >= 1000) {
      return Math.ceil(size / 1000) + 'KB'
   }

   return Math.ceil(size) + 'B'
}
/* eslint-enable prefer-template */

export default fileSizeReadable
