// TODO: SUPPORT */*
// See: https://github.com/mother/react-files/issues/27
// eslint-disable-next-line
const mimeTypeRegexp = /^(application|audio|example|image|message|model|multipart|text|video)\/[a-z0-9\.\+\*-]+$/
const extRegexp = /\.[a-zA-Z0-9]*$/

const fileTypeAcceptable = (accepts, file) => {
   if (!accepts) {
      return true
   }

   return accepts.some((accept) => {
      if (file.type && accept.match(mimeTypeRegexp)) {
         const [typeLeft, typeRight] = file.type.split('/')
         const [acceptLeft, acceptRight] = accept.split('/')

         if (acceptLeft && acceptRight) {
            if (acceptLeft === typeLeft && acceptRight === '*') {
               return true
            }

            if (acceptLeft === typeLeft && acceptRight === typeRight) {
               return true
            }
         }
      } else if (file.extension && accept.match(extRegexp)) {
         const ext = accept.substr(1)
         return file.extension.toLowerCase() === ext.toLowerCase()
      }

      return false
   })
}

export default fileTypeAcceptable
