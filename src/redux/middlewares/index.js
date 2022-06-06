import { applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"

// const logger = createLogger()

export default applyMiddleware(thunk, logger)
