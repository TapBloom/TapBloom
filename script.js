// Игровые переменные
        let casinoBet = 100;
        const slotSymbols = ['🍒', '🍋', '🍊', '⭐', '7️⃣', '💰'];
        let isSpinning = false;
        let cosmicEnergy = 0;
        let totalEnergy = 0;
        let clickPower = 1;
        let totalClicks = 0;
        let prestigeLevel = 0;
        let prestigePoints = 0;
        let isMusicOn = false;

        // Генераторы
        const generators = [
            {
                id: 'star',
                name: 'Пейджер',
                description: 'Слабый Пейджер, производит 0.1 энергии в секунду',
                baseCost: 10,
                baseProduction: 0.1,
                owned: 0,
                unlocked: true,
                icon: '📟'
            },
            {
                id: 'planet',
                name: 'Телефон',
                description: 'Сенсорный телефон, производит 0.5 энергии в секунду',
                baseCost: 50,
                baseProduction: 0.5,
                owned: 0,
                unlocked: false,
                icon: '📱'
            },
            {
                id: 'nebula',
                name: 'Ноутбук',
                description: 'Ноутбук, производит 2 энергии в секунду',
                baseCost: 200,
                baseProduction: 2,
                owned: 0,
                unlocked: false,
                icon: '💻'
            },
            {
                id: 'blackhole',
                name: 'Компьютер',
                description: 'Мощный компьютер, производит 10 энергии в секунду',
                baseCost: 1000,
                baseProduction: 10,
                owned: 0,
                unlocked: false,
                icon: '🖥️'
            },
            {
                id: 'galaxy',
                name: 'Робот',
                description: 'Робот, производит 50 энергии в секунду',
                baseCost: 5000,
                baseProduction: 50,
                owned: 0,
                unlocked: false,
                icon: '🤖'
            },
            {
                id: 'quasar',
                name: 'Ракета',
                description: 'Сверхмощная ракета, производит 200 энергии в секунду',
                baseCost: 20000,
                baseProduction: 200,
                owned: 0,
                unlocked: false,
                icon: '🚀'
            },
            {
                id: 'cluster',
                name: 'НЛО',
                description: 'Тарелка НЛО, производит 1000 энергии в секунду',
                baseCost: 100000,
                baseProduction: 1000,
                owned: 0,
                unlocked: false,
                icon: '🛸'
            },
            {
                id: 'universe',
                name: 'Искусственный интеллект',
                description: 'Искусственный интеллект, производит 5000 энергии в секунду',
                baseCost: 500000,
                baseProduction: 5000,
                owned: 0,
                unlocked: false,
                icon: '🌌'
            }
        ];

        // Улучшения
        const upgrades = [
            {
                id: 'clickPower1',
                name: 'Усиленный клик',
                description: 'Увеличивает силу клика в 2 раза',
                cost: 100,
                effect: () => { clickPower *= 2; },
                purchased: false,
                unlocked: true,
                icon: '💪'
            },
            {
                id: 'clickPower2',
                name: 'Супер клик',
                description: 'Увеличивает силу клика в 3 раза',
                cost: 1000,
                effect: () => { clickPower *= 3; },
                purchased: false,
                unlocked: false,
                icon: '💥'
            },
            {
                id: 'clickPower3',
                name: 'Космический клик',
                description: 'Увеличивает силу клика в 5 раз',
                cost: 10000,
                effect: () => { clickPower *= 5; },
                purchased: false,
                unlocked: false,
                icon: '🚀'
            },
            {
                id: 'generatorBoost1',
                name: 'Эффективность генераторов',
                description: 'Увеличивает производство всех генераторов на 20%',
                cost: 500,
                effect: () => { /* Эффект применяется при расчете производства */ },
                purchased: false,
                unlocked: false,
                icon: '📈'
            },
            {
                id: 'generatorBoost2',
                name: 'Супер эффективность',
                description: 'Увеличивает производство всех генераторов на 50%',
                cost: 5000,
                effect: () => { /* Эффект применяется при расчете производства */ },
                purchased: false,
                unlocked: false,
                icon: '📊'
            },
            {
                id: 'generatorBoost3',
                name: 'Квантовая эффективность',
                description: 'Увеличивает производство всех генераторов на 100%',
                cost: 50000,
                effect: () => { /* Эффект применяется при расчете производства */ },
                purchased: false,
                unlocked: false,
                icon: '⚛️'
            }
        ];

        // Достижения
        const achievements = [
            {
                id: 'firstClick',
                name: 'Первый шаг',
                description: 'Совершите первый клик',
                condition: () => totalClicks >= 1,
                achieved: false,
                reward: 10,
                icon: '👣'
            },
            {
                id: 'hundredClicks',
                name: 'Сто кликов',
                description: 'Совершите 100 кликов',
                condition: () => totalClicks >= 100,
                achieved: false,
                reward: 100,
                icon: '💯'
            },
            {
                id: 'thousandClicks',
                name: 'Тысяча кликов',
                description: 'Совершите 1000 кликов',
                condition: () => totalClicks >= 1000,
                achieved: false,
                reward: 1000,
                icon: '🔢'
            },
            {
                id: 'firstGenerator',
                name: 'Первый генератор',
                description: 'Купите первый генератор',
                condition: () => generators.some(g => g.owned > 0),
                achieved: false,
                reward: 50,
                icon: '⭐'
            },
            {
                id: 'energy100',
                name: '100 энергии',
                description: 'Соберите 100 энергии',
                condition: () => totalEnergy >= 100,
                achieved: false,
                reward: 100,
                icon: '🔋'
            },
            {
                id: 'energy1000',
                name: '1000 энергии',
                description: 'Соберите 1000 энергии',
                condition: () => totalEnergy >= 1000,
                achieved: false,
                reward: 1000,
                icon: '⚡'
            },
            {
                id: 'energy1e5',
                name: '100,000 энергии',
                description: 'Соберите 100,000 энергии',
                condition: () => totalEnergy >= 1e5,
                achieved: false,
                reward: 10000,
                icon: '🌌'
            },
            {
                id: 'energy1e6',
                name: '1,000,000 энергии',
                description: 'Соберите 1,000,000 энергии',
                condition: () => totalEnergy >= 1e6,
                achieved: false,
                reward: 500000,
                icon: '🌀'
            },
            {
                id: 'firstPrestige',
                name: 'Первый престиж',
                description: 'Совершите первый престиж',
                condition: () => prestigeLevel >= 1,
                achieved: false,
                reward: 1000,
                icon: '🔄'
            }
        ];
        // DOM элементы
        const cosmicEnergyElement = document.getElementById('cosmicEnergy');
        const clickPowerElement = document.getElementById('clickPower');
        const clickerBtn = document.getElementById('clickerBtn');
        const totalClicksElement = document.getElementById('totalClicks');
        const energyPerSecondElement = document.getElementById('energyPerSecond');
        const totalEnergyElement = document.getElementById('totalEnergy');
        const prestigeLevelElement = document.getElementById('prestigeLevel');
        const prestigeBtn = document.getElementById('prestigeBtn');
        const generatorsTab = document.getElementById('generatorsTab');
        const upgradesTab = document.getElementById('upgradesTab');
        const achievementsTab = document.getElementById('achievementsTab');
        const achievementNotification = document.getElementById('achievementNotification');
        const achievementTitle = document.getElementById('achievementTitle');
        const achievementDesc = document.getElementById('achievementDesc');
        const bgMusic = document.getElementById('bgMusic');
        const musicToggle = document.getElementById('musicToggle');

        // Инициализация магазина
        function initShop() {
            // Генераторы
            generatorsTab.innerHTML = '';
            generators.filter(g => g.unlocked).forEach(generator => {
                const cost = Math.floor(generator.baseCost * Math.pow(1.15, generator.owned));

                const generatorElement = document.createElement('div');
                generatorElement.className = 'shop-item';
                generatorElement.innerHTML = `
                    <div class="item-icon">${generator.icon}</div>
                    <div class="item-info">
                        <h4 class="item-name">${generator.name}</h4>
                        <p class="item-description">${generator.description}</p>
                        <p class="item-price">${formatNumber(cost)} энергии</p>
                    </div>
                    <button class="buy-btn" data-id="${generator.id}">Купить (${generator.owned})</button>
                `;
                generatorsTab.appendChild(generatorElement);
            });

            // Улучшения
            upgradesTab.innerHTML = '';
            upgrades.filter(u => u.unlocked && !u.purchased).forEach(upgrade => {
                const upgradeElement = document.createElement('div');
                upgradeElement.className = 'shop-item';
                upgradeElement.innerHTML = `
                    <div class="item-icon">${upgrade.icon}</div>
                    <div class="item-info">
                        <h4 class="item-name">${upgrade.name}</h4>
                        <p class="item-description">${upgrade.description}</p>
                        <p class="item-price">${formatNumber(upgrade.cost)} энергии</p>
                    </div>
                    <button class="buy-btn" data-id="${upgrade.id}">Купить</button>
                `;
                upgradesTab.appendChild(upgradeElement);
            });

            // Достижения
            achievementsTab.innerHTML = '';
            achievements.forEach(achievement => {
                const achievementElement = document.createElement('div');
                achievementElement.className = 'shop-item';
                achievementElement.innerHTML = `
                    <div class="item-icon">${achievement.icon}</div>
                    <div class="item-info">
                        <h4 class="item-name">${achievement.name} ${achievement.achieved ? '✓' : ''}</h4>
                        <p class="item-description">${achievement.description}</p>
                        <p class="item-price">Награда: ${formatNumber(achievement.reward)} энергии</p>
                    </div>
                `;
                achievementsTab.appendChild(achievementElement);
            });

        // ss
        clickerBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            clickerBtn.classList.add('active');
            
            // Воспроизводим звук клика
            const clickSound = document.getElementById('clickSound');
            clickSound.currentTime = 0;
            clickSound.play();
        
            cosmicEnergy += clickPower;
            totalEnergy += clickPower;
            totalClicks++;
            checkAchievements();
            updateUI();
        });
        
        clickerBtn.addEventListener('touchend', () => {
            clickerBtn.classList.remove('active');
        });
        
        // Предотвращаем всплывающее меню при долгом нажатии
        clickerBtn.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
                
            // Обработчики событий для кнопок покупки
            document.querySelectorAll('#generatorsTab .buy-btn').forEach(btn => {
                btn.addEventListener('click', () => buyGenerator(btn.dataset.id));
            });

            document.querySelectorAll('#upgradesTab .buy-btn').forEach(btn => {
                btn.addEventListener('click', () => buyUpgrade(btn.dataset.id));
            });
        }
