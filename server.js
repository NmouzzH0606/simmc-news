const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const marked = require('marked');
const app = express();
const port = process.env.PORT || 3000;

// Set up storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const newsDir = path.join(__dirname, 'news');
        // Create the news directory if it doesn't exist
        if (!fs.existsSync(newsDir)) {
            fs.mkdirSync(newsDir, { recursive: true });
        }
        cb(null, 'news/');
    },
    filename: function (req, file, cb) {
        // Use the original file name
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Accept only markdown files
        if (path.extname(file.originalname) !== '.md') {
            return cb(new Error('Only markdown files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Serve static files
app.use(express.static(__dirname));

// API endpoint to get all news files
app.get('/api/news', (req, res) => {
    const newsDir = path.join(__dirname, 'news');
    
    // Create the news directory if it doesn't exist
    if (!fs.existsSync(newsDir)) {
        fs.mkdirSync(newsDir, { recursive: true });
    }
    
    fs.readdir(newsDir, (err, files) => {
        if (err) {
            console.error('Error reading news directory:', err);
            return res.status(500).json({ error: 'Failed to read news directory' });
        }
        
        // Filter for markdown files
        const mdFiles = files.filter(file => path.extname(file) === '.md');
        
        // Map to file paths
        const filePaths = mdFiles.map(file => `news/${file}`);
        
        res.json(filePaths);
    });
});

// API endpoint to get a specific news file
app.get('/api/news/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'news', req.params.filename);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            return res.status(404).json({ error: 'File not found' });
        }
        
        res.send(data);
    });
});

// API endpoint to upload a new news file
app.post('/api/news/upload', upload.single('newsFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    res.json({ 
        success: true, 
        message: 'File uploaded successfully', 
        filePath: `news/${req.file.originalname}`
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 