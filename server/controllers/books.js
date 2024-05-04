import {v4 as uuidv4} from 'uuid';
import {driver, createSession} from '../neo4jSession.js'

const getBooks = async (req, res) => {
    const session = createSession();
    try{
        console.log(req.query);
        const userId=req.params.userId;
        const result = await session.run('MATCH (p:User {id: $userId})-[:POSTED]->(b:Book) RETURN b',{userId});
        const books = result.records.map((record)=> record.get('b').properties);
        res.status(200).json(books);
    } catch(error){
        res.status(404).json({message: error.message})
    } finally{
        await session.close();
    }
};

// const createBook = async (req, res) =>{
//     const session = createSession();
//     try{
//         const { title, description, price, image } = req.body;
//         console.log(req.body)
//         const result = await session.run(
//             'CREATE (b:Book {id: $id, title: $title, description: $description,  price: $price, image: $image}) RETURN b',
//             {id: uuidv4(), title, description, price, image}
//         );
//         const newBook = result.records[0].get('b');
//         res.status(201).json({result: newBook.properties});
//     } catch(error){
//         res.status(409).json({message: error.message});
//     } finally{
//         await session.close();
//     }
// };

const createBook = async (req, res) => {
    const session = createSession();

    try {
        const { title, description, author, category, price, discount, userId } = req.body;
        const bookId = uuidv4();

        const result = await session.run(
            `
            MATCH (u:User {id: $userId})
            CREATE (b:Book {id: $bookId, title: $title, description: $description, author: $author, category: $category, price: $price, discount: $discount, postedBy: $userId})
            MERGE (u)-[:POSTED]->(b)
            RETURN b
            `,
            { userId, bookId, title, description, author, category, price, discount}
        );

        const newBook = result.records[0].get('b').properties;
        res.status(201).json(newBook);

    } catch (error) {
        console.error(error);
        res.status(409).json({ message: error.message });
    } finally {
        await session.close();
    }
};


// const editBook = async(req, res) => {
//     const session = createSession();
//     try{
//         // const {id} = req.params;
//         const {title, description, price, image , userId} = req.body;
//         const result = await session.run(
//             'MATCH (b:Book {id: $userId}) SET b += {title: $title, description: $description, price: $price, image: $image} RETURN b',
//             {userId, title, description, price, image}
//         );
//         console.log(id);
//         const updatedBook = result.records[0].get('b');
//         res.json({result: updatedBook.properties});
//     } catch(error){
//         res.status(404).json({message: error.message});
//     } finally{
//         await session.close();
//     }
// };

const editBook = async (req, res) => {
    const session = createSession();
    try {
        const { title, description, author, category, price, discount, userId} = req.body;
        const { id } = req.params

        const checkUserResult = await session.run(
            'MATCH (u:User {id: $userId})-[:POSTED]->(b:Book {id: $id}) RETURN u',
            { userId, id }
        );

        if (checkUserResult.records.length === 0) {
            return res.status(403).json({ message: 'You do not have permission to edit this book.' });
        }

        const updateResult = await session.run(
            'MATCH (b:Book {id: $id}) SET b += {title: $title, description: $description, author: $author, category: $category, price: $price, discount: $discount} RETURN b',
            { id, title, description, author, category, price, discount }
        );
        
        const updatedBook = updateResult.records[0].get('b').properties;
        res.json(updatedBook);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await session.close();
    }
};


const deleteBook = async (req, res) => {
    const {id} = req.params;
    const session = createSession();
    try{
        await session.run('MATCH (b:Book {id: $id}) DETACH DELETE b', { id });
        res.json({ message: 'Book deleted successfully' });
    } catch(error){
        res.status(404).json({message: error.message});
    } finally{
        await session.close();
    }
};
export {getBooks, createBook, editBook, deleteBook};