//sss

        function toggleMusic() {
            isMusicOn = !isMusicOn;

            if (isMusicOn) {
                bgMusic.volume = 0.2; // Очень тихий звук (20% громкости)
                bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
                musicToggle.textContent = "🔊";
            } else {
                bgMusic.pause();
                musicToggle.textContent = "🔇";
            }

            // Сохраняем настройку
            localStorage.setItem('musicEnabled', isMusicOn);
        }

        // Инициализация музыки при загрузке
        function initMusic() {
            const savedSetting = localStorage.getItem('musicEnabled');
            if (savedSetting !== null) {
                isMusicOn = savedSetting === 'true';
            } else {
                // По умолчанию музыка выключена
                isMusicOn = false;
            }

            // Устанавливаем иконку
            musicToggle.textContent = isMusicOn ? "🔊" : "🔇";

            // Если музыка включена - запускаем
            if (isMusicOn) {
                bgMusic.volume = 0.2;
                // Задержка для обхода ограничений автовоспроизведения
                setTimeout(() => {
                    bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
                }, 1000);
            }

            // Вешаем обработчик
            musicToggle.addEventListener('click', toggleMusic);
        }

        // Покупка генератора
        function buyGenerator(id) {
            const generator = generators.find(g => g.id === id);
            if (!generator) return;

            const cost = Math.floor(generator.baseCost * Math.pow(1.15, generator.owned));
            const buyBtn = document.querySelector(`.buy-btn[data-id="${id}"]`);

            if (cosmicEnergy >= cost) {
                // Успешная покупка
                cosmicEnergy -= cost;
                generator.owned++;
                document.getElementById('buySound').play();

                // Сбрасываем стиль ошибки, если был
                buyBtn.classList.remove('error', 'error-pulse');

                // Разблокировка следующего генератора
                if (generator.owned >= 5 && generators.indexOf(generator) < generators.length - 1) {
                    const nextGenerator = generators[generators.indexOf(generator) + 1];
                    nextGenerator.unlocked = true;
                }

                updateUI();
                initShop();
                checkAchievements();
            } else {
                // Не хватает энергии
                document.getElementById('errorSound').play();

                // Добавляем красный стиль и пульсацию
                buyBtn.classList.add('error', 'error-pulse');

                // Убираем анимацию через 0.5 секунды, оставляя красный цвет
                setTimeout(() => {
                    buyBtn.classList.remove('error-pulse');
                }, 500);
            }
        }

        // Покупка улучшения
        function buyUpgrade(id) {
            const upgrade = upgrades.find(u => u.id === id);
            if (!upgrade || upgrade.purchased || cosmicEnergy < upgrade.cost) {
                // Если не хватает энергии - проигрываем звук ошибки и мигаем
                if (cosmicEnergy < upgrade.cost) {
                    document.getElementById('errorSound').play();
                    const buyBtn = document.querySelector(`.buy-btn[data-id="${id}"]`);
                    if (buyBtn) {
                        buyBtn.classList.add('error', 'error-flash');
                        setTimeout(() => buyBtn.classList.remove('error-flash'), 300);
                    }
                }
                return;
            }

            // Успешная покупка
            cosmicEnergy -= upgrade.cost;
            upgrade.purchased = true;
            upgrade.effect();
            document.getElementById('buySound').play();

            // Разблокировка следующих улучшений (оригинальная логика)
            if (upgrade.id === 'clickPower1') {
                upgrades.find(u => u.id === 'clickPower2').unlocked = true;
                upgrades.find(u => u.id === 'generatorBoost1').unlocked = true;
            } else if (upgrade.id === 'clickPower2') {
                upgrades.find(u => u.id === 'clickPower3').unlocked = true;
            } else if (upgrade.id === 'generatorBoost1') {
                upgrades.find(u => u.id === 'generatorBoost2').unlocked = true;
            } else if (upgrade.id === 'generatorBoost2') {
                upgrades.find(u => u.id === 'generatorBoost3').unlocked = true;
            }

            updateUI();
            initShop();
            checkAchievements();
        }

        // Проверка достижений
        function checkAchievements() {
            achievements.forEach(achievement => {
                if (!achievement.achieved && achievement.condition()) {
                    achievement.achieved = true;
                    cosmicEnergy += achievement.reward;
                    showAchievementNotification(achievement);
                }
            });

            initShop();
        }

        // Показ уведомления о достижении
        function showAchievementNotification(achievement) {
            achievementTitle.textContent = achievement.name;
            achievementDesc.textContent = achievement.description;

            // Воспроизводим звук достижения
            const achievementSound = document.getElementById('achievementSound');
            achievementSound.currentTime = 0; // Перематываем на начало, если звук уже играл
            achievementSound.play();

            achievementNotification.classList.add('show');

            setTimeout(() => {
                achievementNotification.classList.remove('show');
            }, 5000);
        }

        // Престиж
        function prestige() {
            if (cosmicEnergy < 1e8) return;

            prestigeLevel++;
            prestigePoints += Math.floor(Math.sqrt(cosmicEnergy / 1e8));

            // Сброс прогресса
            cosmicEnergy = 0;
            clickPower = 1 + prestigeLevel * 0.5;
            totalEnergy = 0;
            totalClicks = 0;

            generators.forEach(g => {
                g.owned = 0;
                g.unlocked = g.id === 'star';
            });

            upgrades.forEach(u => {
                u.purchased = false;
                u.unlocked = u.id === 'clickPower1';
            });

            // Сохраняем только достижения
            achievements.forEach(a => {
                if (a.id === 'firstPrestige') a.achieved = prestigeLevel >= 1;
            });

            updateUI();
            initShop();
            checkAchievements();
        }

        // Расчет производства энергии в секунду
        function calculateEnergyPerSecond() {
            let production = 0;

            generators.forEach(generator => {
                let generatorProduction = generator.baseProduction * generator.owned;

                // Применяем улучшения
                if (upgrades.find(u => u.id === 'generatorBoost1')?.purchased) {
                    generatorProduction *= 1.2;
                }
                if (upgrades.find(u => u.id === 'generatorBoost2')?.purchased) {
                    generatorProduction *= 1.5;
                }
                if (upgrades.find(u => u.id === 'generatorBoost3')?.purchased) {
                    generatorProduction *= 2;
                }

                production += generatorProduction;
            });

            return production;
        }

        // Обновление интерфейса
        function updateUI() {
            cosmicEnergyElement.textContent = formatNumber(cosmicEnergy);
            clickPowerElement.textContent = formatNumber(clickPower);
            totalClicksElement.textContent = formatNumber(totalClicks);

            const eps = calculateEnergyPerSecond();
            energyPerSecondElement.textContent = formatNumber(eps);

            totalEnergyElement.textContent = formatNumber(totalEnergy);
            prestigeLevelElement.textContent = prestigeLevel;

            // Обновление кнопки престижа
            prestigeBtn.textContent = `ПРЕСТИЖ (${formatNumber(cosmicEnergy)}/${formatNumber(1e8)})`;
            prestigeBtn.disabled = cosmicEnergy < 1e8;

            // Обновление описания престижа
            document.querySelector('.prestige-info').textContent =
                `Престиж сбросит ваш прогресс, но даст постоянный бонус: +${prestigeLevel * 0.5} к силе клика!`;
        }

        // Форматирование чисел
        function formatNumber(num) {
            if (num < 1000) return Math.floor(num);
            if (num < 1e6) return (num / 1000).toFixed(1) + 'K';
            if (num < 1e9) return (num / 1e6).toFixed(1) + 'M';
            if (num < 1e12) return (num / 1e9).toFixed(1) + 'B';
            return (num / 1e12).toFixed(1) + 'T';
        }

        // Создание частиц
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';

                // Случайные свойства
                const size = Math.random() * 3 + 1;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const delay = Math.random() * 20;
                const duration = 30 + Math.random() * 50;
                const opacity = 0.2 + Math.random() * 0.5;

                // Применение стилей
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.opacity = opacity;
                particle.style.animation = `float ${duration}s linear ${delay}s infinite`;

                // Цвета частиц
                const colors = ['#6e45e2', '#89d4cf', '#f9d423', '#ffffff'];
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

                particlesContainer.appendChild(particle);
            }
        }

        // Игровой цикл
        function gameLoop() {
            const eps = calculateEnergyPerSecond();
            cosmicEnergy += eps / 10; // Обновляем 10 раз в секунду
            totalEnergy += eps / 10;

            updateUI();
            requestAnimationFrame(gameLoop);
        }

        // Инициализация игры
        function initGame() {
            // Загрузка сохранения
            initMusic();
            const save = localStorage.getItem('cosmicClickerSave');
            if (save) {
                const parsed = JSON.parse(save);
                cosmicEnergy = parsed.cosmicEnergy || 0;
                totalEnergy = parsed.totalEnergy || 0;
                clickPower = parsed.clickPower || 1;
                totalClicks = parsed.totalClicks || 0;
                prestigeLevel = parsed.prestigeLevel || 0;
                prestigePoints = parsed.prestigePoints || 0;

                if (parsed.generators) {
                    generators.forEach(g => {
                        const savedGen = parsed.generators.find(sg => sg.id === g.id);
                        if (savedGen) {
                            g.owned = savedGen.owned || 0;
                            g.unlocked = savedGen.unlocked || false;
                        }
                    });
                }

                if (parsed.upgrades) {
                    upgrades.forEach(u => {
                        const savedUp = parsed.upgrades.find(su => su.id === u.id);
                        if (savedUp) {
                            u.purchased = savedUp.purchased || false;
                            u.unlocked = savedUp.unlocked || false;
                        }
                    });
                }

                if (parsed.achievements) {
                    achievements.forEach(a => {
                        const savedAch = parsed.achievements.find(sa => sa.id === a.id);
                        if (savedAch) {
                            a.achieved = savedAch.achieved || false;
                        }
                    });
                }
            }

            // Обработчики событий
            clickerBtn.addEventListener('click', () => {
                // Воспроизводим звук клика
                const clickSound = document.getElementById('clickSound');
                clickSound.currentTime = 0; // Перематываем на начало, если звук уже играл
                clickSound.play();

                cosmicEnergy += clickPower;
                totalEnergy += clickPower;
                totalClicks++;
                checkAchievements();
                updateUI();

                // Эффект частицы (оставляем ваш существующий код)
                const clickEffect = document.createElement('div');
                clickEffect.className = 'particle';
                clickEffect.style.width = '10px';
                clickEffect.style.height = '10px';
                clickEffect.style.left = `${Math.random() * 80 + 10}%`;
                clickEffect.style.top = `${Math.random() * 80 + 10}%`;
                clickEffect.style.opacity = '0.5';
                clickEffect.style.animation = 'float 2s linear forwards';
                clickEffect.style.backgroundColor = '#ea92c6';
                document.getElementById('particles').appendChild(clickEffect);

                setTimeout(() => {
                    clickEffect.remove();
                }, 2000);
            });

            prestigeBtn.addEventListener('click', prestige);

            // Переключение вкладок магазина
            document.querySelectorAll('.shop-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    // Если уже активна - ничего не делаем
                    if (tab.classList.contains('active')) return;

                    // Находим текущую активную вкладку
                    const currentActiveTab = document.querySelector('.shop-tab.active');
                    const currentActiveContent = document.querySelector('.shop-tab-content.active');

                    // Определяем направление анимации
                    const currentIndex = Array.from(document.querySelectorAll('.shop-tab')).indexOf(currentActiveTab);
                    const newIndex = Array.from(document.querySelectorAll('.shop-tab')).indexOf(tab);
                    const direction = newIndex > currentIndex ? 'right' : 'left';

                    // Убираем активный класс с текущей вкладки и контента
                    currentActiveTab.classList.remove('active');
                    currentActiveContent.classList.remove('active');

                    // Добавляем класс для анимации выхода
                    currentActiveContent.style.transform = direction === 'right' ? 'translateX(-20px)' : 'translateX(20px)';
                    currentActiveContent.style.opacity = '0';

                    // Добавляем активный класс к новой вкладке
                    tab.classList.add('active');
                    const newContent = document.getElementById(`${tab.dataset.tab}Tab`);
                    newContent.classList.add('active');

                    // Устанавливаем начальное положение для анимации входа
                    newContent.style.transform = direction === 'right' ? 'translateX(20px)' : 'translateX(-20px)';
                    newContent.style.opacity = '0';

                    // Запускаем анимацию входа после небольшой задержки
                    setTimeout(() => {
                        newContent.style.transform = 'translateX(0)';
                        newContent.style.opacity = '1';
                    }, 10);
                });
            });

            // Создание частиц
            createParticles();

            // Инициализация магазина
            initShop();
            updateUI();
            checkAchievements();

            // Запуск игрового цикла
            gameLoop();

            // Автосохранение
            setInterval(saveGame, 30000);
        }

        // Сохранение игры
        function saveGame() {
            const save = {
                cosmicEnergy,
                totalEnergy,
                clickPower,
                totalClicks,
                prestigeLevel,
                prestigePoints,
                generators: generators.map(g => ({
                    id: g.id,
                    owned: g.owned,
                    unlocked: g.unlocked
                })),
                upgrades: upgrades.map(u => ({
                    id: u.id,
                    purchased: u.purchased,
                    unlocked: u.unlocked
                })),
                achievements: achievements.map(a => ({
                    id: a.id,
                    achieved: a.achieved
                }))
            };

            localStorage.setItem('cosmicClickerSave', JSON.stringify(save));
        }

        // Запуск игры при загрузке страницы
        window.addEventListener('load', initGame);s
