class DataSchmea {
    constructor() {}

    companies() {
        return {
            name: 'companies',
            fields: [
                {'name': 'id', 'type': 'string' },
                {'name': 'CIN', 'type': 'string' },
                {'name': 'Name', 'type': 'string' },
            ]
        }
    }

    currencyList() {
        return {
            name: 'currencyList',
            fields: [
                {'name': 'id', 'type': 'string' },
                {'name': 'Code', 'type': 'string' },
                {'name': 'Currency', 'type': 'string' }
            ]
        }
    }

    directors() {
        return {
            name: 'directors',
            fields: [
                {'name': 'id', 'type': 'string' },
                {'name': 'DIN', 'type': 'string' },
                {'name': 'director', 'type': 'string' }
            ]
        }
    }

    IFSC() {
        return {
            name: 'IFSC',
            fields: [
                {'name': 'id', 'type': 'string' },
                {'name': 'IFSC', 'type': 'string' },
                {'name': 'Branch', 'type': 'string' }
            ]
        }
    }

    importExport() {
        return {
            name: 'importExport',
            fields: [
                {'name': 'id', 'type': 'string' },
                {'name': 'HSN', 'type': 'string' },
                {'name': 'Description', 'type': 'string' }
            ]
        }
    }

    pincode() {
        return {
            name: 'pincode',
            fields: [
                {'name': 'id', 'type': 'string' },
                {'name': 'pincode', 'type': 'string' },
                {'name': 'circleName', 'type': 'string' },
                {'name': 'regionName', 'type': 'string' },
                {'name': 'divisionName', 'type': 'string' },
                {'name': 'officeName', 'type': 'string' },
                {'name': 'district', 'type': 'string' },
                {'name': 'stateName', 'type': 'string' }
            ]
        }
    }

    stockMarket() {
        return {
            name: 'stockMarket',
            fields: [
                {'name': 'id', 'type': 'string' },
                {'name': 'code', 'type': 'string' },
                {'name': 'company', 'type': 'string' }
            ]
        }
    }

    trademarkData() {
        return {
            name: 'trademarkData',
            fields: [
                {'name': 'id', 'type': 'string' },
                {'name': 'ApplicantId', 'type': 'string' },
                {'name': 'Name', 'type': 'string' },
                {'name': 'ApplicantName', 'type': 'string' }
            ]
        }
    }
    
    banks() {
        return {
            name: 'banks',
            fields: [
                {'name': 'id', 'type': 'string' },
                {'name': 'name', 'type': 'string' }
            ]
        }
    }

    mutualFund() {
        return {
            name: 'mutualFund',
            fields: [
                {'name': 'id', 'type': 'string' },
                {'name': 'Name', 'type': 'string' },
                {'name': 'FundHouse', 'type': 'string' }
            ]
        }
    }
}

module.exports = new DataSchmea()