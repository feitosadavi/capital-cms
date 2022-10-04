'use strict';

/**
 * veiculo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const sanitizePhoto = ({ url, alternativeText }) => ({ src: url, alt: alternativeText })
const sanitizePhotos = (photos) => photos.map(({ attributes }) => sanitizePhoto(attributes))

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
    if (key === 'marca') {
      const { label, photo } = vehicleAttributes[key]?.data?.attributes
      sanitizedVehicle[key] = {
        label: label,
        photo: sanitizePhoto(photo.data.attributes)
      }
    } else {
      sanitizedVehicle[key] = (vehicleAttributes[key]?.data?.attributes?.label || vehicleAttributes[key])
    }
  }

  console.log(sanitizedVehicle.photos.data);
  const sanitizedPhotos = sanitizePhotos(sanitizedVehicle?.photos.data)
  return { ...sanitizedVehicle, photos: sanitizedPhotos }
}

module.exports = createCoreController('api::veiculo.veiculo', ({ strapi }) => ({
  async find (ctx) {
    const { data, meta } = await super.find(ctx)
    try {

      const sanitizedData = sanitizeData(data, true)
      return { meta, data: sanitizedData }
    } catch (error) {
      console.log(error);
      return data
    }
  },

  async findOne (ctx) {
    const { meta, data } = await super.findOne(ctx)
    // const marca = sanitizeField(data)
    const sanitizedData = sanitizeData(data)
    return { meta, data: sanitizedData }
  }

}));
