import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import SpotifyWrapper from '../src/index'
import { API_URL } from '../src/config'

chai.use(sinonChai)

global.fetch = require('node-fetch')

describe('SpotifyWrapper Library', () => {
  it('should create an instance of SpotifyWrapper', () => {
    const spotify = new SpotifyWrapper({})
    expect(spotify).to.be.an.instanceOf(SpotifyWrapper)
  })

  it('should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'blabla'
    })

    expect(spotify.apiURL).to.be.equal('blabla')
  })

  it('should use the default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper({})
    expect(spotify.apiURL).to.be.equal(API_URL)
  })

  it('should receive token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo'
    })

    expect(spotify.token).to.be.equal('foo')
  })

  describe('request method', () => {
    let fetchedStub

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch')
      fetchedStub.resolves({ json: () => ({ album: 'name' }) })
    })

    afterEach(() => {
      fetchedStub.restore()
    })

    it('should have request method', () => {
      const spotify = new SpotifyWrapper({})
      expect(spotify.request).to.exist
    })

    it('should call fetch when request', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo'
      })

      spotify.request('url')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the right url passed', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo'
      })

      spotify.request('url')
      expect(fetchedStub).to.have.been.calledWith('url')
    })

    it('should call fetch with the right headers passed', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo'
      })

      const headers = {
        headers: {
          Authorization: 'Bearer foo'
        }
      }

      spotify.request('url')
      expect(fetchedStub).to.have.been.calledWith('url', headers)
    })
  })
})
