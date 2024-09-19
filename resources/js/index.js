const data = await Promise.all(magazines.map(async (val) => await getMagazinesObject(val)));

data.forEach((element, index) => {
    document.getElementById("accordionPanelsStayOpenExample").appendChild(accordion(element, index));

    element.items.forEach((val, index) => {
        document.querySelector(`.${removeSpaces(element.feed.title)} .carousel-inner`).appendChild(carousel(val));
    })

    document.querySelector(`.${removeSpaces(element.feed.title)} .carousel-inner`).children[0].classList.add("active");
});

// RSS to JSON Converter API
async function getMagazinesObject(RSSLink) {
    try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${RSSLink}`);
        const data = await res.json();
        return data;
    } catch (err) {
        return null;
    }
}

// accordion builder
function accordion(accordionData, accordionIndex) {
    const accordionItem = document.createElement("div");
    const id = removeSpaces(accordionData.feed.title);
    accordionItem.classList.add("accordion-item", id);

    if (accordionIndex === 0) {
        accordionItem.innerHTML = `
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                data-bs-target="#${id}" aria-expanded="true"
                aria-controls="${id}">
                    <h5>${accordionData.feed.title}</h5>
                </button>
            </h2>
            <div id="${id}" class="accordion-collapse collapse show mb-3">
                <div class="accordion-body p-0">
                    <div id="carouselExample-${accordionIndex}" class="carousel slide">
                        <div class="carousel-inner"></div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample-${accordionIndex}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample-${accordionIndex}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div> `;
    } else {
        accordionItem.innerHTML = `
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#${id}" aria-expanded="false"
                    aria-controls="${id}">
                    <h5>${accordionData.feed.title}</h5>
                </button>
            </h2>
            <div id="${id}" class="accordion-collapse collapse mb-3">
                <div class="accordion-body p-0">
                    <div id="carouselExample-${accordionIndex}" class="carousel slide">
                        <div class="carousel-inner"></div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample-${accordionIndex}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample-${accordionIndex}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>`;
    }
    return accordionItem;
}

// carousel builder
function carousel(item) {
    const carouselItem = document.createElement("div");
    const pubDate = new Date(item.pubDate).toLocaleString("en-IN", { dateStyle: "short" });

    carouselItem.classList.add("carousel-item");
    carouselItem.innerHTML = `
        <a href="${item.link}" target="_blank">
            <img src="${item.enclosure.link}" class="d-block w-100" alt="..." />
            <div class="p-3 carousel-text">
                <div>
                    <h3>${item.title}</h3>
                    <div class="author-date">
                        <p class="d-inline-block author">${item.author}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                        </svg>
                        <p class="d-inline-block pub-date">${pubDate}</p>
                    </div>
                </div>
                <p class="description">${item.description}</p>
            </div>
        </a>`

    return carouselItem;
}

// helper function - replace Spaces with Hyphen from string
function removeSpaces(str) {
    return str.replaceAll(" ", "-");
}
