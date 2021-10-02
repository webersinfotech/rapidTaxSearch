const Typesense = require('typesense')
const fs = require('fs')
const readline = require('readline')

class TypesenseClass {
    constructor() {
        this.client = new Typesense.Client({
            'nodes': [{
              'host': 'localhost', // For Typesense Cloud use xxx.a1.typesense.net 13.232.88.51
              'port': '8108',      // For Typesense Cloud use 443
              'protocol': 'http'   // For Typesense Cloud use https
            }],
            'apiKey': 'v#byUX$DYff&',
            'connectionTimeoutSeconds': 2
        })
    }

    async createCollection(schema) {
        return this.client.collections().create(schema)
    }

    async createDoc(schema, doc) {
        return this.client.collections(schema).documents().upsert(doc)
    }

    async dropCollection(schema) {
        return this.client.collections(schema).delete()
    }

    async importFile(schema, path) {
        // const file = readline.createInterface({
        //     input: fs.createReadStream(path),
        //     output: process.stdout,
        //     terminal: false
        // });

        // file.on('line', async (line) => {
        //     const resp = await this.createDoc(schema, JSON.parse(line))
        //     console.log(JSON.parse(resp));
        // });

        const documentsInJsonl = await fs.readFileSync(path, 'utf-8');
        return this.client.collections(schema).documents().import(documentsInJsonl, {action: 'upsert'})
    }
}

module.exports = new TypesenseClass()