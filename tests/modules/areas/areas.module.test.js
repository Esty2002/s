jest.mock('../../../services/axios', () => {
    return {
        postData: jest.fn((url, obj) => {
            console.log(url, obj);
            switch (url) {
                case '/read/distinct':
                    const { field } = obj
                    console.log(field);
                    if (field == "type") {
                        return found = { data: ['city', 'point', 'polygon', 'radius'] };
                    }
                    else {
                        throw new Error("There is no area that has this field");
                    }
                case '/create/insertone':
                    console.log('ppppppppp');
                    if (obj.basicName && obj.name && obj.type && obj.disabled != null && obj.addedDate) {
                        console.log('oooooooooooooook');
                        return result = { data: 'flJGLK56JklOI53jkjjoTRY863LK5K52nk4' };
                    }
                    else {
                        throw new Error("Area wasnt inserted to db");
                    }

                default:
                    throw new Error('the url not correct');
            }
        })
    }
})

const { findByDistinct, checkAndInsert, checkAndUpdate } = require('../../../modules/areas/areas');

describe('check function findByDistinct', () => {
    it('function should return some data if the field exists in that collection', async () => {
        const result = await findByDistinct({
            collection: 'areas', field: 'type', filter: { disabelsd: false }
        });
        expect(result).toBeDefined();
        // expect(result).toBe({ data: ["city", "point", "polygon", "radius"] });
    });


    it('function should return Error if the field does not exist in that collection', async () => {
        let result;
        try {
            result = await findByDistinct({
                collection: 'areas', field: 'firstName', filter: { disabelsd: false }
            });
        }
        catch (error) {
            expect(result).not.toBeDefined();
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(Error);
        }
    });

});

// describe('check function checkAndInsert', () => {
//     it('function should insert a new area to that collection', async () => {
//         const obj = {
//             addedDate: new Date(), disabled: false, name: 'אשדוד שלי', basicName: 'אשדוד',
//             placeId: 'HT213CVf55rts6Iu4WDRFG82l', point: { lat: 34.258941, lng: 34.0220871 }, type: 'city'
//         }
//         const result = await checkAndInsert({
//             collection: "areas",
//             data: obj
//         });
//         expect(result).toBeDefined();
//         // expect(result).toBe({ data: ["city", "point", "polygon", "radius"] });
//     });


    // it('function should return Error if the field does not exist in that collection', async () => {
    //     let result;
    //     try {
    //         result = await findByDistinct({
    //             collection: 'areas', field: 'firstName', filter: { disabelsd: false }
    //         });
    //     }
    //     catch (error) {
    //         expect(result).not.toBeDefined();
    //         expect(error).toBeDefined();
    //         expect(error).toBeInstanceOf(Error);
    //     }
    // });

// });




