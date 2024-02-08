const {combineOptions, 
buildBasicCementCombinations} = require('../../../modules/products/basicProducts')

describe('COMBINE OPTIONS', ()=>{
    it('should return an array with all options', ()=>{
        let list1 = [1,2,3,4]
        let list2 = [4,5,6,7]
        const response = combineOptions([list1, list2])
        expect(response).toBeInstanceOf(Array)
        expect(response.length).toBe(list1.length*list2.length)
    })

    it('should return an array with all options with more than two lists', ()=>{
        let list1 = [1,2,3,4]
        let list2 = [4,5,6,7]
        let list3 = [8,9]
        const response = combineOptions([list1, list2, list3])
        expect(response).toBeInstanceOf(Array)
        expect(response.length).toBe(list1.length*list2.length*list3.length)
    })
})

describe('BUILD BASIC CEMENT COMBINATIONS', ()=>{
    it('should buildgood combinations', ()=>{
        let list = [{
            "grainDescribe": "משאבה",
            "grainNumber": 2
        }, {
            "grainDescribe": "פוליה",
            "grainNumber": 1
        },
        {
            "degreeDescribe": "ח3",
            "degreeNumber": 3
        }, {
            "degreeDescribe": "ח2",
            "degreeNumber": 2
        }, {
            "degreeDescribe": "ח1",
            "degreeNumber": 1
        }, 
        {
            "grainDescribe": "עדש",
            "grainNumber": 3
        },{
            "grainDescribe": "ללפ",
            "grainNumber": 4
        },{
            "somechDescribe": "ש4",
            "somechNumber": 4
        }, {
            "somechDescribe": "ש5",
            "somechNumber": 5
        },{
            "somechDescribe": "ש6",
            "somechNumber": 6
        },{
            "strengthDescribe": "ב15",
            "strengthNumber": 1
        },{
            "strengthDescribe": "ב20",
            "strengthNumber": 2
        }, {
            "strengthDescribe": "ב30",
            "strengthNumber": 3
        }]

        const response = buildBasicCementCombinations(list)
        console.log(response[0])
        expect(response).toBeInstanceOf(Array)
    })
})