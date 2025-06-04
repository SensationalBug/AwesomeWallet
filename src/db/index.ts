// src/db/index.ts
import Realm from 'realm';
import {Category, Transaction} from './schemas';

export const realm = new Realm({
  schema: [Category, Transaction],
  schemaVersion: 1,
});

export const inicializarCategorias = () => {
  const existentes = realm.objects('Category');
  if (existentes.length > 0) {return;}

  realm.write(() => {
    realm.create('Category', {
      _id: new Realm.BSON.ObjectId(),
      name: 'Comida',
      icon: 'utensils',
      is_default: true,
    });
    realm.create('Category', {
      _id: new Realm.BSON.ObjectId(),
      name: 'Transporte',
      icon: 'bus',
      is_default: true,
    });
    realm.create('Category', {
      _id: new Realm.BSON.ObjectId(),
      name: 'Salidas',
      icon: 'cocktail',
      is_default: true,
    });
    realm.create('Category', {
      _id: new Realm.BSON.ObjectId(),
      name: 'Renta',
      icon: 'home',
      is_default: true,
    });
    realm.create('Category', {
      _id: new Realm.BSON.ObjectId(),
      name: 'Salario',
      icon: 'money-bill-wave',
      is_default: true,
    });
    realm.create('Category', {
      _id: new Realm.BSON.ObjectId(),
      name: 'Otros',
      icon: 'ellipsis-h',
      is_default: true,
    });
  });
};
