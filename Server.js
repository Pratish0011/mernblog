const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const { MongoClient } = require("mongodb");

// Initialize MiddleWare.
app.use(express.json({ extended: false }));

app.get('/api/articles/:name', async (req, res) => {
    try {
        const articleName = req.params.name;
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db("mernblog");
        const articlesInfo = await db.collection("articles").findOne({ name: articleName });
        res.status(200).json(articlesInfo);
        client.close();
    } catch (error) {
        res.status(500).json({ message: "Error connecting to database", error });
    }
});

app.post("/api/articles/:name/add-comments", async (req, res) => {
    try {
        const { username, text } = req.body;
        const articleName = req.params.name;
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db("mernblog");
        const articlesInfo = await db.collection("articles").findOne({ name: articleName });
        await db.collection("articles").updateOne(
            { name: articleName },
            { $push: { comments: { username, text } } }
        );
        const updatedArticleInfo = await db.collection("articles").findOne({ name: articleName });
        res.status(200).json(updatedArticleInfo);
        client.close();
    } catch (error) {
        res.status(500).json({ message: "Error connecting to database", error });
    }
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
