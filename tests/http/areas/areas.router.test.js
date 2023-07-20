const request = require('supertest')
const { app } = require('../../../app');

jest.mock('../../../modules/areas/areas', () => {
    let alreadyExsistName = 'yerushalaim is not for sale'
    let objectIdFromDB = '156fse78GBl54klS58TZXSy45bdf85'

    return {
        insertArea: jest.fn((obj) => {
            console.log({ obj });
            if (obj.basicName && obj.name && obj.type && obj.disabled != null && obj.addedDate) {
                // if (obj.name != alreadyExsistName) {
                if (obj.type == 'radius' && obj.placeId && obj.point && obj.radius) {
                    return { status: 201, data: "new area was inserted" }
                }
                if ((obj.type == 'city' || obj.type == 'point') && obj.placeId && obj.point) {
                    return { status: 201, data: "new area was inserted" }
                }
                if (obj.type == 'polygon' && obj.placesId && obj.points) {
                    if (obj.placesId.length == obj.points.length)
                        return { status: 201, data: "new area was inserted" }
                }
                // }    
                // else {
                //     throw new Error('This name has already been declared')
                // }   
                else {
                    return { status: 500, data: "One or more required properties do not exist" }
                }
            }
            // return { status: 500, data: "One or more required properties do not exist" }
            throw new Error("One or more required properties do not exist")

        }),

        updateArea: jest.fn((obj) => {
            if (obj._id && obj.basicName && obj.name && obj.type && obj.disabled != null && obj.addedDate) {
                if (obj.type == 'radius' && obj.placeId && obj.point && obj.radius) {

                    return { status: 204, data: "area was updated" }
                }
                if ((obj.type == 'city' || obj.type == 'point') && obj.placeId && obj.point) {
                    return { status: 204, data: "area was updated" }
                }
                if (obj.type == 'polygon' && obj.placesId && obj.points) {
                    {

                        if (obj.placesId.length == obj.points.length)
                            return { status: 204, data: "area was updated" }
                    }

                }
                // }
                // else {
                //     throw new Error("Area to update was not found");
                // }
                else {
                    return { status: 500, data: "One or more required properties do not exist" }
                }
            }
            throw new Error("One or more required properties do not exist")

        }),

    }
});


describe('Check request /areas/inserArea', () => {
    it('Should insert a new city/point if all the properties where sent', async () => {
        const response = await request(app).post('/areas/insertArea').send({
            addedDate: new Date(), disabled: false, name: 'אשדוד שלי', basicName: 'אשדוד',
            placeId: 'HT213CVf55rts6Iu4WDRFG82l', point: { lat: 34.258941, lng: 34.0220871 }, type: 'city'
        });
        const { insertArea } = jest.requireMock('../../../modules/areas/areas');
        expect(insertArea).toHaveBeenCalled()
        expect(response).toBeDefined();
        expect(response.status).toBe(201);
        expect(response.serverError).toBeFalsy();
    });

    it('Should insert a new pointAndRadius if all the properties where sent', async () => {
        const response = await request(app).post('/areas/insertArea').send({
            addedDate: new Date(), disabled: false, name: 'אשדוד שלי', basicName: 'אשדוד',
            placeId: 'HT213CVf55rts6Iu4WDRFG82l', point: { lat: 34.258941, lng: 34.0220871 }, radius: 57000, type: 'radius'
        });
        const { insertArea } = jest.requireMock('../../../modules/areas/areas');
        expect(insertArea).toHaveBeenCalled()
        expect(response).toBeDefined();
        expect(response.status).toBe(201);
        expect(response.serverError).toBeFalsy();
    });

    it('Should insert a new polygon if all the properties where sent', async () => {
        const response = await request(app).post('/areas/insertArea').send({
            addedDate: new Date(), disabled: false, name: 'אשדוד שלי', basicName: 'אשדוד',
            placesId: ['HT213CVf55rts6Iu4WDRFG82l', 'HT213CVf55rts6Iu4WDRFG82l', 'HT213CVf55rts6Iu4WDRFG82l', 'HT213CVf55rts6Iu4WDRFG82l'], points: [{ lat: 34.258941, lng: 34.0220871 }, { lat: 34.258941, lng: 34.0220871 }, { lat: 34.258941, lng: 34.0220871 }, { lat: 34.258941, lng: 34.0220871 }], type: 'polygon'
        });
        const { insertArea } = jest.requireMock('../../../modules/areas/areas');
        expect(insertArea).toHaveBeenCalled()
        expect(response).toBeDefined();
        expect(response.status).toBe(201);
        expect(response.serverError).toBeFalsy();
    });

    // it('shouldnt insert new area if this name already exists in the db', async () => {
    //     const response = await request(app).post('/areas/insertArea').send({
    //         addedDate: new Date(), disabled: false, name: 'yerushalaim is not for sale', basicName: 'ירושלים',
    //         placeId: 'HT213CVf55rts6Iu4WDRFG82l', point: { lat: 34.258941, lng: 34.0220871 }, type: 'city'
    //     });
    //     expect(response).toBeDefined();
    //     expect(response.status).toBe(500);
    //     expect(response.text).toBe(`This name has already been declared`);
    //     expect(response.serverError).toBeTruthy();
    // });

    it('should return status 500 if one of the properties wasnt sent', async () => {
        const response = await request(app).post('/areas/insertArea').send({
            addedDate: new Date(), disabled: false, name: 'we want mashiach now', basicName: 'ירושלים',
            placeId: 'HT213CVf55rts6Iu4WDRFG82l', type: 'city'
        });
        expect(response).toBeDefined();
        expect(response.status).toBe(500);
        expect(response.serverError).toBeTruthy();
        expect(response.text).toBe('One or more required properties do not exist')
    });

    it('should return status 500 if one of the properties wasnt sent', async () => {
        const response = await request(app).post('/areas/insertArea').send({
            disabled: false, name: 'we want mashiach now', basicName: 'ירושלים',
            placeId: 'HT213CVf55rts6Iu4WDRFG82l', type: 'city'
        });
        expect(response).toBeDefined();
        expect(response.status).toBe(500);
        expect(response.serverError).toBeTruthy();
        expect(response.text).toBe('One or more required properties do not exist')
    });
});



