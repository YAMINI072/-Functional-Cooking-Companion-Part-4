// Recipe Application - Part 4: Search, Favorites, and Final Polish
(function () {
    'use strict';

    // =====================================
    // DATA
    // =====================================

    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            description: "A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
            time: 25,
            category: "main",
            vegetarian: false,
            quick: false,
            image: "https://images.unsplash.com/photo-1551892376-3e003fb9c0d4?w=400",
            ingredients: ["200g spaghetti", "100g pancetta", "2 large eggs", "50g Pecorino Romano", "Black pepper"],
            steps: [
                "Bring a large pot of salted water to boil and cook spaghetti according to package directions.",
                "While pasta cooks, cook pancetta in a skillet until crispy.",
                "In a bowl, whisk eggs and cheese together.",
                "Reserve pasta water, then drain pasta and add to skillet with pancetta.",
                "Remove from heat and quickly stir in egg mixture, adding pasta water as needed for creaminess.",
                "Season with black pepper and serve immediately."
            ]
        },
        {
            id: 2,
            title: "Vegetarian Buddha Bowl",
            description: "A nutritious bowl packed with quinoa, roasted vegetables, avocado, and tahini dressing.",
            time: 35,
            category: "main",
            vegetarian: true,
            quick: false,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
            ingredients: ["1 cup quinoa", "1 sweet potato", "1 cup broccoli florets", "1 avocado", "2 tbsp tahini", "Lemon juice", "Mixed greens"],
            steps: [
                "Cook quinoa according to package directions.",
                "Roast diced sweet potato and broccoli at 400°F for 25 minutes.",
                "Slice avocado and prepare tahini dressing with lemon juice.",
                "Assemble bowl with greens, quinoa, roasted veggies, and avocado.",
                "Drizzle with tahini dressing and serve."
            ]
        },
        {
            id: 3,
            title: "Quick Chicken Stir-Fry",
            description: "A fast and flavorful stir-fry with chicken, vegetables, and a savory sauce.",
            time: 15,
            category: "main",
            vegetarian: false,
            quick: true,
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
            ingredients: ["300g chicken breast", "2 cups mixed vegetables", "2 tbsp soy sauce", "1 tbsp sesame oil", "1 tsp ginger", "2 cloves garlic"],
            steps: [
                "Slice chicken into thin strips and season with salt and pepper.",
                "Heat oil in a wok or large skillet over high heat.",
                "Add chicken and cook for 3-4 minutes until browned.",
                "Add garlic and ginger, cook for 30 seconds.",
                "Add vegetables and stir-fry for 3-4 minutes until tender-crisp.",
                "Add soy sauce and toss everything together. Serve hot."
            ]
        },
        {
            id: 4,
            title: "Mediterranean Quinoa Salad",
            description: "A refreshing salad with quinoa, feta, olives, tomatoes, and herbs.",
            time: 20,
            category: "side",
            vegetarian: true,
            quick: true,
            image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400",
            ingredients: ["1 cup quinoa", "1 cup cherry tomatoes", "1/2 cup feta cheese", "1/4 cup olives", "Fresh basil", "Olive oil", "Lemon juice"],
            steps: [
                "Cook quinoa and let cool.",
                "Halve cherry tomatoes and chop basil.",
                "Combine quinoa, tomatoes, feta, olives, and basil in a bowl.",
                "Drizzle with olive oil and lemon juice.",
                "Toss gently and serve chilled or at room temperature."
            ]
        },
        {
            id: 5,
            title: "Beef Tacos",
            description: "Classic Mexican tacos with seasoned ground beef, fresh toppings, and corn tortillas.",
            time: 30,
            category: "main",
            vegetarian: false,
            quick: false,
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
            ingredients: ["400g ground beef", "8 corn tortillas", "1 onion", "2 tomatoes", "1 avocado", "Taco seasoning", "Cilantro"],
            steps: [
                "Brown ground beef in a skillet over medium heat.",
                "Add taco seasoning and cook according to package directions.",
                "While beef cooks, dice onion, tomatoes, and avocado.",
                "Warm tortillas in a dry skillet or microwave.",
                "Assemble tacos with beef, toppings, and cilantro.",
                "Serve immediately with your favorite hot sauce."
            ]
        },
        {
            id: 6,
            title: "Caprese Salad",
            description: "A simple Italian salad with fresh tomatoes, mozzarella, basil, and balsamic glaze.",
            time: 10,
            category: "side",
            vegetarian: true,
            quick: true,
            image: "https://images.unsplash.com/photo-1572441713132-fb0c783b9b5e?w=400",
            ingredients: ["4 large tomatoes", "200g fresh mozzarella", "Fresh basil leaves", "Extra virgin olive oil", "Balsamic glaze", "Salt and pepper"],
            steps: [
                "Slice tomatoes and mozzarella into 1/4 inch thick rounds.",
                "Arrange alternating slices of tomato and mozzarella on a platter.",
                "Tuck fresh basil leaves between the slices.",
                "Drizzle with olive oil and balsamic glaze.",
                "Season with salt and pepper and serve immediately."
            ]
        },
        {
            id: 7,
            title: "Thai Green Curry",
            description: "Aromatic Thai curry with coconut milk, vegetables, and your choice of protein.",
            time: 40,
            category: "main",
            vegetarian: false,
            quick: false,
            image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400",
            ingredients: ["400ml coconut milk", "2 tbsp green curry paste", "200g chicken or tofu", "Mixed vegetables", "Fish sauce", "Thai basil", "Jasmine rice"],
            steps: [
                "Cook jasmine rice according to package directions.",
                "Heat coconut milk in a large pot over medium heat.",
                "Add green curry paste and stir until fragrant.",
                "Add protein and vegetables, simmer for 15-20 minutes.",
                "Season with fish sauce and add Thai basil.",
                "Serve over rice with lime wedges on the side."
            ]
        },
        {
            id: 8,
            title: "Chocolate Chip Cookies",
            description: "Classic homemade cookies that are crispy on the outside and chewy on the inside.",
            time: 25,
            category: "dessert",
            vegetarian: true,
            quick: false,
            image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
            ingredients: ["2 1/4 cups flour", "1 cup butter", "3/4 cup sugar", "3/4 cup brown sugar", "2 eggs", "2 cups chocolate chips", "1 tsp vanilla", "1 tsp baking soda"],
            steps: [
                "Preheat oven to 375°F (190°C).",
                "Cream together butter and both sugars until light and fluffy.",
                "Beat in eggs one at a time, then add vanilla.",
                "In a separate bowl, whisk flour and baking soda.",
                "Gradually add dry ingredients to wet mixture.",
                "Stir in chocolate chips.",
                "Drop rounded tablespoons onto ungreased baking sheets.",
                "Bake for 9-11 minutes until golden brown. Cool on wire racks."
            ]
        }
    ];

    // =====================================
    // STATE MANAGEMENT
    // =====================================

    let currentFilter = 'all';
    let currentSort = 'name';
    let searchQuery = '';
    let favorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];

    // =====================================
    // DOM REFERENCES
    // =====================================

    const recipeContainer = document.getElementById('recipe-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortButtons = document.querySelectorAll('.sort-btn');
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const recipeCounter = document.getElementById('recipe-counter');

    // =====================================
    // UTILITY FUNCTIONS
    // =====================================

    // Debounce function for search input
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // =====================================
    // RENDERING FUNCTIONS
    // =====================================

    function createRecipeCard(recipe) {
        const isFavorited = favorites.includes(recipe.id);
        return `
      <div class="recipe-card" data-recipe-id="${recipe.id}">
        <div class="recipe-header" style="background-image: url('${recipe.image}')">
          <div class="recipe-title">${recipe.title}</div>
          <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-recipe-id="${recipe.id}">
            ${isFavorited ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="recipe-content">
          <div class="recipe-meta">
            <span>${recipe.time} mins</span>
            <span>${recipe.category}</span>
          </div>
          <p class="recipe-description">${recipe.description}</p>
          <button class="ingredients-toggle" data-recipe-id="${recipe.id}">Ingredients ▼</button>
          <ul class="ingredients-list" style="display: none;" data-recipe-id="${recipe.id}">
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
          <button class="steps-toggle" data-recipe-id="${recipe.id}">Steps ▼</button>
          <ol class="steps-list" style="display: none;" data-recipe-id="${recipe.id}">
            ${recipe.steps.map(step => `<li class="step-item">${step}</li>`).join('')}
          </ol>
        </div>
      </div>
    `;
    }

    function renderRecipes(recipesToRender) {
        recipeContainer.innerHTML = recipesToRender.map(createRecipeCard).join('');
    }

    // =====================================
    // FILTER FUNCTIONS
    // =====================================

    function applyFilter(recipes, filterType) {
        switch (filterType) {
            case 'vegetarian':
                return recipes.filter(recipe => recipe.vegetarian);
            case 'quick':
                return recipes.filter(recipe => recipe.quick);
            case 'favorites':
                return recipes.filter(recipe => favorites.includes(recipe.id));
            default:
                return recipes;
        }
    }

    function applySearch(recipes, query) {
        if (!query.trim()) return recipes;

        const lowerQuery = query.toLowerCase().trim();
        return recipes.filter(recipe => {
            const titleMatch = recipe.title.toLowerCase().includes(lowerQuery);
            const ingredientMatch = recipe.ingredients.some(ingredient =>
                ingredient.toLowerCase().includes(lowerQuery)
            );
            const descriptionMatch = recipe.description.toLowerCase().includes(lowerQuery);

            return titleMatch || ingredientMatch || descriptionMatch;
        });
    }

    // =====================================
    // SORT FUNCTIONS
    // =====================================

    function applySort(recipes, sortType) {
        const sortedRecipes = [...recipes];
        switch (sortType) {
            case 'time':
                return sortedRecipes.sort((a, b) => a.time - b.time);
            case 'name':
            default:
                return sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
        }
    }

    // =====================================
    // UI UPDATE FUNCTIONS
    // =====================================

    function updateRecipeCounter(filteredRecipes) {
        const totalRecipes = recipes.length;
        const showingRecipes = filteredRecipes.length;
        recipeCounter.textContent = `Showing ${showingRecipes} of ${totalRecipes} recipes`;
    }

    function updateDisplay() {
        let filteredRecipes = applySearch(recipes, searchQuery);
        filteredRecipes = applyFilter(filteredRecipes, currentFilter);
        filteredRecipes = applySort(filteredRecipes, currentSort);

        updateRecipeCounter(filteredRecipes);
        renderRecipes(filteredRecipes);
    }

    // =====================================
    // FAVORITES MANAGEMENT
    // =====================================

    function toggleFavorite(recipeId) {
        const index = favorites.indexOf(recipeId);
        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(recipeId);
        }
        localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
        updateDisplay();
    }

    // =====================================
    // EVENT HANDLERS
    // =====================================

    function handleFilterClick(event) {
        const filterType = event.target.dataset.filter;
        if (filterType) {
            currentFilter = filterType;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            updateDisplay();
        }
    }

    function handleSortClick(event) {
        const sortType = event.target.dataset.sort;
        if (sortType) {
            currentSort = sortType;
            sortButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            updateDisplay();
        }
    }

    function handleToggleClick(event) {
        if (event.target.classList.contains('ingredients-toggle') || event.target.classList.contains('steps-toggle')) {
            const recipeId = event.target.dataset.recipeId;
            const isIngredients = event.target.classList.contains('ingredients-toggle');
            const listClass = isIngredients ? 'ingredients-list' : 'steps-list';
            const list = document.querySelector(`.${listClass}[data-recipe-id="${recipeId}"]`);

            if (list.style.display === 'none' || list.style.display === '') {
                list.style.display = 'block';
                event.target.textContent = isIngredients ? 'Ingredients ▲' : 'Steps ▲';
            } else {
                list.style.display = 'none';
                event.target.textContent = isIngredients ? 'Ingredients ▼' : 'Steps ▼';
            }
        }
    }

    function handleFavoriteClick(event) {
        if (event.target.classList.contains('favorite-btn')) {
            const recipeId = parseInt(event.target.dataset.recipeId);
            toggleFavorite(recipeId);
        }
    }

    const debouncedSearch = debounce(() => {
        searchQuery = searchInput.value;
        updateDisplay();
        clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    }, 300);

    function handleSearchInput() {
        debouncedSearch();
    }

    function handleClearSearch() {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        updateDisplay();
    }

    // =====================================
    // EVENT LISTENERS SETUP
    // =====================================

    function setupEventListeners() {
        // Filter and sort buttons
        document.querySelector('.filter-buttons').addEventListener('click', handleFilterClick);
        document.querySelector('.sort-buttons').addEventListener('click', handleSortClick);

        // Recipe container for toggles and favorites
        recipeContainer.addEventListener('click', handleToggleClick);
        recipeContainer.addEventListener('click', handleFavoriteClick);

        // Search functionality
        searchInput.addEventListener('input', handleSearchInput);
        clearSearchBtn.addEventListener('click', handleClearSearch);
    }

    // =====================================
    // INITIALIZATION
    // =====================================

    function init() {
        console.log('Recipe Finder initialized with', recipes.length, 'recipes');
        setupEventListeners();
        updateDisplay();
    }

    // Start the application
    init();

})();
