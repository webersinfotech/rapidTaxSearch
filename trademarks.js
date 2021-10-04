const schemaStructure = require('./schema')
const typesense = require('./typesense');
const database = require('./databse')
const fs = require('fs')
const jsonl = require("jsonl")
const readline = require('readline')
const axios = require('axios');

const schemas = [
    // {
    //     table: 'companies',
    //     columns: ['id', 'CIN', 'Name'],
    //     splitted: true
    // }, 
    // {
    //     table: 'currencyList',
    //     columns: ['id', 'Code', 'Currency']
    // }, 
    // {
    //     table: 'directors',
    //     columns: ['id', 'DIN', 'director'],
    //     splitted: true
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
    {
        table: 'trademarkData',
        columns: ['id', 'ApplicantId', 'Name', 'ApplicantName'],
        splitted: true
    },  
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
    //     if (!fs.existsSync(`./splittedDir/jsonl/${schema.table}`)) fs.mkdirSync(`./splittedDir/jsonl/${schema.table}`)

    //     const files = fs.readdirSync(`./splittedDir/${schema.table}`)

    //     for (let file of files) {
    //         fs.createReadStream(`./splittedDir/${schema.table}/${file}`)
    //         .pipe(jsonl())
    //         .pipe(fs.createWriteStream(`./splittedDir/jsonl/${schema.table}/${file}`))
    //     }
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

    // for (let schema of schemas) {
    //     try {
    //         if (schema.splitted) {
    //             const files = fs.readdirSync(`./splittedDir/${schema.table}`)
    //             for (let file of files) {
    //                 let rows = fs.readFileSync(`./splittedDir/${schema.table}/${file}`, 'utf-8')
    //                 rows = JSON.parse(rows)
    //                 for (let [index, row] of rows.entries()) {
    //                     try {
    //                         const resp = await typesense.createDoc(schema.table, row)
    //                         console.log(`${schema.table} ::: ${file} ::: ${index} ::: `, resp)
    //                     } catch (err) {
    //                         console.log(`${schema.table} ::: ${file} ::: ${index} ::: `, err)
    //                     }
    //                 }
    //                 fs.unlinkSync(`./splittedDir/${schema.table}/${file}`)
    //             }
    //         } else {
    //             let rows = fs.readdirSync(`./schemas/${schema.table}.json`)
    //             rows = JSON.parse(rows)
    //             for (let [index, row] of rows.entries()) {
    //                 try {
    //                     const resp = await typesense.createDoc(schema.table, row)
    //                     console.log(`${schema.table} ::: ${index} ::: `, resp)
    //                 } catch (err) {
    //                     console.log(`${schema.table} ::: ${index} ::: `, err)
    //                 }
    //             }
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // for (let schema of schemas) {
    //     if (!fs.existsSync(`./splittedDir/${schema.table}`)) fs.mkdirSync(`./splittedDir/${schema.table}`)

    //     const data = require(`./schemas/${schema.table}.json`)

    //     const makeChunk = (a,n)=>[...Array(Math.ceil(a.length/n))].map((_,i)=>a.slice(n*i,n+n*i));

    //     const chunks = makeChunk(data, 1000)

    //     for (let [index, chunk] of chunks.entries()) {
    //         console.log(`${schema.table} ::: ${index}`)
    //         fs.writeFileSync(`./splittedDir/${schema.table}/${index}.json`, JSON.stringify(chunk), 'utf-8')
    //     }
    // }

    for (let schema of schemas) {
        try {
            if (schema.splitted) {
                const files = fs.readdirSync(`./splittedDir/${schema.table}`)
                for (let file of files) {
                    try {
                        console.log(`Reading ::: ${file}`)
                        const rows = fs.readFileSync(`./splittedDir/${schema.table}/${file}`, 'utf-8')
                        const resp = await typesense.importDocs(schema.table, JSON.parse(rows))
                        fs.unlinkSync(`./splittedDir/${schema.table}/${file}`)
                        console.log(resp)
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    // process.exit()
})()