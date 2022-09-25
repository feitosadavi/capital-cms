
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
        { key: 'modelo', label: 'Modelos', query: modeloQuery },
        { key: 'marca', label: 'Marca' },
        { key: 'ano', label: 'Anos' },
        { key: 'combustivel', label: 'Combustivel' },
        { key: 'categoria', label: 'Categoria' },
        { key: 'cor', label: 'Cor' }
      ]

      for (const element of elements) {
        const options = await findMany(element.key, element.query)

        delete element['query'] // client will not consume query field

        filterOptions.push({ ...element, options })
      }

      return filterOptions
    } catch (err) {
      return err;
    }
  },
};
