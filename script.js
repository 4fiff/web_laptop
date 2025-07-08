// ===================================================================================
// PUSAT PENGATURAN WEBSITE
// ===================================================================================
const CONFIG = {
    PAYMENT_TIMER_MINUTES: 60,
    LOW_STOCK_THRESHOLD: 3,
    BANK_NAME: 'Bank Rakyat Indonesia (BRI)',
    ACCOUNT_NUMBER: '5699 0101 1018 501',
    ACCOUNT_NAME: 'Arera Vacum Thomas',
    COUPONS: {
        'HAPPYJULY':    { type: 'flat', value: 299000, maxDiscount: null, minPurchase: 0, shippingDiscountPercent: 100, category: 'Semua' },
        'FIRSTUSER':    { type: 'flat', value: 499000, maxDiscount: null, minPurchase: 0, shippingDiscountPercent: 100, category: 'Semua' },
        '2025MACINTOZ': { type: 'flat', value: 399000, maxDiscount: null, minPurchase: 0, shippingDiscountPercent: 100, category: 'Semua' },
        'HAPPYUSER':    { type: 'flat', value: 799000, maxDiscount: null, minPurchase: 0, shippingDiscountPercent: 100, category: 'Semua' },
        'MACINDO10':    { type: 'percent', value: 10, maxDiscount: 1500000, minPurchase: 0, shippingDiscountPercent: 100, category: 'Semua' },
        'MAC20INTOZ':   { type: 'percent', value: 20, maxDiscount: 1000000, minPurchase: 0, shippingDiscountPercent: 100, category: 'Semua' },
        'ILOVEMACINTOZ':{ type: 'percent', value: 50, maxDiscount: 1000000, minPurchase: 0, shippingDiscountPercent: 100, category: 'Semua' },
        'MACINTOZPRO':  { type: 'percent', value: 7,  maxDiscount: 5000000, minPurchase: 25000000, shippingDiscountPercent: 100, category: 'Semua' },
        'MACINTOZAIR':  { type: 'percent', value: 5,  maxDiscount: 2500000, minPurchase: 15000000, shippingDiscountPercent: 100, category: 'Semua' },
        'TRUSTMACINTOZ':{ type: 'percent', value: 10, maxDiscount: 5000000, minPurchase: 30000000, shippingDiscountPercent: 100, category: 'Semua' }
    },
    SHIPPING_SERVICES: ['JNE', 'J&T', 'Si Cepat'],
    SHIPPING_COSTS: {
        'Sumatra': 151000, 'Jawa': 178000, 'Kalimantan': 182000, 'Sulawesi': 202000, 'Bali': 238000, 'Nusa Tenggara': 268000, 'Maluku': 263000, 'Papua': 335000, 'Bangka Belitung': 124000
    },
    PROVINCES: {
        'Aceh': 'Sumatra', 'Sumatera Utara': 'Sumatra', 'Sumatera Barat': 'Sumatra', 'Riau': 'Sumatra', 'Kepulauan Riau': 'Sumatra', 'Jambi': 'Sumatra', 'Bengkulu': 'Sumatra', 'Sumatera Selatan': 'Sumatra', 'Kepulauan Bangka Belitung': 'Bangka Belitung', 'Lampung': 'Sumatra',
        'DKI Jakarta': 'Jawa', 'Jawa Barat': 'Jawa', 'Banten': 'Jawa', 'Jawa Tengah': 'Jawa', 'DI Yogyakarta': 'Jawa', 'Jawa Timur': 'Jawa',
        'Bali': 'Bali', 'Nusa Tenggara Barat': 'Nusa Tenggara', 'Nusa Tenggara Timur': 'Nusa Tenggara',
        'Kalimantan Barat': 'Kalimantan', 'Kalimantan Tengah': 'Kalimantan', 'Kalimantan Selatan': 'Kalimantan', 'Kalimantan Timur': 'Kalimantan', 'Kalimantan Utara': 'Kalimantan',
        'Sulawesi Utara': 'Sulawesi', 'Gorontalo': 'Sulawesi', 'Sulawesi Tengah': 'Sulawesi', 'Sulawesi Barat': 'Sulawesi', 'Sulawesi Selatan': 'Sulawesi', 'Sulawesi Tenggara': 'Sulawesi',
        'Maluku': 'Maluku', 'Maluku Utara': 'Maluku',
        'Papua Barat': 'Papua', 'Papua': 'Papua', 'Papua Tengah': 'Papua', 'Papua Pegunungan': 'Papua', 'Papua Selatan': 'Papua', 'Papua Barat Daya': 'Papua'
    }
};
// ===================================================================================
// AKHIR DARI PUSAT PENGATURAN
// ===================================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- FUNGSI-FUNGSI PEMBANTU ---

    function showCustomToast(message) {
        const oldToast = document.getElementById('custom-toast');
        if (oldToast) { oldToast.remove(); }
        const toast = document.createElement('div');
        toast.id = 'custom-toast';
        toast.className = 'custom-toast';
        toast.innerHTML = `<div class="toast-icon"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4CAF50"></path></svg></div><p>${message}</p>`;
        document.body.appendChild(toast);
        setTimeout(() => { toast.classList.add('show'); }, 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => { if (toast.parentElement) { toast.parentElement.removeChild(toast); } }, 500);
        }, 3000);
    }

    function showConfirmationModal(title, message, confirmText, cancelText) {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.innerHTML = `<div class="modal-box"><h3>${title}</h3><p>${message}</p><div class="modal-actions"><button id="modal-cancel-btn" class="button button-secondary">${cancelText}</button><button id="modal-confirm-btn" class="button">${confirmText}</button></div></div>`;
            document.body.appendChild(overlay);
            setTimeout(() => overlay.classList.add('show'), 10);
            const confirmBtn = document.getElementById('modal-confirm-btn');
            const cancelBtn = document.getElementById('modal-cancel-btn');
            const closeModal = (resolution) => {
                overlay.classList.remove('show');
                setTimeout(() => { document.body.removeChild(overlay); resolve(resolution); }, 300);
            };
            confirmBtn.addEventListener('click', () => closeModal(true));
            cancelBtn.addEventListener('click', () => closeModal(false));
            overlay.addEventListener('click', (event) => {
                if (event.target === overlay) { closeModal(null); }
            });
        });
    }

    // --- LOGIKA UTAMA WEBSITE ---

    let cart = JSON.parse(localStorage.getItem('macintozCart')) || [];
    const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    const saveCart = () => localStorage.setItem('macintozCart', JSON.stringify(cart));
    
    const addToCart = (productData, quantity = 1) => {
        let productToAdd;
        let productImg;

        // Cek apakah yang dikirim adalah objek (varian) atau ID (non-varian)
        if (typeof productData === 'number') {
            productToAdd = products.find(p => p.id === productData);
            if (productToAdd && productToAdd.images) {
                productImg = productToAdd.images[0]; // Ambil gambar pertama untuk produk Mac
            }
        } else {
            productToAdd = productData;
            productImg = productToAdd.img; // Gunakan gambar yang sudah ada untuk varian iPhone
        }

        if (!productToAdd) return;

        if (productToAdd.stock < quantity) {
            alert('Maaf, stok produk tidak mencukupi.');
            return;
        }

        const cartItemId = productToAdd.sku || productToAdd.id;
        const cartItem = cart.find(item => item.id === cartItemId);

        if (cartItem) {
            if ((cartItem.quantity + quantity) <= productToAdd.stock) {
                cartItem.quantity += quantity;
            } else {
                alert('Jumlah di keranjang akan melebihi stok yang tersedia.');
                return;
            }
        } else {
            // Hapus data yang tidak perlu sebelum dimasukkan ke keranjang
            const { images, description, variants, ...productInfo } = productToAdd;
            cart.push({
                ...productInfo,
                id: cartItemId,
                img: productImg, // Gunakan variabel gambar yang sudah disiapkan
                quantity: quantity
            });
        }
        
        saveCart();
        updateSharedUI();
        showCustomToast(`"${productToAdd.name}" ditambahkan ke keranjang`);
    };

    const updateQuantity = (productId, newQuantity) => {
        // Cari item di dalam keranjang. `productId` dari tombol adalah string, jadi kita bandingkan sebagai string.
        const cartItem = cart.find(item => String(item.id) === String(productId));

        if (!cartItem) {
            console.error('Item tidak ditemukan di keranjang untuk diupdate:', productId);
            return;
        }

        // Jika kuantitas baru adalah 0 atau kurang (untuk tombol Hapus atau mengurangi dari 1)
        if (newQuantity <= 0) {
            cart = cart.filter(item => String(item.id) !== String(productId));
        } 
        // Jika kuantitas baru melebihi stok yang TERCATAT di item keranjang
        else if (newQuantity > cartItem.stock) {
            alert(`Stok untuk produk ini hanya tersisa ${cartItem.stock} buah.`);
            cartItem.quantity = cartItem.stock; // Set ke jumlah maksimal
        } 
        // Jika valid, perbarui kuantitasnya
        else {
            cartItem.quantity = newQuantity;
        }

        saveCart();
        renderCartPage(); // Langsung perbarui tampilan halaman keranjang
    };

    const updateSharedUI = () => {
        const cartCount = document.getElementById('cart-count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    };

    const renderProductPage = (category) => {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;

        const searchInput = document.getElementById('search-input');
        const sortSelect = document.getElementById('sort-select');
        const filtersContainer = document.getElementById('filters-container');
        let activeFilters = { model: [], chip: [], size: [], grade: [], iphoneModel: [] };
        
        function createFilters() {
            let filtersHTML = '';
            const categoryProducts = products.filter(p => p.kategori === category);

            if (category === 'Mac') {
                const models = [...new Set(categoryProducts.map(p => p.name.includes('Air') ? 'Air' : 'Pro'))];
                const chips = [...new Set(categoryProducts.flatMap(p => (p.name.match(/(M[1-4]|Intel i[3579])/g) || [])))];
                const sizes = [...new Set(categoryProducts.flatMap(p => (p.name.match(/1[3-6]/g) || [])))];
                const grades = [...new Set(categoryProducts.map(p => p.grade))];
                filtersHTML = `<div class="filter-group"><h4>Model</h4>${models.map(model => `<div class="filter-option"><input type="checkbox" id="model-${model.toLowerCase()}" data-category="model" value="${model}"><label for="model-${model.toLowerCase()}">MacBook ${model}</label></div>`).join('')}</div><div class="filter-group"><h4>Chip</h4>${chips.sort().map(chip => `<div class="filter-option"><input type="checkbox" id="chip-${chip.toLowerCase().replace(' ', '-')}" data-category="chip" value="${chip}"><label for="chip-${chip.toLowerCase().replace(' ', '-')}"">${chip}</label></div>`).join('')}</div><div class="filter-group"><h4>Ukuran Layar</h4>${sizes.sort().map(size => `<div class="filter-option"><input type="checkbox" id="size-${size}" data-category="size" value="${size}"><label for="size-${size}">${size} Inci</label></div>`).join('')}</div><div class="filter-group"><h4>Kondisi</h4>${grades.sort().map(grade => `<div class="filter-option"><input type="checkbox" id="grade-${grade.toLowerCase()}" data-category="grade" value="${grade}"><label for="grade-${grade.toLowerCase()}">${grade === 'Baru' ? 'Baru (BNIB)' : `Grade ${grade}`}</label></div>`).join('')}</div>`;
            } else if (category === 'iPhone') {
                const iphoneModels = [...new Set(categoryProducts.map(p => p.name))];
                filtersHTML = `<div class="filter-group"><h4>Model iPhone</h4>${iphoneModels.sort().map(model => `<div class="filter-option"><input type="checkbox" id="model-${model.replace(/\s+/g, '-').toLowerCase()}" data-category="iphoneModel" value="${model}"><label for="model-${model.replace(/\s+/g, '-').toLowerCase()}">${model}</label></div>`).join('')}</div>`;
            }
            
            filtersContainer.innerHTML = filtersHTML;
            document.querySelectorAll('#filters-container input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const filterCategory = e.target.dataset.category;
                    const value = e.target.value;
                    if (e.target.checked) {
                        activeFilters[filterCategory].push(value);
                    } else {
                        activeFilters[filterCategory] = activeFilters[filterCategory].filter(item => item !== value);
                    }
                    displayProducts();
                });
            });
        }
        
        function displayProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            const sortOrder = sortSelect.value;
            let processedProducts = products.filter(p => p.kategori === category);

            Object.keys(activeFilters).forEach(filterCategory => {
                if (activeFilters[filterCategory].length > 0) {
                    processedProducts = processedProducts.filter(product => {
                        return activeFilters[filterCategory].some(filterValue => {
                            if (filterCategory === 'grade') { return product.grade === filterValue; }
                            if (filterCategory === 'iphoneModel') { return product.name === filterValue; }
                            return product.name.includes(filterValue);
                        });
                    });
                }
            });

            if (searchTerm) {
                processedProducts = processedProducts.filter(product => product.name.toLowerCase().includes(searchTerm));
            }

            if (sortOrder === 'price-asc') {
                processedProducts.sort((a, b) => (a.basePrice || a.price) - (b.basePrice || b.price));
            } else if (sortOrder === 'price-desc') {
                processedProducts.sort((a, b) => (b.basePrice || b.price) - (a.basePrice || a.price));
            }

            productGrid.innerHTML = '';
            if (processedProducts.length === 0) {
                productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">Tidak ada produk yang cocok dengan kriteria Anda.</p>';
            } else {
                processedProducts.forEach(product => {
                    const card = document.createElement('a');
                    card.href = `/detail-produk.html?id=${product.id}`;
                    card.className = 'product-card';
                    card.style.textDecoration = 'none';
                    card.style.color = 'inherit';
                    
                    const isVariant = !!product.variants;
                    const displayPrice = isVariant ? product.basePrice : product.price;
                    const displayImage = isVariant ? product.images[product.variants[0].color][0] : product.images[0];
                    const displaySpecs = isVariant ? `${product.variants.length} pilihan warna & kapasitas` : product.specs;
                    const gradeText = product.grade ? (product.grade === 'Baru' ? 'BARU' : `GRADE ${product.grade}`) : '';
                    const gradeBadgeClass = product.grade ? `product-grade-badge grade-${product.grade.toLowerCase()}` : '';
                    const gradeBadge = product.grade ? `<div class="${gradeBadgeClass}">${gradeText}</div>` : '';
                    const buttonText = isVariant ? 'Lihat Opsi' : 'Lihat Detail';

                    if(isVariant){
                         card.innerHTML = `<img src="/${displayImage}" alt="${product.name}"><div><h3 class="product-name">${product.name}</h3><p class="product-specs">${displaySpecs}</p><p class="product-price">Mulai dari ${formatRupiah(displayPrice)}</p><div class="button">${buttonText}</div></div>`;
                    } else {
                        let stockText = product.stock > 0 ? `<span class="${product.stock <= CONFIG.LOW_STOCK_THRESHOLD ? 'stock-status low-stock' : 'stock-status'}">Sisa stok: ${product.stock}</span>` : `<span class="stock-status">Stok Habis</span>`;
                        let soldText = product.sold > 0 ? `<span class="sold-info"><i class="fas fa-fire"></i> ${product.sold} terjual</span>` : '';
                        const inventoryHTML = `<div class="inventory-info">${stockText}${soldText ? ` | ${soldText}` : ''}</div>`;
                        card.innerHTML = `<img src="/${product.images[0]}" alt="${product.name}"><div>${gradeBadge}<h3 class="product-name">${product.name}</h3><p class="product-specs">${product.specs}</p>${inventoryHTML}<p class="product-price">${formatRupiah(displayPrice)}</p>${product.stock > 0 ? `<div class="button">${buttonText}</div>` : `<div class="button button-secondary" style="cursor:not-allowed;">Stok Kosong</div>`}</div>`;
                    }
                    productGrid.appendChild(card);
                });
            }
        }

        createFilters();
        searchInput.addEventListener('input', displayProducts);
        sortSelect.addEventListener('change', displayProducts);
        displayProducts();
    };

    const renderDetailPage = () => {
        const contentDiv = document.getElementById('product-detail-content');
        if (!contentDiv) return;

        const notFoundDiv = document.getElementById('product-not-found');
        const params = new URLSearchParams(window.location.search);
        const productId = parseInt(params.get('id'));

        if (isNaN(productId)) {
            contentDiv.style.display = 'none';
            notFoundDiv.style.display = 'block';
            return;
        }

        const product = products.find(p => p.id === productId);

        if (!product) {
            contentDiv.style.display = 'none';
            notFoundDiv.style.display = 'block';
            return;
        }

        if (product.variants && product.variants.length > 0) {
            renderVariantProduct(product);
        } else {
            renderStandardProduct(product);
        }
    };
    
    function renderStandardProduct(product) {
        const variantOptionsContainer = document.getElementById('variant-options-container');
        if (variantOptionsContainer) variantOptionsContainer.style.display = 'none';

        document.title = `${product.name} - Macintoz`;
        document.getElementById('detail-name').textContent = product.name;

        const gradeElement = document.getElementById('detail-grade');
        if (gradeElement) {
            const gradeText = product.grade === 'Baru' ? 'BARU' : `GRADE ${product.grade}`;
            const gradeBadgeClass = `product-grade-badge grade-${product.grade.toLowerCase()}`;
            const gradeDescriptions = { 'A': 'Seperti Baru', 'B': 'Sangat Baik', 'C': 'Baik' };
            let gradeDescriptionText = (product.grade === 'Baru') ? 'Brand New In Box (BNIB)' : `Kondisi: ${gradeDescriptions[product.grade] || product.grade}`;
            gradeElement.innerHTML = `<div class="${gradeBadgeClass}">${gradeText}</div><span>${gradeDescriptionText}</span>`;
        }
        
        document.getElementById('detail-price').textContent = formatRupiah(product.price);
        document.getElementById('detail-sku').textContent = `SKU: ${product.sku}`;
        
        const descriptionContainer = document.getElementById('detail-description-container');
        descriptionContainer.innerHTML = '';
        const introParagraph = document.createElement('p');
        introParagraph.textContent = product.description.intro;
        descriptionContainer.appendChild(introParagraph);

        if (product.description.specs && product.description.specs.length > 0) {
            const specsSection = document.createElement('div');
            specsSection.className = 'detail-description-section';
            const specsHeader = document.createElement('h4');
            specsHeader.textContent = 'Spesifikasi Detail:';
            const specsList = document.createElement('ul');
            product.description.specs.forEach(specText => {
                const listItem = document.createElement('li');
                listItem.textContent = specText;
                specsList.appendChild(listItem);
            });
            specsSection.appendChild(specsHeader);
            specsSection.appendChild(specsList);
            descriptionContainer.appendChild(specsSection);
        }

        const prosConsContainer = document.getElementById('detail-pros-cons-container');
        prosConsContainer.innerHTML = '';
        if (product.pros && product.pros.length > 0) {
            const prosSection = document.createElement('div');
            prosSection.id = 'detail-pros';
            prosSection.className = 'detail-pros-cons-section';
            const prosHeader = document.createElement('h4');
            prosHeader.textContent = 'Kelebihan Produk';
            const prosList = document.createElement('ul');
            product.pros.forEach(text => { const li = document.createElement('li'); li.textContent = text; prosList.appendChild(li); });
            prosSection.appendChild(prosHeader);
            prosSection.appendChild(prosList);
            prosConsContainer.appendChild(prosSection);
        }
        if (product.cons && product.cons.length > 0) {
            const consSection = document.createElement('div');
            consSection.id = 'detail-cons';
            consSection.className = 'detail-pros-cons-section';
            const consHeader = document.createElement('h4');
            consHeader.textContent = 'Kekurangan Produk';
            const consList = document.createElement('ul');
            product.cons.forEach(text => { const li = document.createElement('li'); li.textContent = text; consList.appendChild(li); });
            consSection.appendChild(consHeader);
            consSection.appendChild(consList);
            prosConsContainer.appendChild(consSection);
        }

        const inTheBoxContainer = document.getElementById('detail-in-the-box-container');
        inTheBoxContainer.innerHTML = '';
        if (product.inTheBox && product.inTheBox.length > 0) {
            const inTheBoxSection = document.createElement('div');
            inTheBoxSection.className = 'detail-description-section';
            const inTheBoxHeader = document.createElement('h4');
            inTheBoxHeader.textContent = 'Kelengkapan dalam Kotak';
            const inTheBoxList = document.createElement('ul');
            product.inTheBox.forEach(text => { const li = document.createElement('li'); li.textContent = text; inTheBoxList.appendChild(li); });
            inTheBoxSection.appendChild(inTheBoxHeader);
            inTheBoxSection.appendChild(inTheBoxList);
            inTheBoxContainer.appendChild(inTheBoxSection);
        }
        
        const stockElement = document.getElementById('detail-stock');
        let stockText = product.stock > 0 ? `Ketersediaan: Sisa ${product.stock} unit` : `Ketersediaan: Stok Habis`;
        stockElement.textContent = stockText;
        if (product.stock <= CONFIG.LOW_STOCK_THRESHOLD) { stockElement.classList.add('low-stock'); } 
        else { stockElement.classList.remove('low-stock'); }
        if (product.sold > 0) {
            stockElement.innerHTML += ` &bull; <span class="sold-info"><i class="fas fa-fire"></i> ${product.sold} terjual</span>`;
        }

        const addToCartBtn = document.getElementById('detail-add-to-cart-btn');
        if (product.stock > 0) {
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = 'Tambah ke Keranjang';
            addToCartBtn.onclick = () => addToCart(product.id);
        } else {
            addToCartBtn.disabled = true;
            addToCartBtn.textContent = 'Stok Kosong';
            addToCartBtn.onclick = null;
        }

        const imgElement = document.getElementById('detail-img');
        imgElement.src = `/${product.images[0]}`;
        // Logika slider dan produk terkait bisa ditambahkan kembali di sini jika diperlukan
    }

    function renderVariantProduct(product) {
        const variantOptionsContainer = document.getElementById('variant-options-container');
        if (variantOptionsContainer) variantOptionsContainer.style.display = 'block';

        const gradeElement = document.getElementById('detail-grade');
        if(gradeElement) gradeElement.innerHTML = '';
        
        document.title = `${product.name} - Macintoz`;
        
        let selectedColor = product.variants[0].color;
        let selectedStorage = product.variants[0].storage;

        const nameEl = document.getElementById('detail-name');
        const priceEl = document.getElementById('detail-price');
        const skuEl = document.getElementById('detail-sku');
        const stockEl = document.getElementById('detail-stock');
        const colorSelector = document.getElementById('color-selector');
        const storageSelector = document.getElementById('storage-selector');
        const selectedColorNameEl = document.getElementById('selected-color-name');
        const addToCartBtn = document.getElementById('detail-add-to-cart-btn');
        const imgElement = document.getElementById('detail-img');
        const dotsContainer = document.getElementById('slider-dots');

        function updateDisplay() {
            const currentVariant = product.variants.find(v => v.color === selectedColor && v.storage === selectedStorage);
            if (!currentVariant) return;

            const finalPrice = product.basePrice + currentVariant.priceModifier;
            priceEl.textContent = formatRupiah(finalPrice);
            skuEl.textContent = `SKU: ${currentVariant.sku}`;
            if (currentVariant.stock > 0) {
                stockEl.textContent = `Ketersediaan: Sisa ${currentVariant.stock} unit`;
                stockEl.className = currentVariant.stock <= CONFIG.LOW_STOCK_THRESHOLD ? 'product-stock low-stock' : 'product-stock';
            } else {
                stockEl.textContent = `Ketersediaan: Stok Habis`;
                stockEl.className = 'product-stock low-stock';
            }
            if (currentVariant.sold > 0) {
                stockEl.innerHTML += ` &bull; <span class="sold-info"><i class="fas fa-fire"></i> ${currentVariant.sold} terjual</span>`;
            } else {
                 const soldInfo = stockEl.querySelector('.sold-info');
                 if(soldInfo) soldInfo.parentElement.innerHTML = stockEl.textContent;
            }

            addToCartBtn.disabled = currentVariant.stock === 0;
            addToCartBtn.textContent = currentVariant.stock > 0 ? 'Tambah ke Keranjang' : 'Stok Kosong';
            addToCartBtn.onclick = () => {
                if(currentVariant.stock > 0) {
                    const itemToAdd = {
                        id: currentVariant.sku, name: `${product.name} (${currentVariant.storage}, ${currentVariant.color})`, price: finalPrice, stock: currentVariant.stock, img: product.images[currentVariant.color] ? product.images[currentVariant.color][0] : ''
                    };
                    addToCart(itemToAdd, 1);
                }
            };
            
            if (product.images[selectedColor]) {
                imgElement.src = `/${product.images[selectedColor][0]}`;
            }
            
            selectedColorNameEl.textContent = selectedColor;
            updateStorageOptions();
            updateColorOptions();
        }

        function updateColorOptions() {
            const uniqueColors = [...new Map(product.variants.map(v => [v.color, v])).values()];
            colorSelector.innerHTML = '';
            uniqueColors.forEach(variant => {
                const swatch = document.createElement('div');
                swatch.className = 'color-swatch';
                swatch.style.backgroundColor = variant.colorHex;
                swatch.title = variant.color;
                if (variant.color === selectedColor) { swatch.classList.add('active'); }
                swatch.addEventListener('click', () => {
                    selectedColor = variant.color;
                    const availableStoragesForColor = product.variants.filter(v => v.color === selectedColor);
                    if (!availableStoragesForColor.some(v => v.storage === selectedStorage)) {
                        selectedStorage = availableStoragesForColor[0].storage;
                    }
                    updateDisplay();
                });
                colorSelector.appendChild(swatch);
            });
        }

        function updateStorageOptions() {
            const allPossibleStorages = [...new Set(product.variants.map(v => v.storage))];
            const availableStoragesForColor = product.variants.filter(v => v.color === selectedColor).map(v => v.storage);
            
            storageSelector.innerHTML = '';
            allPossibleStorages.forEach(storageValue => {
                const option = document.createElement('div');
                option.className = 'storage-option';
                option.textContent = storageValue;

                if (availableStoragesForColor.includes(storageValue)) {
                    option.classList.remove('disabled');
                    option.addEventListener('click', () => {
                        selectedStorage = storageValue;
                        updateDisplay();
                    });
                } else {
                    option.classList.add('disabled');
                }
                if (storageValue === selectedStorage) { option.classList.add('active'); }
                storageSelector.appendChild(option);
            });
        }
        
        nameEl.textContent = product.name;
        document.getElementById('detail-description-container').innerHTML = `<p>${product.description.intro}</p>`;
        // ... (Logika untuk menampilkan pros, cons, dll. bisa ditambahkan di sini jika perlu)
        
        updateDisplay();
        updateColorOptions();
    }
    
    const renderCartPage = () => {
        const itemsList = document.getElementById('cart-items-list');
        if(!itemsList) return;

        const summaryTotalItems = document.getElementById('summary-total-items');
        const summaryTotalPrice = document.getElementById('summary-total-price');
        const emptyCartMsg = document.getElementById('empty-cart-message');
        const cartContent = document.getElementById('cart-page-content');
        
        itemsList.innerHTML = '';
        if (cart.length === 0) {
            emptyCartMsg.style.display = 'block';
            cartContent.style.display = 'none';
            return;
        }

        emptyCartMsg.style.display = 'none';
        cartContent.style.display = 'flex';
        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="/${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.specs || ''}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-increase" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item-btn" data-id="${item.id}">Hapus</button>
                    </div>
                </div>
                <div class="cart-item-price">${formatRupiah(item.price * item.quantity)}</div>
            `;
            itemsList.appendChild(itemEl);
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        summaryTotalItems.textContent = totalItems;
        summaryTotalPrice.textContent = formatRupiah(totalPrice);

        // --- Event Listener yang sudah diperbaiki ---
        document.querySelectorAll('.quantity-decrease').forEach(btn => {
            btn.onclick = e => {
                const id = e.target.dataset.id; // Ambil ID sebagai string
                const currentItem = cart.find(i => String(i.id) === id);
                if (currentItem) {
                    updateQuantity(id, currentItem.quantity - 1);
                }
            }
        });
        document.querySelectorAll('.quantity-increase').forEach(btn => {
            btn.onclick = e => {
                const id = e.target.dataset.id; // Ambil ID sebagai string
                const currentItem = cart.find(i => String(i.id) === id);
                if (currentItem) {
                    updateQuantity(id, currentItem.quantity + 1);
                }
            }
        });
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.onclick = e => {
                if (confirm('Yakin ingin menghapus item ini?')) {
                    const id = e.target.dataset.id; // Ambil ID sebagai string
                    updateQuantity(id, 0);
                }
            }
        });
    };

    const renderCheckoutPage = () => {
        const itemsList = document.getElementById('checkout-items-list');
        if(!itemsList) return;
        const paymentForm = document.getElementById('payment-form');
        const subtotalEl = document.getElementById('checkout-subtotal');
        const totalEl = document.getElementById('checkout-total');
        const discountLine = document.getElementById('discount-line');
        const discountAmountEl = document.getElementById('discount-amount');
        const shippingCostEl = document.getElementById('shipping-cost');
        const couponInput = document.getElementById('coupon-code');
        const couponBtn = document.getElementById('apply-coupon-btn');
        const couponMsg = document.getElementById('coupon-message');
        const provinceSelect = document.getElementById('province');
        const shippingServiceSelect = document.getElementById('shipping-service');
        const taxInvoiceCheckbox = document.getElementById('request-tax-invoice');
        const taxInvoiceFieldsContainer = document.getElementById('tax-invoice-fields');
        const npwpInputs = taxInvoiceFieldsContainer.querySelectorAll('input');
        let subtotal = 0;
        let flatDiscount = 0;
        let shippingDiscountPercent = 0;
        let shippingCost = 0;
        let appliedCoupon = null;

        function populateSelectOptions() {
            const provinceNames = Object.keys(CONFIG.PROVINCES);
            provinceNames.sort().forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                provinceSelect.appendChild(option);
            });
            CONFIG.SHIPPING_SERVICES.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                shippingServiceSelect.appendChild(option);
            });
        }

        function renderTotals() {
            subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const actualShippingDiscount = shippingCost * (shippingDiscountPercent / 100);
            const finalShippingCost = shippingCost - actualShippingDiscount;
            const total = subtotal - flatDiscount + finalShippingCost;
            subtotalEl.textContent = formatRupiah(subtotal);
            if (shippingCost > 0) {
                shippingCostEl.textContent = formatRupiah(finalShippingCost);
                const existingDiscountSpan = shippingCostEl.querySelector('.discount');
                if(existingDiscountSpan) existingDiscountSpan.remove();
                if (actualShippingDiscount > 0) {
                    shippingCostEl.innerHTML += ` <span class="discount" style="font-size: 12px; color: #008a00;">(Diskon Ongkir)</span>`;
                }
            } else {
                shippingCostEl.textContent = 'Pilih provinsi';
            }
            if (flatDiscount > 0) {
                discountAmountEl.textContent = `- ${formatRupiah(flatDiscount)}`;
                discountLine.style.display = 'flex';
            } else {
                discountLine.style.display = 'none';
            }
            totalEl.textContent = formatRupiah(total > 0 ? total : 0);
        }

        function applyCoupon() {
            const code = couponInput.value.trim().toUpperCase();
            const couponData = CONFIG.COUPONS[code];
            if (!couponData) {
                couponMsg.textContent = 'Kode kupon tidak valid.';
                couponMsg.className = 'error';
                return;
            }
            let eligibleSubtotal = (couponData.category === 'Semua') ? subtotal : cart.filter(item => item.name.toLowerCase().includes(couponData.category.toLowerCase())).reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (eligibleSubtotal < couponData.minPurchase) {
                couponMsg.textContent = `Minimum belanja ${formatRupiah(couponData.minPurchase)} untuk produk yang sesuai.`;
                couponMsg.className = 'error';
                return;
            }
            if (eligibleSubtotal === 0 && couponData.category !== 'Semua') {
                couponMsg.textContent = `Kupon ini hanya berlaku untuk produk kategori '${couponData.category}'.`;
                couponMsg.className = 'error';
                return;
            }
            let calculatedDiscount = 0;
            if (couponData.type === 'flat') {
                calculatedDiscount = couponData.value;
            } else if (couponData.type === 'percent') {
                const rawDiscount = eligibleSubtotal * (couponData.value / 100);
                calculatedDiscount = Math.min(rawDiscount, couponData.maxDiscount);
            }
            flatDiscount = calculatedDiscount;
            shippingDiscountPercent = couponData.shippingDiscountPercent;
            appliedCoupon = code;
            let successMsg = `Kode "${code}" diterapkan! Diskon barang ${formatRupiah(flatDiscount)}`;
            if (shippingDiscountPercent === 100) { successMsg += ` & Gratis Ongkir.`; }
            couponMsg.textContent = successMsg;
            couponMsg.className = 'success';
            couponInput.disabled = true;
            couponBtn.textContent = 'Cancel';
            couponBtn.classList.add('cancel');
            renderTotals();
        }
        
        function cancelCoupon() {
            flatDiscount = 0;
            shippingDiscountPercent = 0;
            appliedCoupon = null;
            couponMsg.textContent = '';
            couponInput.value = '';
            couponInput.disabled = false;
            couponBtn.textContent = 'Submit';
            couponBtn.classList.remove('cancel');
            renderTotals();
        }

        function proceedToPayment() {
            const finalShippingCost = shippingCost * (1 - shippingDiscountPercent / 100);
            const finalTotal = subtotal - flatDiscount + finalShippingCost;
            const uniqueCode = Math.floor(100 + Math.random() * 900);
            const paymentEndTime = new Date().getTime() + CONFIG.PAYMENT_TIMER_MINUTES * 60 * 1000;

            const shippingInfo = {
                email: document.getElementById('email').value,
                name: document.getElementById('full-name').value,
                province: document.getElementById('province').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postal-code').value,
                address: document.getElementById('address').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('shipping-service').value
            };
            
            const paymentData = { 
                totalPrice: finalTotal > 0 ? finalTotal : 0, 
                code: uniqueCode, 
                endTime: paymentEndTime,
                shippingInfo: shippingInfo // <-- Simpan info pengiriman
            };

            

            localStorage.setItem('paymentData', JSON.stringify(paymentData));
            cart = [];
            saveCart();
            updateSharedUI();
            window.location.href = '/cara-bayar.html';
        }

        function setupEventListeners() {
            provinceSelect.addEventListener('change', () => {
                const selectedProvince = provinceSelect.value;
                const zone = CONFIG.PROVINCES[selectedProvince];
                shippingCost = CONFIG.SHIPPING_COSTS[zone] || 0;
                renderTotals();
            });
            couponBtn.addEventListener('click', () => {
                if (appliedCoupon) { cancelCoupon(); } 
                else { applyCoupon(); }
            });
            taxInvoiceCheckbox.addEventListener('change', () => {
                if (taxInvoiceCheckbox.checked) {
                    taxInvoiceFieldsContainer.classList.add('show');
                    npwpInputs.forEach(input => input.required = true);
                } else {
                    taxInvoiceFieldsContainer.classList.remove('show');
                    npwpInputs.forEach(input => {
                        input.required = false;
                        input.value = '';
                    });
                }
            });
            paymentForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const existingPayment = localStorage.getItem('paymentData');
                if (existingPayment) {
                    const userChoice = await showConfirmationModal('Pesanan Tertunda Ditemukan', 'Anda memiliki pesanan yang belum dibayar. Melanjutkan akan membatalkan pesanan lama. Apa yang ingin Anda lakukan?', 'Buat Pesanan Baru', 'Lihat Pesanan Lama');
                    if (userChoice === true) {
                        proceedToPayment();
                    } else if (userChoice === false) {
                        window.location.href = 'cara-bayar.html';
                    }
                } else {
                    proceedToPayment();
                }
            });
        }
        
        populateSelectOptions();
        renderTotals();
        setupEventListeners();
    };

    const renderCaraBayarPage = () => {
        const paymentDataString = localStorage.getItem('paymentData');
        if (!paymentDataString) {
            alert('Data pembayaran tidak ditemukan atau sudah kedaluwarsa. Silakan ulangi dari keranjang.');
            window.location.href = 'keranjang.html';
            return;
        }
        const paymentData = JSON.parse(paymentDataString);
        const finalAmount = paymentData.totalPrice + paymentData.code;
        document.getElementById('final-amount').textContent = formatRupiah(finalAmount);
        document.getElementById('unique-code').textContent = paymentData.code;
        document.getElementById('bank-name').textContent = CONFIG.BANK_NAME;
        document.getElementById('account-number').textContent = CONFIG.ACCOUNT_NUMBER;
        document.getElementById('account-name').textContent = CONFIG.ACCOUNT_NAME;
        
        if (paymentData.shippingInfo) {
            const info = paymentData.shippingInfo;
            document.getElementById('summary-email').textContent = info.email;
            document.getElementById('summary-name').textContent = info.name;
            document.getElementById('summary-address').textContent = `${info.address}, ${info.city}, ${info.province}, ${info.postalCode}`;
            document.getElementById('summary-shipping-service').textContent = info.service;
        }

        const cancelBtn = document.getElementById('cancel-order-btn');
        if(cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                if (confirm('Apakah Anda yakin ingin membatalkan pesanan ini? Sesi pembayaran Anda akan dihapus.')) {
                    localStorage.removeItem('paymentData');
                    alert('Pesanan telah berhasil dibatalkan.');
                    window.location.href = 'index.html'; // Arahkan ke halaman utama
                }
            });
        }
        
        const timerDisplay = document.getElementById('timer-display');
        const paymentDetailsWrapper = document.getElementById('payment-details-wrapper');
        const timeUpMessage = document.getElementById('time-up-message');
        let countdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = paymentData.endTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (timerDisplay) {
                timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
            if (distance < 0) {
                clearInterval(countdown);
                if (timerDisplay) { timerDisplay.textContent = "00:00"; }
                if (paymentDetailsWrapper) { paymentDetailsWrapper.style.display = 'none'; }
                if (timeUpMessage) { timeUpMessage.style.display = 'block'; }
                localStorage.removeItem('paymentData');
            }
        }, 1000);
    };
    
    function initializeReviewSlider() {
        const sliderContainer = document.querySelector('.review-slider-container');
        if (!sliderContainer) return;
        const track = document.querySelector('.review-slider-track');
        const cards = Array.from(track.children);
        if (cards.length === 0) return;
        let imagesLoaded = 0;
        const images = track.querySelectorAll('img');
        if (images.length === 0) { startSlider(); return; }
        images.forEach(image => {
            image.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) { startSlider(); }
            };
            if(image.complete) {
                imagesLoaded++;
                 if (imagesLoaded === images.length) { startSlider(); }
            }
        });
        function startSlider() {
            const cardWidth = cards[0].offsetWidth + 30;
            cards.forEach(card => { const clone = card.cloneNode(true); track.appendChild(clone); });
            let position = 0;
            track.style.width = `${cardWidth * cards.length * 2}px`;
            function slide() {
                position -= 1;
                if (Math.abs(position) >= cardWidth * cards.length) { position = 0; }
                track.style.transform = `translateX(${position}px)`;
                requestAnimationFrame(slide);
            }
            requestAnimationFrame(slide);
        }
    }
    
    function initializeNavbar() {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileMenu = document.getElementById('mobile-menu-overlay');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        if (hamburgerBtn && mobileMenu && closeMenuBtn) {
            hamburgerBtn.addEventListener('click', () => { mobileMenu.classList.add('show'); });
            closeMenuBtn.addEventListener('click', () => { mobileMenu.classList.remove('show'); });
        }
    }

    function checkPendingPayment() {
        const paymentDataString = localStorage.getItem('paymentData');
        const body = document.querySelector('body');
        if (paymentDataString) {
            const paymentData = JSON.parse(paymentDataString);
            if (new Date().getTime() > paymentData.endTime) {
                localStorage.removeItem('paymentData');
                return;
            }
            const onPaymentPage = window.location.pathname.includes('cara-bayar.html');
            if (!onPaymentPage) {
                const banner = document.createElement('div');
                banner.className = 'pending-payment-banner';
                banner.innerHTML = `<span>Anda memiliki pembayaran yang belum selesai.</span><a href="/cara-bayar.html">Lihat Detail Pembayaran</a><button class="cancel-btn">Batalkan Pesanan</button>`;
                body.prepend(banner);
                banner.querySelector('.cancel-btn').addEventListener('click', () => {
                    if(confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
                        localStorage.removeItem('paymentData');
                        banner.remove();
                        alert('Pesanan telah dibatalkan.');
                    }
                });
            }
        }
    }
    
    function initializeVideoControls() {
        const video = document.getElementById('showcase-video');
        const muteBtn = document.getElementById('mute-btn');
        if (!video || !muteBtn) { return; }
        function updateMuteButtonIcon() {
            if (video.muted) { muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; } 
            else { muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>'; }
        }
        muteBtn.addEventListener('click', () => { video.muted = !video.muted; updateMuteButtonIcon(); });
        updateMuteButtonIcon();
    }

    const initializeApp = () => {
        checkPendingPayment();
        updateSharedUI();
        initializeNavbar();
        const path = window.location.pathname;
        if (path.includes('/product/buy-macbook')) { renderProductPage('Mac'); }
        else if (path.includes('/product/buy-iphone')) {renderProductPage('iPhone');} 
        else if (path.includes('/detail-produk')) { renderDetailPage(); } 
        else if (path.includes('/keranjang')) { renderCartPage(); } 
        else if (path.includes('/pembayaran')) { renderCheckoutPage(); } 
        else if (path.includes('/cara-bayar')) { renderCaraBayarPage(); } 
        else if (path.endsWith('/') || path.includes('/index.html')) {
            initializeReviewSlider();
            initializeVideoControls();
        }
    };

    initializeApp();
});