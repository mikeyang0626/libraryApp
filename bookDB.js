const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true })
    .then(console.log('Connecting to Database...'))
    .catch( (err) => {
        console.log('Error:', err);
    });

const bookSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 255
    },
    author: String,
    category: {
        type: String,
        enum: [ 'literature', 'novel', 'science', 'art' ], 
        required: true,
        lowercae: true,
        trim: true
    },
    dateCreated: { type: Date, default: Date.now },
    isAvaible: Boolean,
    price: {
        type: Number,
        min: 0.01,
        max: 999999999999999

    },
    tags: {
        type: Array,
        validate:{
            validator: function(v){
                return v && v.length > 0 ;
            },
            message: 'A book should have at least one tag.'
        }
        

    }
});

const Book = mongoose.model('books', bookSchema);

async function createBook(){

    const book = new Book({

        name: 'book of damn',
        author: 'magic',
        category: 'opps',
        isAvaible: true,
        price: 20 ,
        tags: [ ]    
    });

    try{
        
        const result = await book.save();
        console.log(result);
    
    }
    catch( ex ){
        for( field in ex.errors ){
            console.log( ex.errors[field].message);
        }
    }
   
}
//createBook();

async function getBooks(){
    
    return books = await Book
        .find();
    
    console.log(books);

}
async function updateBook(id){

    const book = await Book.findById(id);


}

module.exports = getBooks ;

