import LocationService from '../LocationService';

describe('LocationService', () => {
  it('Should return latitude and longitude from current position', async () => {
    const postition = await LocationService.getCurrentPosition();
    expect(postition).toEqual({
      latitude: 0,
      longitude: 0,
    });
  });
});
