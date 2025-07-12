document.addEventListener('DOMContentLoaded', function() {
    // Initialize the news website
    loadNews();
    setupEventListeners();
});

// News data
const newsData = {
    featured: [
        {
            id: 'welcome',
            title: '欢迎来到满香日报',
            category: '公告',
            excerpt: '满香日报正式上线，为您带来最新、最全面的新闻报道。',
            date: '2023-11-01',
            author: '编辑部',
            image: 'https://picsum.photos/id/1/600/400',
            content: `
                <h1>满香日报正式上线</h1>
                <p>满香日报今日正式上线，我们将致力于为广大读者提供最新、最全面的新闻报道。</p>
                <h2>我们的使命</h2>
                <ul>
                    <li>提供准确、及时的新闻报道</li>
                    <li>深入分析热点事件</li>
                    <li>关注社会各界动态</li>
                </ul>
                <h2>特色栏目</h2>
                <ol>
                    <li><strong>本地新闻</strong>: 关注身边事，了解本地动态</li>
                    <li><strong>国际视野</strong>: 放眼全球，把握世界脉搏</li>
                    <li><strong>科技前沿</strong>: 探索科技发展，洞察未来趋势</li>
                </ol>
                <p>感谢您的关注与支持，我们将不断努力，为您带来更优质的新闻内容。</p>
            `,
            featured: true
        }
    ],
    latest: [
        {
            id: 'local-festival',
            title: '本地文化节即将举行',
            category: '本地',
            excerpt: '一年一度的本地文化节将于下周举行，带来丰富多彩的文化活动。',
            date: '2023-11-02',
            author: '文化记者',
            image: 'https://picsum.photos/id/3/600/400',
            content: `
                <h1>本地文化节即将举行</h1>
                <p>一年一度的本地文化节将于下周举行，为期三天的活动将为市民带来丰富多彩的文化盛宴。</p>
                <h2>活动亮点</h2>
                <p>本次文化节将包括以下活动：</p>
                <ul>
                    <li><strong>传统艺术展示</strong>: 书法、国画、剪纸等传统艺术展示</li>
                    <li><strong>民间音乐表演</strong>: 来自各地的民间艺术家带来精彩演出</li>
                    <li><strong>美食街</strong>: 汇集各地特色美食</li>
                    <li><strong>手工艺品市集</strong>: 展示和销售当地手工艺品</li>
                </ul>
                <h2>活动时间和地点</h2>
                <ul>
                    <li><strong>时间</strong>: 2023年11月10日至12日，每日09:00-21:00</li>
                    <li><strong>地点</strong>: 市中心广场</li>
                </ul>
                <p>欢迎广大市民前来参加，共同感受传统文化的魅力！</p>
            `,
            featured: false
        },
        {
            id: 'tech-innovation',
            title: '最新科技创新成果展示',
            category: '科技',
            excerpt: '本周科技展览会上，多家企业展示了最新的科技创新成果。',
            date: '2023-11-03',
            author: '科技记者',
            image: 'https://picsum.photos/id/4/600/400',
            content: `
                <h1>最新科技创新成果展示</h1>
                <p>本周科技展览会上，多家企业展示了最新的科技创新成果，引发了广泛关注。</p>
                <h2>展会亮点</h2>
                <ul>
                    <li><strong>人工智能应用</strong>: 多家企业展示了AI在医疗、教育、金融等领域的应用</li>
                    <li><strong>可持续能源</strong>: 新型太阳能电池和风能技术展示</li>
                    <li><strong>智能家居</strong>: 全屋智能系统和智能家电展示</li>
                </ul>
                <p>这些创新成果展示了科技发展的最新趋势，也为未来生活描绘了美好蓝图。</p>
            `,
            featured: true
        },
        {
            id: 'global-summit',
            title: '全球气候峰会达成新协议',
            category: '国际',
            excerpt: '各国领导人在气候峰会上达成新的减排协议，承诺加强环保措施。',
            date: '2023-11-04',
            author: '国际记者',
            image: 'https://picsum.photos/id/5/600/400',
            content: `
                <h1>全球气候峰会达成新协议</h1>
                <p>在刚刚结束的全球气候峰会上，各国领导人达成了新的减排协议，承诺加强环保措施，共同应对气候变化挑战。</p>
                <h2>协议主要内容</h2>
                <ul>
                    <li>到2030年，全球碳排放量比2010年减少45%</li>
                    <li>发达国家将提供更多资金帮助发展中国家实施环保措施</li>
                    <li>加强对森林保护和可再生能源的投资</li>
                </ul>
                <p>此次协议的达成，标志着全球应对气候变化进入了新阶段，各国将共同努力，保护我们的地球家园。</p>
            `,
            featured: false
        }
    ]
};

// Function to load news
function loadNews() {
    try {
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