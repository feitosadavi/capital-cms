'use strict';

/**
 * marca controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const sanitizePhoto = ({ url, alternativeText }) => ({ src: url, alt: alternativeText })

const sanitizeData = (data, isMultiple) => {
  if (isMultiple) {
    const fieldsArray = []
    for (const field of data) {
      const sanitizedField = sanitizeField(field)
      fieldsArray.push({ ...sanitizedField })
    }
    return fieldsArray
  }
  const sanitizedField = sanitizeField(data)
  return sanitizedField
}

const sanitizeField = (field) => {
  const data = { id: field.id, ...field.attributes }
  const sanitizedPhotos = sanitizePhoto(data.photo.data.attributes)
  return { ...data, photo: sanitizedPhotos }
}

module.exports = createCoreController('api::marca.marca', ({ strapi }) => ({
  async find (ctx) {
    const { data, meta } = await super.find(ctx)
    const sanitizedData = sanitizeData(data, true)
    return { meta, data: sanitizedData }
  },

  async findOne (ctx) {
    const { meta, data } = await super.findOne(ctx)
    const sanitizedData = sanitizeData(data)
    return { meta, data: sanitizedData }
  }

}));
