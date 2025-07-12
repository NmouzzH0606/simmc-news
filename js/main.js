document.addEventListener('DOMContentLoaded', function() {
    // Initialize the news website
    loadNews();
    setupEventListeners();
});

// News data
const newsData = {
    featured: [],
    latest: []
};

// Function to load news from Markdown files
async function loadNews() {
    try {
        // Load news from the /news directory
        const newsFiles = await fetchNewsFiles();
        
        // Process each news file
        for (const file of newsFiles) {
            const newsItem = await processNewsFile(file);
            if (newsItem) {
                // Add to latest news
                newsData.latest.push(newsItem);
                
                // Add to featured if it's marked as featured or if we don't have any featured news yet
                if (newsItem.featured || newsData.featured.length === 0) {
                    newsData.featured.push(newsItem);
                }
            }
        }
        
        // Sort latest news by date (newest first)
        newsData.latest.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Sort featured news by date (newest first)
        newsData.featured.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Limit featured news to 4 items
        if (newsData.featured.length > 4) {
            newsData.featured = newsData.featured.slice(0, 4);
        }
        
        // Render news
        renderFeaturedNews();
        renderLatestNews();
        
        // Show a message if no news is available
        if (newsData.latest.length === 0) {
            showNoNewsMessage();
        }
    } catch (error) {
        console.error('Error loading news:', error);
        showNoNewsMessage();
    }
}

// Function to show a message when no news is available
function showNoNewsMessage() {
    const featuredContainer = document.getElementById('featured-news-container');
    const latestContainer = document.getElementById('latest-news-container');
    
    if (featuredContainer) {
        featuredContainer.innerHTML = '<div class="no-news">暂无头条新闻，请上传新闻文章</div>';
    }
    
    if (latestContainer) {
        latestContainer.innerHTML = '<div class="no-news">暂无最新新闻，请上传新闻文章</div>';
    }
}

