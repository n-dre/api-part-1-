const models = require('../models')

const getCats = async (request, response) => {
  try {
    const catList = await models.Cats.findAll({ include: [{ model: models.Breeds }] })

    return response.send(CatList)
  } catch (error) {
    return response.status(500).send('Unknown error while retrieving cats')
  }
}

const getCatById = async (request, response) => {
  try {
    const id = parseInt(request.params.id)

    const cat = await models.Cats.findOne({
      where: { id },
      include: [{ model: models.origin }],
    })

    return cat
      ? response.send(cat)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unknown error while retrieving cats')
  }
}

const saveNewCat = async (request, response) => {
  try {
    const { name, breeds, origin } = request.body

    if (!name || !breeds || !origin) {
      return response.status(400).send('The following attributes are required: name, breeds, origin')
    }

    const newCat = await models.Cats.create({ name, breeds, origin })

    return response.status(201).send(newCat)
  } catch (error) {
    return response.status(500).send('Unknown error while creating new cat')
  }
}

const deleteCat = async (request, response) => {
  try {
    const id = parseInt(request.params.id)
    const cat = await models.Cats.findOne({ where: { id } })

    if (!cat) return response.status(404).send(`Unknown cat with ID: ${id}`)

    if (cat.protected) return response.status(409).send('Cannot delete protected cats')

    await models.Cats.destroy({ where: { id } })

    return response.send(`Successfully deleted the cat with ID: ${id}`)
  } catch (error) {
    return response.status(500).send('Unknown error while deleting cat')
  }
}

module.exports = {
  getCats,
  getCatById,
  saveNewCat,
  deleteCat,
}