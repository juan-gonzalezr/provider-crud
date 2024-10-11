// scripts/seedUsers.ts

import mongoose from 'mongoose';
import User from '../models/Provider'; // Asegúrate de que la ruta sea correcta
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const seedUsers = async () => {
  try {
    // Conectar a MongoDB usando la variable de entorno
    const MONGODB_URI = process.env.MONGO_URI; // Asegúrate de que la variable esté definida
    if (!MONGODB_URI) {
      throw new Error("La variable de entorno MONGO_URI no está definida.");
    }

    await mongoose.connect(MONGODB_URI);

    // Datos de ejemplo para insertar
    const users = [
      {
        nit: "123456789",
        firstName: "John",
        lastName: "Doe",
        idNumber: "987654321",
        providerType: "National",
        personType: "Natural",
        beneficiaries: [
          {
            name: "Jane Smith",
            idNumber: "123123123"
          }
        ],
        bankDetails: {
          bank: "Bank XYZ",
          accountNumber: "000111222",
          accountType: "Savings"
        }
      },
      {
        nit: "987654321",
        firstName: "Alice",
        lastName: "Johnson",
        idNumber: "123456789",
        providerType: "International",
        personType: "Natural",
        beneficiaries: [
          {
            name: "Tom Johnson",
            idNumber: "321321321"
          }
        ],
        bankDetails: {
          bank: "Global Bank",
          accountNumber: "111222333",
          accountType: "Checking"
        }
      },
      {
        nit: "456789123",
        firstName: "Michael",
        lastName: "Brown",
        idNumber: "654987321",
        providerType: "National",
        personType: "Legal",
        beneficiaries: [
          {
            name: "Sara Brown",
            idNumber: "456456456"
          }
        ],
        bankDetails: {
          bank: "City Bank",
          accountNumber: "444555666",
          accountType: "Savings"
        }
      }
    ];

    // Borrar todos los usuarios existentes
    await User.deleteMany({});
    console.log('Todos los usuarios eliminados');

    // Insertar nuevos usuarios
    await User.insertMany(users);
    console.log('Usuarios creados con éxito');

    // Desconectar de la base de datos
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error al crear usuarios:', error);
  }
};

// Ejecutar la función
seedUsers();
