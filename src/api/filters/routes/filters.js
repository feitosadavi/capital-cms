'use strict';

/**
 * filter router
 */

// const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/filters',
      handler: 'filters.find',
      config: {
        policies: []
      }
    }
  ]
}
