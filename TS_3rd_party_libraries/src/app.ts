import _ from 'lodash';
import fs from 'node:fs';
import { z } from 'zod';

const numbers = [3, 5, 9, 7];
const dataSchema = z.object({
  "title": z.string(),
  "id": z.number(),
  "values": z.array(z.union([z.string(), z.number()])),
});

_.chunk(numbers, 2);

const content = JSON.parse(fs.readFileSync('data.json').toString());

const parseData = dataSchema.parse(content);


// type Data = {
//   title: string;
//   id: number;
//   values: (string | number)[];
// };

type Data = z.infer<typeof dataSchema>;// infer is zode feature whish = type

function output(data: Data) {
  console.log(data);
}

output(parseData);