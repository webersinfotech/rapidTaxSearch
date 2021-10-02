const schemaStructure = require('./schema')
const typesense = require('./typesense');
const database = require('./databse')
const fs = require('fs')
const jsonl = require("jsonl")
const readline = require('readline')

const schemas = [
    {
        table: 'companies',
        columns: ['id', 'CIN', 'Name']
    }, 
    // {
    //     table: 'currencyList',
    //     columns: ['id', 'Code', 'Currency']
    // }, 
    // {
    //     table: 'directors',
    //     columns: ['id', 'DIN', 'director']
    // }, 
    // {
    //     table: 'IFSC',
    //     columns: ['id', 'IFSC', 'Branch']
    // }, 
    // {
    //     table: 'importExport',
    //     columns: ['id', 'HSN', 'Description']
    // }, 
    // {
    //     table: 'pincode',
    //     columns: ['id', 'pincode', 'circleName', 'regionName', 'divisionName', 'officeName', 'district', 'stateName']
    // }, 
    // {
    //     table: 'stockMarket',
    //     columns: ['id', 'code', 'company']
    // }, 
    // {
    //     table: 'trademarkData',
    //     columns: ['id', 'ApplicantId', 'Name', 'ApplicantName']
    // },  
    // {
    //     table: 'banks',
    //     columns: ['id', 'name']
    // }, 
    // {
    //     table: 'mutualFund',
    //     columns: ['id', 'Name', 'FundHouse']
    // }
];

(async () => {
    // for (let schema of schemas) {
    //     const rows = await database.getRows({
    //         where: {},
    //         columns: schema.columns,
    //         table: schema.table
    //     })
    //     for (let [index, row] of rows.entries()) {
    //         for (let key of Object.keys(row)) {
    //             rows[index][key] = rows[index][key] ? `${rows[index][key]}` : ''
    //         }
    //     }
    //     fs.writeFileSync(`./schemas/${schema.table}.json`, JSON.stringify(rows), 'UTF-8')
    //     console.log(`File is written ./schemas/${schema.table}.json`)
    // }

    // for (let schema of schemas) {
    //     fs.createReadStream(`schemas/${schema.table}.json`)
    //     .pipe(jsonl())
    //     .pipe(fs.createWriteStream(`jsonlSchemas/${schema.table}.jsonl`))
    // }

    // for (let schema of schemas) {
    //     const resp = await typesense.dropCollection(schema.table)
    //     console.log(resp)
    // }

    // for (let schema of schemas) {
    //     try {
    //         const structure = schemaStructure[schema.table]()
    //         const resp = await typesense.createCollection(structure)
    //         console.log(resp)
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    for (let schema of schemas) {
        try {
            const rows = []

            const file = readline.createInterface({
                input: fs.createReadStream(`./jsonlSchemas/${schema.table}.jsonl`),
                output: process.stdout,
                terminal: false
            });

            file.on('line', async (line) => {
                console.log(line)
                rows.push(JSON.parse(line))
            });
            
            file.on('close', async () => {
                for (let [index, row] of rows.entries()) {
                    const resp = await typesense.createDoc(schema.table, JSON.parse(row))
                    console.log(`${schema.table} ::: ${index} ::: `, resp)
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    // process.exit()
})()