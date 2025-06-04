// src/db/schemas.ts
import {BSON} from 'realm';

export class Category extends Realm.Object<Category> {
  _id!: BSON.ObjectId;
  name!: string;
  icon!: string;
  is_default!: boolean;

  static schema: Realm.ObjectSchema = {
    name: 'Category',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      icon: 'string',
      is_default: {type: 'bool', default: false},
    },
  };
}

export class Transaction extends Realm.Object<Transaction> {
  _id!: BSON.ObjectId;
  category!: Category;
  amount!: number;
  concept?: string;
  date!: Date;
  file?: string;
  type!: 'debito' | 'credito';

  static schema: Realm.ObjectSchema = {
    name: 'Transaction',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      category: 'Category',
      amount: 'double',
      concept: 'string?',
      date: 'date',
      file: 'string?',
      type: 'string', // puedes usar enum-like validación manual
    },
  };
}
