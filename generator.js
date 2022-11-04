import * as fs from 'fs'
import { faker } from '@faker-js/faker'
import { uuid } from 'uuidv4'

const generateCsv = (rows) => {
  const data = []
  for (let i = 0; i < rows; i++) {
    data.push({
      id: uuid(),
      text: faker.lorem.sentence(10),
      price: faker.datatype.number({ min: 10000, max: 99999 }).toString(),
    })
  }

  const csvString = [
    ['id', 'text', 'price'],
    ...data.map((contract) => [contract.id, contract.text, contract.price]),
  ]
    .map((e) => e.join(','))
    .join('\n')

  fs.writeFile('./output/mockContract.csv', csvString, 'utf8', (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('csv saved')
    }
  })
}

generateCsv(process.argv[2])
