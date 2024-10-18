const express = require('express');
const path = require('path');
const cors = require('cors');
const { Console } = require('console');
const app = express();
const port = 4001;

// Array para armazenar os usuários
let users = [];
let books = [];

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'IdentificacaoUsuario.html'));
});

app.get('/IdentificacaoLivro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'IdentificacaoLivro.html'));
});

app.get('/ConfirmacaoEmprestimo', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ConfirmacaoEmprestimo.html'));
});

app.get('/ConfirmacaoDevolucao', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ConfirmacaoDevolucao.html'));
});

app.get('/Agradecimento', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Agradecimento.html'));
});

app.get('/CadastroLivros', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'CadastroLivros.html'));
});

app.get('/CadastroUsuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'CadastroUsuario.html'));
});

app.get('/Contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Contato.html'));
});

// ROTAS //

// BUSCA
app.post('/api/management/get/user', (req, res) => {
    const { userId } = req.body; // Obtenha o RFID do corpo da requisição
    console.log(req.body);
    console.log('USUARIO')
    if (!userId) {
        return res.status(400).json({ error: 'ID do usuário não fornecido' });
    } 
    // Busca o usuário no array
    const user = users.find(user => user.userId === userId);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});
 
// Rota de cadastro de usuário
app.post('/api/management/register/user', (req, res) => {
    const { userId: userId, name, cpfCnpj, email, username, password, dateOfBirth, numberPhone, address, typeUser } = req.body;
    console.log('Requisição recebida no /api/management/register/user');
    console.log(req.body);
    console.log('REGISTRO USUARIO')
    if (userId && name && cpfCnpj && email && username && password && dateOfBirth && numberPhone && address && typeUser) {
        // Adiciona o usuário ao array
        users.push({ userId, name, cpfCnpj, email, username, password, dateOfBirth, numberPhone, address, typeUser });
        res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
    } else {
        res.status(400).json({ error: 'Dados incompletos. Preencha todos os campos corretamente.' });
    }
});
 

app.post('/api/management/get/book', (req, res) => {
    const { bookId} = req.body; // Obtenha o RFID do corpo da requisição
    console.log(req.body);
    console.log('BOOK')
    if (!bookId) {
        return res.status(400).json({ error: 'ID do usuário não fornecido' });
    } 
    // Busca o usuário no array
    const book = books.find(book => book.bookId === bookId);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});

app.post('/api/management/register/book', (req, res) => {
    const { bookId, title, subtitle, author, sinopse, gender, language, urlImage, publishers, publishDate, physicalDimensions, publishPlaces, numberOfPages, isbn } = req.body;
    console.log('Requisição recebida no /api/management/register/bool');
    console.log(req.body);
    console.log('REGISTRO LIVRO')
    // Verifica se os campos obrigatórios estão preenchidos
    if (bookId && title && author) {
        // Adiciona o livro ao array de livros
        books.push({bookId, title, subtitle, author, sinopse, gender, language, urlImage, publishers, publishDate, physicalDimensions, publishPlaces, numberOfPages, isbn
        
        }); // se não tiver isbn ele vai dar problema nesse push?

        res.status(200).json({ message: 'Livro cadastrado com sucesso!' });
    } else {
        res.status(400).json({ error: 'Dados incompletos. Preencha todos os campos corretamente.' });
    }
});

