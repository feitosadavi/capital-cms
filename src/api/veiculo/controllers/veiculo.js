'use strict';

/**
 * veiculo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const sanitizePhotos = (photos) => photos.map(({ attributes: { url, alternativeText } }) => ({ src: url, alt: alternativeText }))

const sanitizeData = (data, isMultiple) => {
  if (isMultiple) {
    const vehiclesArray = []
    for (const vehicle of data) {
      const sanitizedVehicle = sanitizeVehicle(vehicle)
      vehiclesArray.push({ ...sanitizedVehicle })
    }
    return vehiclesArray
  }
  const sanitizedVehicle = sanitizeVehicle(data)
  return sanitizedVehicle
}

const sanitizeVehicle = (vehicle) => {
  const sanitizedVehicle = { id: vehicle.id }
  const vehicleAttributes = vehicle.attributes
  for (const key of Object.keys(vehicleAttributes)) {
    sanitizedVehicle[key] = (vehicleAttributes[key]?.data?.attributes?.label || vehicleAttributes[key])
  }
  const sanitizedPhotos = sanitizePhotos(sanitizedVehicle.photos.data)
  return { ...sanitizedVehicle, photos: sanitizedPhotos }
}

module.exports = createCoreController('api::veiculo.veiculo', ({ strapi }) => ({
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
