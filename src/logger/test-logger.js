const logger = require('./logger')

logger().info('text info', { meta: 1 })
logger().warn('text warn')
logger().error('text error')