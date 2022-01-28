'use strict'

const autocannon = require('autocannon')

// async/await
async function testTransactionGet () {
  const result = await autocannon({
    title: "GET Transaction by PublicID ",
    url: 'localhost:3000/api/transactions/4e6c433a-171b-4df7-bdc4-c821c0fbbdb3',
    connections: 2, //default
    pipelining: 1, // default
    duration: 2 // default
  })
  console.log(result.latency);
}

testTransactionGet();