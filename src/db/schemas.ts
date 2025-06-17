// src/db/schemas.ts
import Realm, {BSON} from 'realm';

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
  category!: string;
  amount?: number;
  concept?: string;
  cDate!: string;
  file?: string;
  type!: 'debito' | 'credito';

  static schema: Realm.ObjectSchema = {
    name: 'Transaction',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      category: 'string',
      amount: 'double',
      concept: 'string?',
      cDate: 'string',
      file: 'string?',
      type: 'string',
    },
  };
}
