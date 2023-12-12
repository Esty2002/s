const { getValidationsModule } = require("../../services/validations/validations-objects");
const { AppStatusTypes } = require("../../utils/types");

function buildDefaultValues({ item, modelname,modelStatus, appStatus = AppStatusTypes.PRODUCTION }) {
    const module = getValidationsModule(modelname, modelStatus)
    
}

module.exports ={buildDefaultValues}