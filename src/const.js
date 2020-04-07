
const uriBase = process.env.NODE_ENV !== 'production' ? (
    "http://localhost:3001"
) : (
    "https://spencernelson.herokuapp.com"
)

const eventsApi = "/scheduler/api/v1/events"

module.exports.uriBase = uriBase
module.exports.eventsApi = eventsApi
