import pool from '../database/database.js';
import { uploadToS3 } from '../middlewares/upload.js';
import upload from '../middlewares/upload.js';

export const getPosts = async (req, res) => {

    try{
        const [rows] = await pool.query('SELECT * FROM posts ORDER BY data_criacao DESC');

        if(rows.length === 0 ){
            return res.status(204).json({message: 'Sem nada para listar.'});
        }

        const posts = rows.map(row => ({
            id: row.id,
            id_user: row.id_user,
            title: row.titulo,
            description: row.descricao,
            category: row.categoria,
            content: row.conteudo,
            imageUrls: row.imagem ? JSON.parse(row.imagem) : [],
            creation_date: row.data_criacao
        }))
        
        return res.json(posts)
      
        
        }catch (err) {
            res.status(500).json({error: 'Erro ao listar Posts.'});
        }
        };

export const createPost = async (req, res) => {
    try {
        const id_user = req.user.id;

        const { title, description, category, content } = req.body;

        if(!id_user || !title || !description || !category || !content){
           return res.status(400).json({ error: 'Campo(s) obrigatório(s) vazio(s).'});
        }

        const [existingTitle] = await pool.query(
        "SELECT * FROM posts WHERE titulo = ?",
        [title]
       )

       if (existingTitle.length > 0){
        return res.status(409).json({
            code: 'TITLE_ALREDY_EXISTS',
            message: 'Título já existe.'            
        })
       }

        let imageUrls = [];

        if(req.files && req.files.length > 0) {
           imageUrls = await Promise.all(req.files.map(file => uploadToS3(file)));
            
        }
    
        
        await pool.query(
            'INSERT INTO posts (id_user, titulo, descricao, categoria, conteudo, imagem) VALUES (?, ?, ?, ?, ?, ?)',
            [id_user, title, description, category, content, JSON.stringify(imageUrls) || null]
        )

        res.status(201).json({message: 'Post criado com sucesso.', images: imageUrls});

        } catch (err){
        console.error(err)
        res.status(500).json({error: 'Erro ao criar Post.'})
    }
};

export const getPostByID = async (req, res) => {

        try {
        const { id } = req.params

        const [rows] = await pool.query(
            'SELECT p.id, p.id_user AS user_id, u.nome AS user_nome, titulo, descricao, categoria, conteudo, imagem, data_criacao FROM posts p JOIN users u ON u.id = p.id_user WHERE p.id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }

        const row = rows[0];

        const posts = {
            id: row.id,
            id_user: row.id_user,
            name_user: row.user_nome,
            title: row.titulo,
            description: row.descricao,
            category: row.categoria,
            content: row.conteudo,
            imageUrls: row.imagem ? JSON.parse(row.imagem) : [],
            creation_date: row.data_criacao
        };

        res.json(posts);

    }  catch (err){
        return res.status(500).json({error: 'Erro ao visualizar post.'})

    }
};

export const myPosts = async (req, res) => {
    try {
        const id_user = req.user.id;

        const [rows] = await pool.query(
            'SELECT * FROM posts WHERE id_user = ?',
            [id_user]
        );

        const posts = rows.map(rows => ({
            id: rows.id,
            id_user: rows.id_user,
            title: rows.titulo,
            description: rows.descricao,
            category: rows.categoria,
            content: rows.conteudo,
            imageUrls: rows.imagem ? JSON.parse(rows.imagem) : [],
            creation_date: rows.data_criacao
        }))

        res.json(posts);

    } catch (err){
        return res.status(500).json({error: 'Erro ao listar posts.'})
    }
};

export const editPost = async (req, res) => {
    
    try {
        const id_user = req.user.id;

        const {title, description, category, content, removedImages = [] } = req.body;
        
        const { id } = req.params;

        const [post] = await pool.query(
            'SELECT * FROM posts WHERE id = ? AND id_user = ? ',
            [id, id_user]
        )

        if (post.length === 0 ){
            return res.status(404).json({ error: 'Post não encontrado;'});
        }
        const existingPost = post[0]; 

        let existingImages = [];

        if(existingPost.imagem){
            existingImages = JSON.parse(existingPost.imagem);
        }

        if(removedImages && removedImages.length > 0){
            existingImages = existingImages.filter(img => !removedImages.includes(img));
        }

        let newImages = [];

        if(req.files && req.files.length > 0){
            newImages = await Promise.all(req.files.map(file => uploadToS3(file)));
        }

        const finalImages = [...existingImages, ...newImages];

        

        const [result] = await pool.query('UPDATE posts SET titulo = ?, descricao = ?, categoria = ? , conteudo = ?, imagem = ? WHERE id = ? AND id_user = ?',
        [
            title ?? existingPost.titulo,
            description ?? existingPost.descricao,
            category ?? existingPost.categoria,
            content ?? existingPost.conteudo,
            JSON.stringify(finalImages),            
            id,
            id_user
        ]);

        if(result.affectedRows === 0){
         return res.status(404).json({ error: 'Post não encontrado ou você não tem permissão para editar.' });
        }

        res.status(200).json({message: 'Post alterado com sucesso.'});

    } catch (err){
        res.status(500).json({error: 'Erro ao editar Post.'})
    }
};

export const deletePost = async (req,res) => {

    try{

        const id_user = req.user.id;

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'O ID do Post é obrigatório.' });
        }


        const [result] = await pool.query(
            'DELETE FROM posts WHERE id = ? AND id_user = ?',
            [id, id_user]
        )

        if(result.affectedRows === 0){
         return res.status(404).json({ error: 'Post não encontrado ou você não tem permissão para excluir.' });
        }

        res.status(204).send();

    } catch(err){
        res.status(500).json({error: 'Erro ao excluir Post.'})
    }

}

export const search = async (req, res) => {
    
try{
    const { term } = req.query;

    if (!term){
        return res.status(500).json({error: 'Termo de busca é obrigatório.'})
    }

    const [rows] = await pool.query(
    'SELECT *, MATCH(titulo, conteudo) AGAINST (? IN BOOLEAN MODE) AS relevance FROM posts WHERE MATCH(titulo, conteudo) AGAINST (? IN BOOLEAN MODE) OR TITULO LIKE ? ORDER BY relevance DESC',
    [term, term, `%${term}%`]
    );
    
    const posts = rows.map(rows => ({
            id: rows.id,
            id_user: rows.id_user,
            title: rows.titulo,
            description: rows.descricao,
            category: rows.categoria,
            content: rows.conteudo,
            imageUrls: rows.imagem ? JSON.parse(rows.imagem) : [],
            creation_date: rows.data_criacao
        }))

    res.json(posts);
    } catch (err){
        res.status(500).json({error: 'Erro ao buscar Post.'})
    }
};