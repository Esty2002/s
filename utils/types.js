const ErrorTypes = {
    VALIDATION: 'validation'
}

const ValueTypes = {
    STRING: 'string',
    NUMBER: 'number',
    DATE: 'date',
    BIT: 'bit'
}

const AppStatusTypes = {
    PRODUCTION: 'production',
    DEVELOP: 'develop'
}

const ModelStatusTypes = {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    ADD:'add'
}

module.exports = { ErrorTypes, ValueTypes, AppStatusTypes, ModelStatusTypes }