// Function to fetch news files
async function fetchNewsFiles() {
    try {
        // Call the API to get the list of news files
        const response = await fetch('/api/news');
        if (!response.ok) {
            throw new Error(`Failed to fetch news files: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching news files:', error);
        return [];
    }
}

// Function to process a news file
async function processNewsFile(filePath) {
    try {
        // Fetch the content of the Markdown file
        const response = await fetch(`/api/news/${filePath.split('/').pop()}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${filePath}: ${response.status} ${response.statusText}`);
        }
        
        const content = await response.text();
        
        // Extract metadata from the Markdown content
        const metadata = extractMetadata(content);
        const htmlContent = marked.parse(content);
        
        return {
            id: filePath.split('/').pop().replace('.md', ''),
            title: metadata.title || 'Untitled',
            category: metadata.category || 'General',
            excerpt: metadata.excerpt || generateExcerpt(htmlContent),
            date: metadata.date || new Date().toISOString().split('T')[0],
            author: metadata.author || 'Unknown',
            image: metadata.image || `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/600/400`,
            content: htmlContent,
            featured: metadata.featured === 'true' || metadata.featured === true
        };
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
        return null;
    }
}

// Function to extract metadata from Markdown content
function extractMetadata(content) {
    const metadata = {};
    const metadataRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(metadataRegex);
    
    if (match && match[1]) {
        const metadataLines = match[1].split('\n');
        metadataLines.forEach(line => {
            const [key, value] = line.split(':').map(part => part.trim());
            if (key && value) {
                metadata[key] = value;
            }
        });
    }
    
    return metadata;
}

// Function to generate an excerpt from HTML content
function generateExcerpt(htmlContent) {
    // Create a temporary element to parse HTML
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    
    // Get text content and limit to 150 characters
    const text = tempElement.textContent || '';
    return text.substring(0, 150) + (text.length > 150 ? '...' : '');
}

// Function to render featured news
function renderFeaturedNews() {
    const container = document.getElementById('featured-news-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (newsData.featured.length === 0) {
        container.innerHTML = '<div class="no-news">暂无头条新闻</div>';
        return;
    }
    
    newsData.featured.forEach(news => {
        const newsCard = createNewsCard(news);
        container.appendChild(newsCard);
    });
}

// Function to render latest news
function renderLatestNews() {
    const container = document.getElementById('latest-news-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (newsData.latest.length === 0) {
        container.innerHTML = '<div class="no-news">暂无最新新闻</div>';
        return;
    }
    
    newsData.latest.forEach(news => {
        const newsItem = createNewsItem(news);
        container.appendChild(newsItem);
    });
}

// Function to create a news card element
function createNewsCard(news) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.dataset.id = news.id;
    
    card.innerHTML = `
        <div class="news-image" style="background-image: url('${news.image}')"></div>
        <div class="news-content">
            <span class="news-category">${news.category}</span>
            <h3 class="news-title">${news.title}</h3>
            <p class="news-excerpt">${news.excerpt}</p>
            <div class="news-meta">
                <span>${news.author}</span>
                <span>${news.date}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openArticle(news));
    
    return card;
}

// Function to create a news item element
function createNewsItem(news) {
    const item = document.createElement('div');
    item.className = 'news-item';
    item.dataset.id = news.id;
    
    item.innerHTML = `
        <div class="news-item-image" style="background-image: url('${news.image}')"></div>
        <div class="news-item-content">
            <span class="news-category">${news.category}</span>
            <h3 class="news-item-title">${news.title}</h3>
            <div class="news-item-meta">
                <span>${news.author}</span>
                <span>${news.date}</span>
            </div>
        </div>
    `;
    
    item.addEventListener('click', () => openArticle(news));
    
    return item;
}

// Function to open an article
function openArticle(news) {
    const modal = document.getElementById('article-modal');
    const content = document.getElementById('article-content');
    
    // Set the article content
    content.innerHTML = `
        <h1>${news.title}</h1>
        <div class="article-meta">
            <span class="article-category">${news.category}</span>
            <span class="article-author">作者: ${news.author}</span>
            <span class="article-date">发布日期: ${news.date}</span>
        </div>
        <div class="article-body">
            ${news.content}
        </div>
    `;
    
    // Show the modal
    modal.style.display = 'block';
}

// Function to setup event listeners
function setupEventListeners() {
    // Close modal when clicking the close button
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.getElementById('article-modal').style.display = 'none';
        });
    }
    
    // Close modal when clicking outside the content
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('article-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Category filters
    setupCategoryFilter('all-news', 'all');
    setupCategoryFilter('local-news', '本地');
    setupCategoryFilter('global-news', '国际');
    setupCategoryFilter('tech-news', '科技');
}

// Function to setup category filter
function setupCategoryFilter(elementId, category) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            filterNewsByCategory(category);
        });
    }
}

// Function to filter news by category
function filterNewsByCategory(category) {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Set active class on the clicked link
    if (category === 'all') {
        document.getElementById('all-news').classList.add('active');
    } else if (category === '本地') {
        document.getElementById('local-news').classList.add('active');
    } else if (category === '国际') {
        document.getElementById('global-news').classList.add('active');
    } else if (category === '科技') {
        document.getElementById('tech-news').classList.add('active');
    }
    
    // Filter featured news
    const filteredFeatured = category === 'all' 
        ? newsData.featured 
        : newsData.featured.filter(news => news.category === category);
    
    // Filter latest news
    const filteredLatest = category === 'all'
        ? newsData.latest
        : newsData.latest.filter(news => news.category === category);
    
    // Update the news containers
    const featuredContainer = document.getElementById('featured-news-container');
    const latestContainer = document.getElementById('latest-news-container');
    
    featuredContainer.innerHTML = '';
    latestContainer.innerHTML = '';
    
    if (filteredFeatured.length === 0) {
        featuredContainer.innerHTML = '<div class="no-news">该分类下暂无头条新闻</div>';
    } else {
        filteredFeatured.forEach(news => {
            const newsCard = createNewsCard(news);
            featuredContainer.appendChild(newsCard);
        });
    }
    
    if (filteredLatest.length === 0) {
        latestContainer.innerHTML = '<div class="no-news">该分类下暂无最新新闻</div>';
    } else {
        filteredLatest.forEach(news => {
            const newsItem = createNewsItem(news);
            latestContainer.appendChild(newsItem);
        });
    }
} 