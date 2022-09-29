'use strict';

/**
 * vender router
 */

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/vender',
      handler: 'vender.enviarEmail',
      config: {
        policies: []
      }
    }
  ]
}
