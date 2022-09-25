'use strict';

/**
 * filters controller
 */

module.exports = {
  async find (ctx) {
    const { query, params } = ctx
    console.log({ query, params });

    const data = await strapi
      .service("api::filters.filters")
      .filters(ctx.query.marca);


    // const { data, meta } = await super.find(ctx)

    // const sanitizedData = sanitizeData(data, true)

    return data
  },
};
