// ===================================================================================
// PUSAT PENGATURAN WEBSITE
// ===================================================================================
const CONFIG = {
    PAYMENT_TIMER_MINUTES: 15,
    LOW_STOCK_THRESHOLD: 3,
    BANK_NAME: 'Bank Rakyat Indonesia (BRI)',
    ACCOUNT_NUMBER: '85238832582',
    ACCOUNT_NAME: 'Arera Vacuum Thomas',
    COUPONS: {
        'HAPPYJULY':    { flatDiscount: 299000, shippingDiscountPercent: 0 },
        'FIRSTUSER':    { flatDiscount: 499000, shippingDiscountPercent: 0 },
        '2025MACINTOZ': { flatDiscount: 399000, shippingDiscountPercent: 0 },
        'MAC2025INTOZ': { flatDiscount: 399000, shippingDiscountPercent: 100 },
        'INDOMAC':      { flatDiscount: 499000, shippingDiscountPercent: 100 },
        'HAPPYUSER':    { flatDiscount: 799000, shippingDiscountPercent: 100 }
    },
    SHIPPING_SERVICES: ['JNE', 'J&T', 'Si Cepat'],
    SHIPPING_COSTS: {
        'Sumatra': 151000,
        'Jawa': 178000,
        'Kalimantan': 182000,
        'Sulawesi': 202000,
        'Bali': 238000,
        'Nusa Tenggara': 268000,
        'Maluku': 263000,
        'Papua': 335000,
        'Bangka Belitung': 124000
    },
    PROVINCES: {
        'Aceh': 'Sumatra', 'Sumatera Utara': 'Sumatra', 'Sumatera Barat': 'Sumatra', 'Riau': 'Sumatra', 'Kepulauan Riau': 'Sumatra', 'Jambi': 'Sumatra', 'Bengkulu': 'Sumatra', 'Sumatera Selatan': 'Sumatra', 'Kepulauan Bangka Belitung': 'Bangka Belitung', 'Lampung': 'Sumatra',
        'DKI Jakarta': 'Jawa', 'Jawa Barat': 'Jawa', 'Banten': 'Jawa', 'Jawa Tengah': 'Jawa', 'DI Yogyakarta': 'Jawa', 'Jawa Timur': 'Jawa',
        'Bali': 'Bali',
        'Nusa Tenggara Barat': 'Nusa Tenggara', 'Nusa Tenggara Timur': 'Nusa Tenggara',
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
    
    // Fungsi untuk menampilkan notifikasi custom yang cantik
    function showCustomToast(message) {
        const oldToast = document.getElementById('custom-toast');
        if (oldToast) {
            oldToast.remove();
        }
        const toast = document.createElement('div');
        toast.id = 'custom-toast';
        toast.className = 'custom-toast';
        toast.innerHTML = `
            <div class="toast-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4CAF50"></path>
                </svg>
            </div>
            <p>${message}</p>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.parentElement.removeChild(toast);
                }
            }, 500);
        }, 3000);
    }

    // TAMBAHKAN FUNGSI BARU INI
    function initializeNavbar() {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileMenu = document.getElementById('mobile-menu-overlay');
        const closeMenuBtn = document.getElementById('close-menu-btn');

        if (hamburgerBtn && mobileMenu && closeMenuBtn) {
            hamburgerBtn.addEventListener('click', () => {
                mobileMenu.classList.add('show');
            });

            closeMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
            });
        }
    }

    // --- DATABASE PRODUK (Dengan Grade, Deskripsi dan SKU unik) ---
    const products = [
        { id: 1, name: 'MacBook Air 13" M1', specs: '8GB RAM, 256GB SSD (2020)', price: 12500000, stock: 10, grade: 'A', sku: 'M1A8256G20', images: ['images/1.jpg', 'images/2.jpg', 'images/1.jpg', 'images/2.jpg'], description: { intro: 'Pilihan sempurna untuk portabilitas dan performa sehari-hari. Chip M1 memberikan kecepatan luar biasa dan daya tahan baterai hingga 18 jam.', specs: [ 'Chip: Apple M1 (8-core CPU, 7-core GPU)', 'Layar: 13.3-inch Retina display with True Tone', 'Memori: 8GB RAM terpadu', 'Penyimpanan: 256GB SSD', 'Kamera: 720p FaceTime HD camera' ], condition: 'Kondisi fisik 98% mulus, bekas pemakaian wajar. Kesehatan baterai di atas 90%.' } },
        { id: 2, name: 'MacBook Air 13" M1', specs: '16GB RAM, 512GB SSD (2020)', price: 15800000, stock: 3, grade: 'A', sku: 'M1A16512G20', images: ['images/2.jpg', 'images/4.jpg', 'images/5.jpg'], description: { intro: 'Versi upgrade dari MacBook Air M1 dengan RAM 16GB untuk multitasking yang lebih lancar dan penyimpanan 512GB yang lebih lega.', specs: [ 'Chip: Apple M1 (8-core CPU, 7-core GPU)', 'Layar: 13.3-inch Retina display', 'Memori: 16GB RAM terpadu'], condition: 'Kondisi fisik 97% mulus.' } },
        { id: 3, name: 'MacBook Pro 14" M2 Pro', specs: '16GB RAM, 512GB SSD (2023)', price: 29800000, stock: 8, grade: 'A', sku: 'M2PP1416512G23', images: ['images/3.jpg', 'images/2.jpg', 'images/1.jpg'], description: { intro: 'Generasi berikutnya dari performa pro. Chip M2 Pro membawa CPU dan GPU yang lebih cepat...', specs: ['Chip: Apple M2 Pro', 'Layar: 14.2-inch Liquid Retina XDR', 'Memori: 16GB RAM'], condition: 'Garansi Macintoz 1 tahun.' } },
        { id: 4, name: 'MacBook Air 13" M2', specs: '16GB RAM, 1TB SSD (2022)', price: 21500000, stock: 0, grade: 'A', sku: 'M2A161TBG22', images: ['https://placehold.co/600x600/e3e4e6/333?text=MacBook+Air+M2+13'], description: { intro: 'Spesifikasi maksimal untuk MacBook Air M2. Dengan RAM 16GB dan SSD 1TB, laptop ini siap menangani tugas berat tanpa hambatan.', specs: ['Chip: Apple M2', 'Layar: 13.6-inch Liquid Retina', 'Memori: 16GB RAM', 'Penyimpanan: 1TB SSD'], condition: 'Stok habis. Silakan hubungi kami untuk pre-order.' } },
        { id: 5, name: 'MacBook Air 13" M3', specs: '8GB RAM, 256GB SSD (2024)', price: 18500000, stock: 12, grade: 'A', sku: 'M3A8256G24', images: ['https://placehold.co/600x600/dcdcdc/333?text=MacBook+Air+M3+13'], description: { intro: 'Ditenagai chip M3 terbaru, MacBook Air ini menawarkan lompatan besar dalam performa grafis dan kemampuan AI, menjadikannya laptop super portabel yang sangat bertenaga.', specs: ['Chip: Apple M3', 'Layar: 13.6-inch Liquid Retina', 'Memori: 8GB RAM'], condition: 'Produk baru, garansi resmi Macintoz 1 tahun.' } },
        { id: 6, name: 'MacBook Air 15" M2', specs: '8GB RAM, 256GB SSD (2023)', price: 19200000, stock: 7, grade: 'A', sku: 'M2A158256G23', images: ['https://placehold.co/600x600/e3e4e6/333?text=MacBook+Air+M2+15'], description: { intro: 'Layar Liquid Retina 15 inci yang luas memberikan ruang kerja lebih banyak. Nikmati semua kelebihan MacBook Air M2 dalam ukuran yang lebih besar namun tetap sangat tipis.', specs: ['Chip: Apple M2', 'Layar: 15.3-inch Liquid Retina', 'Memori: 8GB RAM'], condition: 'Kondisi 99% mulus, jarang dipakai.' } },
        { id: 7, name: 'MacBook Air 15" M2', specs: '16GB RAM, 512GB SSD (2023)', price: 22800000, stock: 4, grade: 'B', sku: 'M2A1516512G23', images: ['https://placehold.co/600x600/e3e4e6/333?text=MacBook+Air+M2+15'], description: { intro: 'Kombinasi layar besar 15 inci dengan memori dan penyimpanan yang ditingkatkan, ideal untuk mereka yang menginginkan produktivitas maksimal tanpa kompromi.', specs: ['Chip: Apple M2', 'Layar: 15.3-inch Liquid Retina', 'Memori: 16GB RAM', 'Penyimpanan: 512GB SSD'], condition: 'Ada goresan halus di casing bawah.' } },
        { id: 8, name: 'MacBook Air 15" M3', specs: '16GB RAM, 512GB SSD (2024)', price: 25500000, stock: 9, grade: 'A', sku: 'M3A1516512G24', images: ['https://placehold.co/600x600/dcdcdc/333?text=MacBook+Air+M3+15'], description: { intro: 'Performa chip M3 dalam layar 15 inci yang lega. Laptop ini sempurna untuk bekerja dengan beberapa jendela sekaligus, presentasi, atau menikmati hiburan.', specs: ['Chip: Apple M3', 'Layar: 15.3-inch Liquid Retina', 'Memori: 16GB RAM'], condition: 'Kondisi istimewa, battery health 100%.' } },
        { id: 9, name: 'MacBook Pro 13" M2', specs: '8GB RAM, 256GB SSD (2022)', price: 17900000, stock: 2, grade: 'B', sku: 'M2P138256G22', images: ['https://placehold.co/600x600/d1d1d6/333?text=MacBook+Pro+M2+13'], description: { intro: 'Dilengkapi sistem pendingin aktif, MacBook Pro 13 inci M2 mampu mempertahankan performa puncak untuk waktu yang lebih lama. Ideal untuk tugas yang intens.', specs: ['Chip: Apple M2', 'Layar: 13.3-inch Retina Display', 'Fitur: Touch Bar and Touch ID'], condition: 'Fisik 97% mulus.' } },
        { id: 10, name: 'MacBook Pro 13" M2', specs: '16GB RAM, 512GB SSD (2022)', price: 21000000, stock: 3, grade: 'A', sku: 'M2P1316512G22', images: ['https://placehold.co/600x600/d1d1d6/333?text=MacBook+Pro+M2+13'], description: { intro: 'Dengan memori terpadu 16GB, MacBook Pro M2 ini memberikan performa grafis dan pemrosesan yang lebih cepat, cocok untuk editing foto dan video ringan.', specs: ['Chip: Apple M2', 'Memori: 16GB RAM', 'Penyimpanan: 512GB SSD'], condition: 'Sangat terawat.' } },
        { id: 11, name: 'MacBook Pro 14" M1 Pro', specs: '16GB RAM, 512GB SSD (2021)', price: 25000000, stock: 5, grade: 'B', sku: 'M1PP1416512G21', images: ['https://placehold.co/600x600/cccccc/333?text=MacBook+Pro+14+M1Pro'], description: { intro: 'Mesin bertenaga untuk para profesional kreatif. Chip M1 Pro, layar Liquid Retina XDR, dan rangkaian port lengkap menjadikannya studio portabel yang andal.', specs: ['Chip: Apple M1 Pro (8-core CPU, 14-core GPU)', 'Layar: 14.2-inch Liquid Retina XDR', 'Memori: 16GB RAM'], condition: 'Layar aman, tanpa white spot.' } },
        { id: 12, name: 'MacBook Pro 14" M1 Pro', specs: '16GB RAM, 1TB SSD (2021)', price: 28500000, stock: 2, grade: 'A', sku: 'M1PP14161TBG21', images: ['https://placehold.co/600x600/cccccc/333?text=MacBook+Pro+14+M1Pro'], description: { intro: 'Kapasitas penyimpanan 1TB memberikan ruang yang sangat luas untuk proyek-proyek besar, library foto, dan aplikasi profesional Anda.', specs: ['Chip: Apple M1 Pro (10-core CPU, 16-core GPU)', 'Penyimpanan: 1TB SSD', 'Port: HDMI, SDXC, Thunderbolt 4'], condition: 'Mulus terawat.' } },
        { id: 13, name: 'MacBook Pro 16" M3 Max', specs: '48GB RAM, 1TB SSD (2023)', price: 58000000, stock: 2, grade: 'A', sku: 'M3PM16481TBG23', images: ['https://placehold.co/600x600/afafaf/333?text=MacBook+Pro+16+M3Max'], description: { intro: 'Dengan RAM 48GB, model ini mampu menjalankan beberapa aplikasi pro, instrumen virtual, dan efek secara bersamaan tanpa berkeringat.', specs: ['Chip: Apple M3 Max', 'Memori: 48GB RAM', 'Penyimpanan: 1TB SSD'], condition: 'Performa tertinggi untuk para profesional sejati.' } },
        { id: 14, name: 'MacBook Pro 14" M2 Max', specs: '32GB RAM, 1TB SSD (2023)', price: 38000000, stock: 3, grade: 'A', sku: 'M2PM14321TBG23', images: ['https://placehold.co/600x600/c0c0c0/333?text=MacBook+Pro+14+M2Max'], description: { intro: 'Dengan chip M2 Max dan RAM 32GB, laptop ini dirancang untuk tugas paling berat seperti rendering 3D, simulasi ilmiah, dan pengembangan aplikasi skala besar.', specs: ['Chip: Apple M2 Max', 'Memori: 32GB RAM', 'Penyimpanan: 1TB SSD'], condition: 'Performa monster dalam bodi yang ringkas.' } },
        { id: 15, name: 'MacBook Pro 14" M3 Pro', specs: '18GB RAM, 512GB SSD (2023)', price: 33000000, stock: 10, grade: 'A', sku: 'M3PP1418512G23', images: ['https://placehold.co/600x600/b8b8b8/333?text=MacBook+Pro+14+M3Pro'], description: { intro: 'Chip M3 Pro dengan arsitektur 3-nanometer memberikan efisiensi daya dan performa yang luar biasa. Warna Space Black baru yang elegan dan tahan sidik jari.', specs: ['Chip: Apple M3 Pro', 'Memori: 18GB RAM', 'Warna: Space Black'], condition: 'Barang seperti baru, cycle count baterai rendah.' } },
        { id: 16, name: 'MacBook Pro 14" M3 Max', specs: '36GB RAM, 1TB SSD (2023)', price: 45000000, stock: 0, grade: 'A', sku: 'M3PM14361TBG23', images: ['https://placehold.co/600x600/b8b8b8/333?text=MacBook+Pro+14+M3Max'], description: { intro: 'Puncak performa MacBook. M3 Max mendorong batas-batas komputasi grafis dan pemrosesan, menjadikannya pilihan utama bagi para profesional top.', specs: ['Chip: Apple M3 Max', 'Memori: 36GB RAM', 'Penyimpanan: 1TB SSD'], condition: 'Stok habis.' } },
        { id: 17, name: 'MacBook Pro 16" M1 Pro', specs: '16GB RAM, 512GB SSD (2021)', price: 29500000, stock: 4, grade: 'C', sku: 'M1PP1616512G21', images: ['https://placehold.co/600x600/c7c7c7/333?text=MacBook+Pro+16+M1Pro'], description: { intro: 'Layar Liquid Retina XDR 16 inci yang imersif memberikan kanvas kerja yang luas untuk semua proyek kreatif Anda. Performa M1 Pro yang konsisten dan andal.', specs: ['Chip: Apple M1 Pro', 'Layar: 16.2-inch Liquid Retina XDR', 'Memori: 16GB RAM'], condition: 'Fisik 93%, terdapat dent kecil di sudut.' } },
        { id: 18, name: 'MacBook Pro 16" M1 Max', specs: '32GB RAM, 1TB SSD (2021)', price: 39000000, stock: 2, grade: 'B', sku: 'M1PM16321TBG21', images: ['https://placehold.co/600x600/c7c7c7/333?text=MacBook+Pro+16+M1Max'], description: { intro: 'Dengan bandwidth memori dua kali lipat dari M1 Pro, M1 Max menangani file-file raksasa dan multitasking di berbagai aplikasi pro dengan mudah.', specs: ['Chip: Apple M1 Max', 'Memori: 32GB RAM', 'Penyimpanan: 1TB SSD'], condition: 'Cocok untuk video editor profesional.' } },
        { id: 19, name: 'MacBook Pro 16" M2 Pro', specs: '16GB RAM, 512GB SSD (2023)', price: 34000000, stock: 7, grade: 'A', sku: 'M2PP1616512G23', images: ['https://placehold.co/600x600/bbbbbb/333?text=MacBook+Pro+16+M2Pro'], description: { intro: 'Performa M2 Pro di layar 16 inci. Laptop ini adalah workstation portabel yang ideal untuk editor video, fotografer, dan musisi.', specs: ['Chip: Apple M2 Pro', 'Layar: 16.2-inch Liquid Retina XDR', 'Memori: 16GB RAM'], condition: 'Terinspeksi penuh.' } },
        { id: 20, name: 'MacBook Pro 16" M2 Max', specs: '32GB RAM, 1TB SSD (2023)', price: 46500000, stock: 3, grade: 'A', sku: 'M2PM16321TBG23', images: ['https://placehold.co/600x600/bbbbbb/333?text=MacBook+Pro+16+M2Max'], description: { intro: 'GPU dahsyat pada M2 Max memungkinkan alur kerja grafis yang sebelumnya tidak mungkin dilakukan di laptop. Selesaikan proyek Anda lebih cepat dari sebelumnya.', specs: ['Chip: Apple M2 Max', 'Memori: 32GB RAM', 'Penyimpanan: 1TB SSD'], condition: 'Unit pilihan dengan performa terjamin.' } },
        { id: 21, name: 'MacBook Pro 16" M3 Pro', specs: '18GB RAM, 512GB SSD (2023)', price: 39999000, stock: 9, grade: 'A', sku: 'M3PP1618512G23', images: ['https://placehold.co/600x600/afafaf/333?text=MacBook+Pro+16+M3Pro'], description: { intro: 'Efisiensi dan kekuatan chip M3 Pro bersinar di layar 16 inci. Nikmati daya tahan baterai hingga 22 jam, terlama yang pernah ada di Mac.', specs: ['Chip: Apple M3 Pro', 'Memori: 18GB RAM', 'Penyimpanan: 512GB SSD'], condition: 'Seperti baru, garansi panjang.' } },
        { id: 22, name: 'MacBook Pro 16" M3 Max', specs: '48GB RAM, 1TB SSD (2023)', price: 58000000, stock: 2, grade: 'A', sku: 'M3PM16481TBG23', images: ['https://placehold.co/600x600/afafaf/333?text=MacBook+Pro+16+M3Max'], description: { intro: 'Dengan RAM 48GB, model ini mampu menjalankan beberapa aplikasi pro, instrumen virtual, dan efek secara bersamaan tanpa berkeringat.', specs: ['Chip: Apple M3 Max', 'Memori: 48GB RAM', 'Penyimpanan: 1TB SSD'], condition: 'Performa tertinggi untuk para profesional sejati.' } },
        { id: 23, name: 'MacBook Air 13" M2', specs: '24GB RAM, 2TB SSD (2022)', price: 28000000, stock: 1, grade: 'B', sku: 'M2A13242TBG22', images: ['https://placehold.co/600x600/e3e4e6/333?text=MacBook+Air+M2+Custom'], description: { intro: 'Konfigurasi langka dengan RAM dan SSD maksimal. Ini adalah MacBook Air paling kuat yang bisa Anda dapatkan, menggabungkan portabilitas dengan kapasitas super.', specs: ['Chip: Apple M2', 'Memori: 24GB RAM', 'Penyimpanan: 2TB SSD'], condition: 'Unit langka.' } },
        { id: 24, name: 'MacBook Pro 14" M3', specs: '8GB RAM, 512GB SSD (2023)', price: 26500000, stock: 0, grade: 'A', sku: 'M3P148512G23', images: ['https://placehold.co/600x600/b8b8b8/333?text=MacBook+Pro+14+M3'], description: { intro: 'Model dasar MacBook Pro 14 inci dengan chip M3 standar, memberikan pengenalan sempurna ke dunia performa Pro dengan harga yang lebih terjangkau.', specs: ['Chip: Apple M3', 'Memori: 8GB RAM', 'Penyimpanan: 512GB SSD'], condition: 'Stok akan segera tersedia.' } },
    ];

    // --- LOGIKA UTAMA WEBSITE ---
    
    let cart = JSON.parse(localStorage.getItem('macintozCart')) || [];
    const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    const saveCart = () => localStorage.setItem('macintozCart', JSON.stringify(cart));
    
    const addToCart = (productId, quantity = 1) => {
        const product = products.find(p => p.id === productId);
        if (!product) return; 

        if (product.stock < quantity) {
            alert('Maaf, stok produk tidak mencukupi.');
            return;
        }

        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            if ((cartItem.quantity + quantity) <= product.stock) {
                cartItem.quantity += quantity;
            } else {
                alert('Jumlah di keranjang akan melebihi stok yang tersedia.');
                return;
            }
        } else {
            const { images, description, ...productInfo } = product;
            cart.push({ ...productInfo, img: images[0], quantity: quantity });
        }
        saveCart();
        updateSharedUI();
        showCustomToast(`"${product.name}" ditambahkan ke keranjang`);
    };

    const updateQuantity = (productId, newQuantity) => {
        const cartItem = cart.find(item => item.id === productId);
        if (!cartItem) return;

        const product = products.find(p => p.id === productId);
        if (newQuantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        } else if (newQuantity > product.stock) {
            alert(`Stok hanya tersisa ${product.stock} buah.`);
            cartItem.quantity = product.stock;
        } else {
            cartItem.quantity = newQuantity;
        }
        saveCart();
        if (window.location.pathname.includes('/keranjang')) {
            renderCartPage();
        }
    };

    const updateSharedUI = () => {
        const cartCount = document.getElementById('cart-count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    };

    const renderProductPage = () => {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;

        const searchInput = document.getElementById('search-input');
        const sortSelect = document.getElementById('sort-select');
        const filtersContainer = document.getElementById('filters-container');

        let activeFilters = {
            model: [],
            chip: [],
            size: []
        };
        
        function createFilters() {
            const models = [...new Set(products.map(p => p.name.includes('Air') ? 'Air' : 'Pro'))];
            const chips = [...new Set(products.flatMap(p => (p.name.match(/M[1-3]/g) || [])))];
            const sizes = [...new Set(products.flatMap(p => (p.name.match(/1[3-6]/g) || [])))];

            filtersContainer.innerHTML = `
                <div class="filter-group">
                    <h4>Model</h4>
                    ${models.map(model => `
                        <div class="filter-option">
                            <input type="checkbox" id="model-${model.toLowerCase()}" data-category="model" value="${model}">
                            <label for="model-${model.toLowerCase()}">MacBook ${model}</label>
                        </div>
                    `).join('')}
                </div>
                <div class="filter-group">
                    <h4>Chip</h4>
                    ${chips.sort().map(chip => `
                        <div class="filter-option">
                            <input type="checkbox" id="chip-${chip.toLowerCase()}" data-category="chip" value="${chip}">
                            <label for="chip-${chip.toLowerCase()}">${chip}</label>
                        </div>
                    `).join('')}
                </div>
                <div class="filter-group">
                    <h4>Ukuran Layar</h4>
                    ${sizes.sort().map(size => `
                        <div class="filter-option">
                            <input type="checkbox" id="size-${size}" data-category="size" value="${size}">
                            <label for="size-${size}">${size} Inci</label>
                        </div>
                    `).join('')}
                </div>
            `;

            document.querySelectorAll('#filters-container input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const category = e.target.dataset.category;
                    const value = e.target.value;
                    if (e.target.checked) {
                        activeFilters[category].push(value);
                    } else {
                        activeFilters[category] = activeFilters[category].filter(item => item !== value);
                    }
                    displayProducts();
                });
            });
        }
        
        function displayProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            const sortOrder = sortSelect.value;

            let processedProducts = [...products];

            Object.keys(activeFilters).forEach(category => {
                if (activeFilters[category].length > 0) {
                    processedProducts = processedProducts.filter(product => {
                        return activeFilters[category].some(filterValue => {
                            return product.name.includes(filterValue);
                        });
                    });
                }
            });

            if (searchTerm) {
                processedProducts = processedProducts.filter(product => 
                    product.name.toLowerCase().includes(searchTerm)
                );
            }

            if (sortOrder === 'price-asc') {
                processedProducts.sort((a, b) => a.price - b.price);
            } else if (sortOrder === 'price-desc') {
                processedProducts.sort((a, b) => b.price - a.price);
            }

            productGrid.innerHTML = '';
            if (processedProducts.length === 0) {
                productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">Tidak ada produk yang cocok dengan kriteria Anda.</p>';
            } else {
                processedProducts.forEach(product => {
                    const card = document.createElement('a');
                    card.href = `./detail-produk.html?id=${product.id}`;
                    card.className = 'product-card';
                    card.style.textDecoration = 'none';
                    card.style.color = 'inherit';
                    
                    const gradeBadgeClass = `product-grade-badge grade-${product.grade.toLowerCase()}`;
                    const gradeBadge = `<div class="${gradeBadgeClass}">Grade ${product.grade}</div>`;

                    let stockHTML = '';
                    if (product.stock > 0) {
                        const stockClass = product.stock <= CONFIG.LOW_STOCK_THRESHOLD ? 'product-stock low-stock' : 'product-stock';
                        stockHTML = `<p class="${stockClass}">Sisa stok: ${product.stock}</p>`;
                    } else {
                        stockHTML = `<p class="product-stock">Stok Habis</p>`;
                    }

                    card.innerHTML = `
                        <img src="${product.images[0].replace('600x600', '240x240')}" alt="${product.name}">
                        <div>
                            ${gradeBadge}
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-specs">${product.specs}</p>
                            ${stockHTML} 
                            <p class="product-price">${formatRupiah(product.price)}</p>
                            ${product.stock > 0
                                ? `<div class="button">Lihat Detail</div>`
                                : `<div class="button button-secondary" style="cursor:not-allowed;">Stok Kosong</div>`
                            }
                        </div>
                    `;
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

        const currentProduct = products.find(p => p.id === productId);

        if (currentProduct) {
            contentDiv.style.display = 'flex';
            notFoundDiv.style.display = 'none';
            document.title = `${currentProduct.name} - Macintoz`;
            document.getElementById('detail-name').textContent = currentProduct.name;
            document.getElementById('detail-specs').textContent = currentProduct.specs;
            
            const gradeElement = document.getElementById('detail-grade');
            const gradeBadgeClass = `product-grade-badge grade-${currentProduct.grade.toLowerCase()}`;
            const gradeDescriptions = {
                'A': 'Seperti Baru',
                'B': 'Sangat Baik',
                'C': 'Baik'
            };
            gradeElement.innerHTML = `
                <div class="${gradeBadgeClass}">Grade ${currentProduct.grade}</div>
                <span>Kondisi: ${gradeDescriptions[currentProduct.grade] || currentProduct.grade}</span>
            `;

            document.getElementById('detail-price').textContent = formatRupiah(currentProduct.price);
            document.getElementById('detail-sku').textContent = `SKU: ${currentProduct.sku}`;
            
            const descriptionContainer = document.getElementById('detail-description-container');
            descriptionContainer.innerHTML = ''; 

            const introParagraph = document.createElement('p');
            introParagraph.textContent = currentProduct.description.intro;
            descriptionContainer.appendChild(introParagraph);

            if (currentProduct.description.specs && currentProduct.description.specs.length > 0) {
                const specsSection = document.createElement('div');
                specsSection.className = 'detail-description-section';
                const specsHeader = document.createElement('h4');
                specsHeader.textContent = 'Spesifikasi Detail:';
                const specsList = document.createElement('ul');
                currentProduct.description.specs.forEach(specText => {
                    const listItem = document.createElement('li');
                    listItem.textContent = specText;
                    specsList.appendChild(listItem);
                });
                specsSection.appendChild(specsHeader);
                specsSection.appendChild(specsList);
                descriptionContainer.appendChild(specsSection);
            }

            if (currentProduct.description.condition) {
                const conditionSection = document.createElement('div');
                conditionSection.className = 'detail-description-section';
                const conditionHeader = document.createElement('h4');
                conditionHeader.textContent = 'Kondisi Produk:';
                const conditionParagraph = document.createElement('p');
                conditionParagraph.textContent = currentProduct.description.condition;
                conditionSection.appendChild(conditionHeader);
                conditionSection.appendChild(conditionParagraph);
                descriptionContainer.appendChild(conditionSection);
            }

            const stockElement = document.getElementById('detail-stock');
            if (currentProduct.stock > 0) {
                stockElement.textContent = `Ketersediaan: Sisa ${currentProduct.stock} unit`;
                if(currentProduct.stock <= CONFIG.LOW_STOCK_THRESHOLD) {
                    stockElement.classList.add('low-stock');
                } else {
                    stockElement.classList.remove('low-stock');
                }
            } else {
                stockElement.textContent = `Ketersediaan: Stok Habis`;
                stockElement.classList.add('low-stock');
            }

            const addToCartBtn = document.getElementById('detail-add-to-cart-btn');
            if (currentProduct.stock > 0) {
                addToCartBtn.disabled = false;
                addToCartBtn.textContent = 'Tambah ke Keranjang';
                addToCartBtn.classList.remove('button-secondary');
                addToCartBtn.onclick = () => addToCart(currentProduct.id);
            } else {
                addToCartBtn.disabled = true;
                addToCartBtn.textContent = 'Stok Kosong';
                addToCartBtn.classList.add('button-secondary');
                addToCartBtn.onclick = null;
            }

            const imgElement = document.getElementById('detail-img');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const dotsContainer = document.getElementById('slider-dots');
            let currentImageIndex = 0;

            function updateSlider() {
                imgElement.src = currentProduct.images[currentImageIndex];
                imgElement.alt = `${currentProduct.name} - Gambar ${currentImageIndex + 1}`;
                document.querySelectorAll('.slider-dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentImageIndex);
                });
            }

            dotsContainer.innerHTML = '';
            currentProduct.images.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = 'slider-dot';
                dot.onclick = () => {
                    currentImageIndex = index;
                    updateSlider();
                };
                dotsContainer.appendChild(dot);
            });
            
            prevBtn.onclick = () => {
                currentImageIndex = (currentImageIndex - 1 + currentProduct.images.length) % currentProduct.images.length;
                updateSlider();
            };
            nextBtn.onclick = () => {
                currentImageIndex = (currentImageIndex + 1) % currentProduct.images.length;
                updateSlider();
            };
            updateSlider();

            const relatedGrid = document.getElementById('related-products-grid');
            relatedGrid.innerHTML = '';

            const primaryModel = currentProduct.name.includes('Air') ? 'Air' : 'Pro';
            let relatedProducts = products.filter(p => 
                p.name.includes(primaryModel) && p.id !== currentProduct.id
            );

            relatedProducts.sort(() => 0.5 - Math.random());
            const selectedRelated = relatedProducts.slice(0, 4);

            selectedRelated.forEach(product => {
                const card = document.createElement('a');
                card.href = `./detail-produk.html?id=${product.id}`;
                card.className = 'product-card';
                card.style.textDecoration = 'none';
                card.style.color = 'inherit';
                
                const gradeBadge = `<div class="product-grade-badge grade-${product.grade.toLowerCase()}">Grade ${product.grade}</div>`;
                
                let stockHTML = '';
                if (product.stock > 0) {
                    stockHTML = `<p class="product-stock">Sisa stok: ${product.stock}</p>`;
                }

                card.innerHTML = `
                    <img src="${product.images[0].replace('600x600', '240x240')}" alt="${product.name}">
                    <div>
                        ${gradeBadge}
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-specs">${product.specs}</p>
                        ${stockHTML} 
                        <p class="product-price">${formatRupiah(product.price)}</p>
                    </div>
                `;
                relatedGrid.appendChild(card);
            });

        } else {
            contentDiv.style.display = 'none';
            notFoundDiv.style.display = 'block';
        }
    };
    
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
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.specs}</p>
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

        document.querySelectorAll('.quantity-decrease').forEach(btn => {
            btn.onclick = e => {
                const id = parseInt(e.target.dataset.id);
                const currentItem = cart.find(i => i.id === id);
                updateQuantity(id, currentItem.quantity - 1);
            }
        });
        document.querySelectorAll('.quantity-increase').forEach(btn => {
            btn.onclick = e => {
                const id = parseInt(e.target.dataset.id);
                const currentItem = cart.find(i => i.id === id);
                updateQuantity(id, currentItem.quantity + 1);
            }
        });
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.onclick = e => {
                if (confirm('Yakin ingin menghapus item ini?')) {
                    const id = parseInt(e.target.dataset.id);
                    updateQuantity(id, 0);
                }
            }
        });
    };

    const renderCheckoutPage = () => {
        const itemsList = document.getElementById('checkout-items-list');
        if(!itemsList) return;

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
                if (actualShippingDiscount > 0 && shippingCostEl.querySelector('.discount') === null) {
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
            
            if (couponData) {
                flatDiscount = couponData.flatDiscount;
                shippingDiscountPercent = couponData.shippingDiscountPercent;
                appliedCoupon = code;

                let successMsg = `Kode "${code}" diterapkan! Diskon barang ${formatRupiah(flatDiscount)}.`;
                if (shippingDiscountPercent === 100) {
                    successMsg += ` & Gratis Ongkir.`;
                }
                couponMsg.textContent = successMsg;
                couponMsg.className = 'success';
                
                couponInput.disabled = true;
                couponBtn.textContent = 'Cancel';
                couponBtn.classList.add('cancel');
                
                renderTotals();
            } else {
                couponMsg.textContent = 'Kode kupon tidak valid.';
                couponMsg.className = 'error';
            }
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
        
        const paymentForm = document.getElementById('payment-form');
        if (paymentForm) {
            paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const finalShippingCost = shippingCost * (1 - shippingDiscountPercent / 100);
                const finalTotal = subtotal - flatDiscount + finalShippingCost;
                const uniqueCode = Math.floor(100 + Math.random() * 900);
                const paymentEndTime = new Date().getTime() + CONFIG.PAYMENT_TIMER_MINUTES * 60 * 1000;
                
                const paymentData = {
                    totalPrice: finalTotal > 0 ? finalTotal : 0,
                    code: uniqueCode,
                    endTime: paymentEndTime
                };
                localStorage.setItem('paymentData', JSON.stringify(paymentData));
                
                cart = [];
                saveCart();
                updateSharedUI();
                
                window.location.href = 'cara-bayar.html';
            });
        }
        
        populateSelectOptions();
        subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        renderTotals();
    };

    const renderCaraBayarPage = () => {
        const paymentDataString = localStorage.getItem('paymentData');
        if (!paymentDataString) {
            alert('Data pembayaran tidak ditemukan. Silakan ulangi dari keranjang.');
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

        const timerDisplay = document.getElementById('timer-display');
        const paymentDetailsWrapper = document.getElementById('payment-details-wrapper');
        const timeUpMessage = document.getElementById('time-up-message');
        
        const countdown = setInterval(() => {
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

    function checkPendingPayment() {
        const paymentDataString = localStorage.getItem('paymentData');
        const body = document.querySelector('body');
        
        if (paymentDataString) {
            const paymentData = JSON.parse(paymentDataString);
            
            // Periksa apakah pembayaran sudah kedaluwarsa
            if (new Date().getTime() > paymentData.endTime) {
                localStorage.removeItem('paymentData'); // Hapus jika sudah kedaluwarsa
                return;
            }

            // Jika belum kedaluwarsa dan kita TIDAK sedang di halaman cara-bayar
            if (!window.location.pathname.includes('cara-bayar.html')) {
                // Buat banner notifikasi
                const banner = document.createElement('div');
                banner.className = 'pending-payment-banner';
                banner.innerHTML = `
                    <span>Anda memiliki pembayaran yang belum selesai.</span>
                    <a href="cara-bayar.html">Lihat Detail Pembayaran</a>
                    <button class="cancel-btn">Batalkan Pesanan</button>
                `;

                // Tambahkan banner ke bagian paling atas body
                body.prepend(banner);

                // Beri fungsi pada tombol "Batalkan"
                banner.querySelector('.cancel-btn').addEventListener('click', () => {
                    if(confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
                        localStorage.removeItem('paymentData');
                        banner.remove(); // Hapus banner dari tampilan
                        alert('Pesanan telah dibatalkan.');
                    }
                });
            }
        }
    }
    
    function initializeReviewSlider() {
        const sliderContainer = document.querySelector('.review-slider-container');
        if (!sliderContainer) return;

        const track = document.querySelector('.review-slider-track');
        const cards = Array.from(track.children);
        if (cards.length === 0) return;
        
        const cardWidth = cards[0].offsetWidth + 30;

        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });

        let position = 0;
        track.style.width = `${cardWidth * cards.length * 2}px`;

        function slide() {
            position -= 1;
            if (Math.abs(position) >= cardWidth * cards.length) {
                position = 0;
            }
            track.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(slide);
        }
        requestAnimationFrame(slide);
    }

    const initializeApp = () => {
        checkPendingPayment();
        updateSharedUI();
        initializeNavbar();
        const path = window.location.pathname;
        
        if (path.includes('/produk')) {
            renderProductPage();
        } else if (path.includes('/detail-produk')) {
            renderDetailPage();
        } else if (path.includes('/keranjang')) {
            renderCartPage();
        } else if (path.includes('/pembayaran')) {
            renderCheckoutPage();
        } else if (path.includes('/cara-bayar')) {
            renderCaraBayarPage();
        } else if (path.endsWith('/') || path.includes('/index.html')) {
            initializeReviewSlider();
        }
    };

    initializeApp();
});