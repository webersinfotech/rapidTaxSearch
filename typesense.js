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

    async importDocs(schema, docs) {
        return this.client.collections(schema).documents().import(docs, {action: 'upsert'})
    }
}

module.exports = new TypesenseClass()