import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album'
import API_URL from '../src/config'

chai.use(sinonChai)

global.fetch = require('node-fetch')

describe('Album', () => {

  let fetchedStub

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch')
    fetchedStub.resolves({ json: () => ({ album: 'name' }) })
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist
    })

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist
    })

    describe('getAlbum', () => {
      it('should call fetch method', () => {
        const albums = getAlbum()
        expect(fetchedStub).to.have.been.calledOnce
      })

      it('should call fetch with the correct URL', () => {
        const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy')
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy`)

        const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTk')
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTk`)
      })

      it('should return the correct data from Promise', () => {
        const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy')
        album.then(data => {
          expect(data).to.be.eql({ album: 'name' }) // Entender pq o teste fica verde mesmo com um erro de assertion
        })
      })
    })

    describe('getAlbums', () => {
      it('should call fetch method', () => {
        const albums = getAlbums()
        expect(fetchedStub).to.have.been.calledOnce
      })

      it('should call fetch with the correct URL', () => {
        const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk'])
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk`)
      })

      it('should return the correct data from Promise', () => {
        const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk'])
        .then(data => {
          expect(data).to.be.eql({ album: 'name' })
        })
      })
    })

    describe('getAlbumTracks', () => {
      it('should call fetch method', () => {
        const tracks = getAlbumTracks()
        expect(fetchedStub).to.have.been.calledOnce
      })

      it('should call fetch with the correct URL', () => {
        const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy')
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks`)
      })

      it('should return the correct data from Promise', () => {
        const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy')
        .then(data => {
          expect(data).to.be.eql({ album: 'name' })
        })
      })
    })
  })
})