describe('Check request /areas/updateArea', () => {
    it('Should update a city/point if all the properties where sent and _Id was found', async () => {
        // if (obj._id && obj.basicName && obj.name && obj.type && obj.disabled != null && obj.addedDate) {

        const response = await request(app).post('/areas/updateArea').send({
            _id: '156fse78GBl54klS58TZXSy45bdf85',
            addedDate: new Date(), disabled: false, name: 'אשדוד שלי', basicName: 'אשדוד',
            placeId: 'HT213CVf55rts6Iu4WDRFG82l', point: { lat: 34.258941, lng: 34.0220871 }, type: 'city'
        });
        const { updateArea } = jest.requireMock('../../../modules/areas/areas');
        expect(updateArea).toHaveBeenCalled()
        expect(response).toBeDefined();
        expect(response.status).toBe(204);
        expect(response.serverError).toBeFalsy();
    });

    it('Should update a pointAndRadius if all the properties where sent and _Id was found', async () => {
        const response = await request(app).post('/areas/updateArea').send({
            _id: '156fse78GBl54klS58TZXSy45bdf85',
            addedDate: new Date(), disabled: false, name: 'אשדוד שלי', basicName: 'אשדוד',
            placeId: 'HT213CVf55rts6Iu4WDRFG82l', point: { lat: 34.258941, lng: 34.0220871 }, radius: 57000, type: 'radius'
        });
        const { updateArea } = jest.requireMock('../../../modules/areas/areas');
        expect(updateArea).toHaveBeenCalled()
        expect(response).toBeDefined();
        expect(response.status).toBe(204);
        expect(response.serverError).toBeFalsy();
    });

    it('Should update a polygon if all the properties where sent and _Id was found', async () => {
        const response = await request(app).post('/areas/updateArea').send({
            _id: '156fse78GBl54klS58TZXSy45bdf85',
            addedDate: new Date(), disabled: false, name: 'אשדוד שלי', basicName: 'אשדוד',
            placesId: ['HT213CVf55rts6Iu4WDRFG82l', 'HT213CVf55rts6Iu4WDRFG82l', 'HT213CVf55rts6Iu4WDRFG82l', 'HT213CVf55rts6Iu4WDRFG82l'], points: [{ lat: 34.258941, lng: 34.0220871 }, { lat: 34.258941, lng: 34.0220871 }, { lat: 34.258941, lng: 34.0220871 }, { lat: 34.258941, lng: 34.0220871 }], type: 'polygon'
        });
        const { updateArea } = jest.requireMock('../../../modules/areas/areas');
        expect(updateArea).toHaveBeenCalled()
        expect(response).toBeDefined();
        expect(response.status).toBe(204);
        expect(response.serverError).toBeFalsy();
    });

    // it('shouldnt update area if the _Id wasnt found', async () => {
    //     const response = await request(app).post('/areas/updateArea').send({
    //         _id: '156fse78GBl54klS58TZXSy45bdf7p',
    //         addedDate: new Date(), disabled: false, name: 'אשדוד שלי', basicName: 'אשדוד',
    //         placesId: ['HT213CVf55rts6Iu4WDRFG82l', 'HT213CVf55rts6Iu4WDRFG82l', 'HT213CVf55rts6Iu4WDRFG82l', 'HT213CVf55rts6Iu4WDRFG82l'], points: [{ lat: 34.258941, lng: 34.0220871 }, { lat: 34.258941, lng: 34.0220871 }, { lat: 34.258941, lng: 34.0220871 }, { lat: 34.258941, lng: 34.0220871 }], type: 'city'
    //     });
    //     expect(response).toBeDefined();
    //     expect(response.status).toBe(500);
    //     expect(response.text).toBe(`This name has already been declared`);
    //     expect(response.serverError).toBeTruthy();
    // });

    it('should return status 500 if one of the properties wasnt sent', async () => {
        const response = await request(app).post('/areas/updateArea').send({
            _id: '156fse78GBl54klS58TZXSy45bdf85',
            addedDate: new Date(), disabled: false, name: 'we want mashiach now', basicName: 'ירושלים',
            placeId: 'HT213CVf55rts6Iu4WDRFG82l', type: 'city'
        });
        expect(response).toBeDefined();
        expect(response.status).toBe(500);
        expect(response.serverError).toBeTruthy();
        expect(response.text).toBe("One or more required properties do not exist")
    });

    it('should return status 500 if one of the properties wasnt sent', async () => {
        const response = await request(app).post('/areas/updateArea').send({
            disabled: false, name: 'we want mashiach now', basicName: 'ירושלים',
            placeId: 'HT213CVf55rts6Iu4WDRFG82l', type: 'city'
        });
        expect(response).toBeDefined();
        expect(response.status).toBe(500);
        expect(response.serverError).toBeTruthy();
        expect(response.text).toBe('One or more required properties do not exist')
    });
});