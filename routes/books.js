const express = require('express');
const router = express.Router();
const getBooks = require('../bookDB');

async function getBooksDB(){
    const books = await getBooks();
    console.log(books);
    
}

getBooksDB();