app.post('/api/transaction/lend', (req, res) => {
    const { bookId, userId} = req.body;
    console.log('Requisição recebida no /api/transaction/lend');
    console.log(req.body);
    console.log('TRANSAÇÃO EMPRESTIMO')


    if (!bookId && !userId) {
       // return res.status(400).json({ error: 'O campo bookId é obrigatório.' });
    
    
    // Verifica se os campos obrigatórios estão preenchidos
  //  if (bookId && userId ) {
        // Adiciona o livro ao array de livros
        books.push({bookId, userId
        
        }); // se não tiver isbn ele vai dar problema nesse push?

        res.status(200).json({ message: 'Livro cadastrado com sucesso!' });
    } else {
        res.status(400).json({ error: 'Dados incompletos. Preencha todos os campos corretamente.' });
    }
});

 
app.post('/api/transaction/request', (req, res) => {
    const { bookId, title, subtitle, author, sinopse, gender, language, urlImage, publishers, publishDate, physicalDimensions, publishPlaces, numberOfPages, isbn } = req.body;
    console.log('Requisição recebida no /api/transaction/lend');
    console.log(req.body);
    console.log('TRANSAÇÃO EMPRESTIMO')
    // Verifica se os campos obrigatórios estão preenchidos
    if (bookId && title && author) {
        // Adiciona o livro ao array de livros
        books.push({bookId, title, subtitle, author, sinopse, gender, language, urlImage, publishers, publishDate, physicalDimensions, publishPlaces, numberOfPages, isbn
        
        }); // se não tiver isbn ele vai dar problema nesse push?

        res.status(200).json({ message: 'Livro cadastrado com sucesso!' });
    } else {
        res.status(400).json({ error: 'Dados incompletos. Preencha todos os campos corretamente.' });
    }
});




// const getBookByRFID = (bookId) => {
//     return books.find(book => book.bookId === bookId);
// };

// // Rota para buscar livro com base no RFID
// app.post('/api/management/get/book', (req, res) => {
//     const { bookId } = req.body; // Obtenha o RFID do corpo da requisição
    
//     if (!bookId) {
//         return res.status(400).json({ error: 'RFID não fornecido' });
//     }
    
//     const book = getBookByRFID(bookId);
    
//     if (book) {
//         const dataBook = {
//             root: {
//                 userRootId: 'root1', // Defina conforme necessário
//                 libraryId: 'library1' // Defina conforme necessário
//             },
//             bookId: book.bookId,
//             isbn: book.isbn,
//             title: book.title,
//             subtitle: book.subtitle,
//             author: book.author,
//             sinopse: book.sinopse,
//             gender: book.gender,
//             language: book.language,
//             urlImage: book.urlImage,
//             publishers: book.publishers,
//             publishDate: book.publishDate,
//             physicalDimensions: book.physicalDimensions,
//             publishPlaces: book.publishPlaces,
//             numberOfPages: book.numberOfPages,
//             status: 2
//         };
        
//         res.status(200).json(dataBook);
//     } else {
//         res.status(404).json({ error: 'Livro não encontrado' });
//     }
// });



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    
    // const getBookByRFID = (userId) => {
    //     const books = [
    //         {
    //             root: {
    //                 userRootId: 'root1',
    //                 libraryId: 'library1'
    //             },
    //             userId: '12345',
    //             isbn: '978-3-16-148410-0',
    //             title: 'Livro Exemplo',
    //             subtitle: 'Subtítulo Exemplo',
    //             author: 'Autor Exemplo',
    //             sinopse: 'Sinopse do livro exemplo.',
    //             gender: 'Ficção',
    //             language: 'Português',
    //             urlImage: 'http://exemplo.com/imagem.jpg',
    //             publishers: ['Editora Exemplo'],
    //             publishDate: '2024-01-01',
    //             physicalDimensions: '20x15 cm',
    //             publishPlaces: ['Cidade Exemplo'],
    //             numberOfPages: 300
    //         },
    //         {
    //             root: {
    //                 userRootId: 'root2',
    //                 libraryId: 'library2'
    //             },
    //             userId: '67890',
    //             isbn: '978-0-13-110362-7',
    //             title: 'Outro Livro',
    //             subtitle: 'Outro Subtítulo',
    //             author: 'Outro Autor',
    //             sinopse: 'Sinopse de outro livro.',
    //             gender: 'Não-ficção',
    //             language: 'Inglês',
    //             urlImage: 'http://exemplo.com/outraimagem.jpg',
    //             publishers: ['Outra Editora'],
    //             publishDate: '2023-06-15',
    //             physicalDimensions: '21x14 cm',
    //             publishPlaces: ['Outra Cidade'],
    //             numberOfPages: 150
    //         }
    //     ];
    //     return books.find(book => book.userId === userId);
    // };
});