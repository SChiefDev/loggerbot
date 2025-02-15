const cluster = require('cluster')

module.exports = {
    name: 'shardResume',
    type: 'on',
    handle: async (shardID) => {
      global.logger.info(`[${cluster.worker.rangeForShard}] Shard ${shardID} has resumed`)
      // global.webhook.warn(`[${cluster.worker.rangeForShard}] Shard ${shardID} has resumed\n\nResume -> ${cachedShard.resumeURL}\nStatus -> ${cachedShard.status}\nReconnecting? -> ${cachedShard.connecting ? 'yes' : 'no'}\nLast heartbeat sent: <t:${Math.ceil(cachedShard.lastHeartbeatSent / 1000)}>\nLast heartbeat received: <t:${Math.ceil(cachedShard.lastHeartbeatReceived / 1000)}>`)
    }
  }