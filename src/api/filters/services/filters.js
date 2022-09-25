
'use strict';

/**
 * filters service.
 */


const findMany = async (api, query) => {
  return await strapi.db.query(`api::${api}.${api}`).findMany(
    { fields: ["label"], ...query }
  );
}

module.exports = {

  filters: async (marca) => {
    try {
      const filterOptions = []

      const modeloQuery = {
        where: {
          marca: {
            label: {
              $eq: marca
            }
          }
        }
      }

      const elements = [
        { key: 'marca', label: 'Marca' },
        { key: 'modelo', label: 'Modelos', query: modeloQuery },
        { key: 'ano', label: 'Anos' },
        { key: 'combustivel', label: 'Combustivel' },
        { key: 'categoria', label: 'Categoria' },
        { key: 'cor', label: 'Cor' }
      ]

      const getOptionsLabel = (options) => options.map(options => options.label)

      for (const element of elements) {
        const options = await findMany(element.key, element.query)

        const sanitizedOptions = getOptionsLabel(options)

        delete element['query'] // client will not consume query field

        filterOptions.push({ ...element, options: sanitizedOptions })
      }

      return filterOptions
    } catch (err) {
      return err;
    }
  },
};
