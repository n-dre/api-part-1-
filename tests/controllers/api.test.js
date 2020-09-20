/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { describe, it } = require('mocha')
const { catsList, singleCat } = require('../mocks/cats')
const { getCats, getCatById, saveNewCat } = require('../../controllers/cats')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - cats', () => {
  describe('getCats', () => {
    it('retrieves a list of heroes from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.cats, 'findAll').returns(catsList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getCats({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(catsList)
    })
  })

  describe('getCatById', () => {
    it('retrieves the cat associated with the provided origin from the database and calls response.send with it', async () => {
      const request = { params: { origin: 'Scotland' } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }
      const stubbedFindOne = sinon.stub(models.cats, 'findOne').returns(singleCat)

      await getCatById(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { origin: 'Scotland' } })
      expect(stubbedSend).to.have.been.calledWith(singleCat)
    })
  })
  
  describe('saveNewCat', () => {
    it('accepts new cat details and saves them as a new cat, returning the saved record with a 201 status', async () => {
      const request = { body: singleCat }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }
      const stubbedCreate = sinon.stub(models.cats, 'create').returns(singleCat)

      await saveNewCat(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleCat)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(singleCat)
    })
  })
})
