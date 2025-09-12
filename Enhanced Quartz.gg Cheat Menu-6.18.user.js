// ==UserScript==
// @name         Enhanced Quartz.gg Cheat Menu
// @namespace    http://tampermonkey.net/
// @version      6.18
// @description  A premium, feature-rich cheat menu with modern design and advanced functionality
// @author       Enhanced Pro
// @match        *://*/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    if (window.cheatMenuInitialized) return;
    window.cheatMenuInitialized = true;

    // --- COLOR THEMES ---
    const darkTheme = {
        primary: '#f0c4e7',
        secondary: '#e680a3',
        accent: '#9d4edd',
        background: 'rgba(15, 16, 20, 0.98)',
        surface: 'rgba(25, 26, 30, 0.95)',
        border: '#3d3d4d',
        text: '#f0f0f0',
        textMuted: '#a0a0a0',
        success: '#00d4aa',
        warning: '#ff9500',
        danger: '#ff5555'
    };


    let currentTheme = darkTheme;

    // --- CONFIGURATION ---
    const CONFIG = {
        animations: {
            duration: '0.3s',
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
    };

    function setTheme(isLight) {
    // Keep using darkTheme colors no matter what
    const root = document.documentElement;

    for (const [key, value] of Object.entries(darkTheme)) {
        root.style.setProperty(`--${key}-color`, value);
    }

    // Only update logo gradient if needed
    const logo = document.querySelector('.cheat-menu-logo');
    if (logo) {
        logo.style.backgroundImage = `linear-gradient(135deg, ${darkTheme.primary}, ${darkTheme.accent})`;
    }
}


    // --- GLOBAL STYLES ---
    const globalStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
            --primary-color: ${darkTheme.primary};
            --secondary-color: ${darkTheme.secondary};
            --accent-color: ${darkTheme.accent};
            --background-color: ${darkTheme.background};
            --surface-color: ${darkTheme.surface};
            --border-color: ${darkTheme.border};
            --text-color: ${darkTheme.text};
            --text-muted-color: ${darkTheme.textMuted};
            --success-color: ${darkTheme.success};
            --warning-color: ${darkTheme.warning};
            --danger-color: ${darkTheme.danger};
        }

        .cheat-menu * {
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: var(--text-color);
        }

        .cheat-menu-scrollbar::-webkit-scrollbar {
            width: 8px;
        }

        .cheat-menu-scrollbar::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.1);
            border-radius: 4px;
        }

        .cheat-menu-scrollbar::-webkit-scrollbar-thumb {
            background: var(--accent-color);
            border-radius: 4px;
        }

        .cheat-menu-scrollbar::-webkit-scrollbar-thumb:hover {
            background: var(--primary-color);
        }

        .glow-effect {
            filter: drop-shadow(0 0 8px var(--primary-color)40);
        }

        .pulse-animation {
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
        }

        .initialized-menu {
            position: fixed;
            transform: none !important;
        }

        .tab-button.active {
            background: var(--primary-color)20 !important;
            color: var(--text-color) !important;
        }

        .tab-button.active span {
            filter: grayscale(0) !important;
        }

        .tab-button.active .indicator {
            height: 100% !important;
        }

        .toggle-switch.active {
            background: var(--success-color) !important;
            box-shadow: 0 0 20px var(--success-color)40 !important;
        }

        .toggle-switch.active::after {
            background: white !important;
            left: 26px !important;
        }

        .enhanced-slider {
            position: relative;
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            cursor: pointer;
            --slider-value: 0%;
        }

        .enhanced-slider::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: var(--slider-value);
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            border-radius: 3px;
        }

        .enhanced-slider::after {
            content: '';
            position: absolute;
            top: 50%;
            left: var(--slider-value);
            transform: translate(-50%, -50%);
            width: 14px;
            height: 14px;
            background: var(--primary-color);
            border-radius: 50%;
            box-shadow: 0 0 8px var(--primary-color);
        }

        .toggle-switch {
            width: 40px;
            height: 14px;
            background: rgba(255,255,255,0.1);
            border-radius: 7px;
            position: relative;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }

        .toggle-switch::after {
            content: '';
            position: absolute;
            top: -3px;
            left: 0;
            width: 20px;
            height: 20px;
            background: var(--text-muted-color);
            border-radius: 50%;
            transition: all 0.2s ease-in-out;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        .toggle-setting {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            margin-bottom: 10px;
            cursor: pointer;
        }

        .setting-group {
            background: rgba(255,255,255,0.05);
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
        }

        .number-setting, .dropdown-setting, .slider-setting {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .number-setting:last-child, .dropdown-setting:last-child, .slider-setting:last-child {
            border-bottom: none;
        }

        .number-input, .enhanced-dropdown {
            background: rgba(15, 16, 20, 0.98);
            border: none;
            color: var(--text-color);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.9rem;
        }

        .draggable-handle {
            cursor: grab;
        }

        .draggable-handle.dragging {
            cursor: grabbing;
        }
    `;

    // Inject global styles
    GM_addStyle(globalStyles);

    // Enhanced splash screen with better animations
    function showSplash(callback) {
        const splash = document.createElement('div');
        splash.id = 'quartz-splash';
        splash.className = 'cheat-menu';

        Object.assign(splash.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: `linear-gradient(135deg, ${currentTheme.background} 0%, ${currentTheme.surface} 50%, ${currentTheme.background} 100%)`,
            overflow: 'hidden',
            zIndex: '100000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        });

        document.body.appendChild(splash);

        // Animated dot grid background
        const canvas = document.createElement('canvas');
        splash.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        Object.assign(canvas.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '1'
        });

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Animated grid effect
        let time = 0;
        function drawAnimatedGrid() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const spacing = 25;
            const maxRadius = 2;

            for (let x = 0; x <= canvas.width; x += spacing) {
                for (let y = 0; y <= canvas.height; y += spacing) {
                    const distance = Math.sqrt(
                        Math.pow(x - canvas.width/2, 2) + Math.pow(y - canvas.height/2, 2)
                    );
                    const wave = Math.sin(time * 0.01 + distance * 0.01) * 0.5 + 0.5;
                    const opacity = 0.3 + wave * 0.4;
                    const radius = maxRadius * (0.5 + wave * 0.5);

                    ctx.fillStyle = `rgba(240, 196, 231, ${opacity})`;
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            time++;
            requestAnimationFrame(drawAnimatedGrid);
        }
        drawAnimatedGrid();

        // Enhanced title with subtitle
        const titleContainer = document.createElement('div');
        Object.assign(titleContainer.style, {
            position: 'relative',
            zIndex: '2',
            textAlign: 'center',
            animation: 'fadeInUp 1s ease-out'
        });

        const title = document.createElement('h1');
        title.textContent = 'Quartz.gg';
        Object.assign(title.style, {
            fontSize: '4rem',
            fontWeight: '700',
            background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.accent})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0',
            textShadow: `0 0 30px ${currentTheme.secondary}, 0 0 60px ${currentTheme.accent}`,
            letterSpacing: '1px'
        });

        const subtitle = document.createElement('p');
        subtitle.textContent = 'Pour ouvrir le menu appuyez sur Insert sur le clavier';
        Object.assign(subtitle.style, {
            fontSize: '1.2rem',
            color: currentTheme.textMuted,
            margin: '10px 0 0 0',
            fontWeight: '400'
        });

        const version = document.createElement('span');
        version.textContent = 'v6.0';
        Object.assign(version.style, {
            display: 'inline-block',
            marginLeft: '10px',// place it to the right of "Quartz.gg"
            fontSize: '0.8rem',
            color: 'white',
            background: `rgba(${parseInt(currentTheme.accent.slice(1,3),16)}, ${parseInt(currentTheme.accent.slice(3,5),16)}, ${parseInt(currentTheme.accent.slice(5,7),16)}, 0.2)`,
            padding: '2px 8px',
            borderRadius: '12px',
            border: `1px solid ${currentTheme.accent}`,
            letterSpacing: '1px',
            verticalAlign: 'super'// align it nicely with the main title
        });


        title.appendChild(version);
        titleContainer.appendChild(title);
        titleContainer.appendChild(subtitle);
        splash.appendChild(titleContainer);

        // Loading bar
        const loadingContainer = document.createElement('div');
        Object.assign(loadingContainer.style, {
            position: 'absolute',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            zIndex: '2'
        });

        const loadingBar = document.createElement('div');
        Object.assign(loadingBar.style, {
            width: '100%',
            height: '3px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '2px',
            overflow: 'hidden'
        });

        const loadingFill = document.createElement('div');
        Object.assign(loadingFill.style, {
            height: '100%',
            background: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.accent})`,
            width: '0%',
            borderRadius: '2px',
            transition: 'width 2s ease-out'
        });

        loadingBar.appendChild(loadingFill);
        loadingContainer.appendChild(loadingBar);
        splash.appendChild(loadingContainer);

        // Start loading animation
        setTimeout(() => loadingFill.style.width = '100%', 100);

        setTimeout(() => {
            splash.style.transition = 'opacity 1s ease-out';
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.remove();
                if (callback) callback();
            }, 1000);
        }, 3000);
    }

    // Enhanced menu creation with multiple tabs and features
    function createCheatMenu() {
        const menuContainer = document.createElement('div');
        menuContainer.id = 'cheat-menu-container';
        menuContainer.className = 'cheat-menu';

        Object.assign(menuContainer.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
            width: '85vw',
            maxWidth: '1400px',
            height: '85vh',
            minHeight: '600px',
            background: `var(--background-color)`,
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--border-color)`,
            color: `var(--text-color)`,
            zIndex: '99999',
            display: 'none',
            opacity: '0',
            transition: `opacity ${CONFIG.animations.duration} ${CONFIG.animations.easing}, transform ${CONFIG.animations.duration} ${CONFIG.animations.easing}`,
            overflow: 'hidden'
        });

        // Enhanced header with controls
        const menuHeader = createHeader();

        // Main content area
        const menuBody = document.createElement('main');
        Object.assign(menuBody.style, {
            display: 'flex',
            height: 'calc(100% - 70px)',
            background: `linear-gradient(135deg, rgba(25,26,30,0.5) 0%, rgba(15,16,20,0.8) 100%)`
        });

        // Enhanced sidebar with multiple tabs
        const sidebar = createSidebar();

        // Enhanced content panel
        const contentPanel = createContentPanel();

        menuBody.appendChild(sidebar);
        menuBody.appendChild(contentPanel);
        menuContainer.appendChild(menuHeader);
        menuContainer.appendChild(menuBody);

        document.body.appendChild(menuContainer);

        // Ensure elements are in the DOM before initializing listeners
        setTimeout(() => {
            initTabSwitching();
            initDragging(menuContainer, menuHeader);
            initToggleSwitches();
            initSlider();
            initializeHotkey();
        }, 100);
    }

    function createHeader() {
        const header = document.createElement('header');
        header.className = 'draggable-handle';
        Object.assign(header.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 30px',
            borderBottom: `2px solid var(--border-color)`,
            background: `var(--surface-color)`
        });

        // Logo section
        const logoSection = document.createElement('div');
        Object.assign(logoSection.style, {
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
        });

        const logo = document.createElement('span');
        logo.className = 'cheat-menu-logo';
        logo.textContent = 'Quartz.gg';
        Object.assign(logo.style, {
            fontSize: '1.8rem',
            fontWeight: '700',
            backgroundImage: `linear-gradient(135deg, var(--primary-color), var(--accent-color))`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px'
        });

        const statusIndicator = document.createElement('div');
        Object.assign(statusIndicator.style, {
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: `var(--success-color)`,
            boxShadow: `0 0 10px var(--success-color)`,
            animation: 'pulse 2s infinite'
        });

        logoSection.appendChild(logo);
        logoSection.appendChild(statusIndicator);

        // Controls section
        const controls = document.createElement('div');
        Object.assign(controls.style, {
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
        });

        // Close button
        const closeBtn = createHeaderButton('×', () => {
             const menu = document.getElementById('cheat-menu-container');
             if (menu) {
                 menu.style.opacity = '0';
                 setTimeout(() => menu.style.display = 'none', 300);
             }
        });

        // Settings button
        const settingsBtn = createHeaderButton('⚙', () => {
            switchToTab('settings');
        });

        controls.appendChild(settingsBtn);
        controls.appendChild(closeBtn);

        header.appendChild(logoSection);
        header.appendChild(controls);

        return header;
    }

    function createHeaderButton(text, onClick) {
        const btn = document.createElement('button');
        btn.textContent = text;
        Object.assign(btn.style, {
            width: '32px',
            height: '32px',
            border: 'none',
            borderRadius: '8px',
            background: `rgba(255,255,255,0.1)`,
            color: `var(--text-color)`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            transition: `all ${CONFIG.animations.duration} ${CONFIG.animations.easing}`
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.background = `rgba(255,255,255,0.2)`;
            btn.style.transform = 'scale(1.1)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.background = `rgba(255,255,255,0.1)`;
            btn.style.transform = 'scale(1)';
        });

        btn.addEventListener('click', onClick);
        return btn;
    }

    function createSidebar() {
        const sidebar = document.createElement('nav');
        Object.assign(sidebar.style, {
            width: '250px',
            background: `var(--surface-color)`,
            borderRight: `1px solid var(--border-color)`,
            paddingTop: '25px',
            display: 'flex',
            flexDirection: 'column'
        });

        const tabs = [
            { id: 'legitbot', icon: '🎯', label: 'IA', color: darkTheme.primary },
            { id: 'visuals', icon: '👁', label: 'Visuels', color: darkTheme.secondary },
            { id: 'misc', icon: '⚡', label: 'Autres', color: darkTheme.accent },
            { id: 'settings', icon: '⚙', label: 'Paramètres', color: darkTheme.warning }
        ];

        tabs.forEach((tab, index) => {
            const tabButton = createTabButton(tab);
            if (index === 0) tabButton.classList.add('active');
            sidebar.appendChild(tabButton);
        });

        // Add footer info
        const footer = document.createElement('div');
        Object.assign(footer.style, {
            marginTop: 'auto',
            padding: '20px',
            borderTop: `1px solid var(--border-color)`,
            fontSize: '0.8rem',
            color: `var(--text-muted-color)`,
            textAlign: 'center'
        });
        footer.innerHTML = `
            <div style="margin-bottom: 8px;">Status: <span style="color: var(--success-color)">Actif</span></div>
            <div>Appuyez sur <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">Insert</kbd> pour activer</div>
        `;
        sidebar.appendChild(footer);

        return sidebar;
    }

    function createTabButton(tab) {
        const button = document.createElement('button');
        button.dataset.tabId = tab.id;
        button.className = 'tab-button';

        Object.assign(button.style, {
            display: 'flex',
            alignItems: 'center',
            padding: '15px 20px',
            margin: '0 15px 10px 15px',
            border: 'none',
            borderRadius: '10px',
            background: 'transparent',
            color: `var(--text-muted-color)`,
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: `all ${CONFIG.animations.duration} ${CONFIG.animations.easing}`,
            position: 'relative',
            overflow: 'hidden'
        });

        const icon = document.createElement('span');
        icon.textContent = tab.icon;
        Object.assign(icon.style, {
            fontSize: '1.2rem',
            marginRight: '12px',
            filter: 'grayscale(1)'
        });

        const label = document.createElement('span');
        label.textContent = tab.label;

        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        Object.assign(indicator.style, {
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '3px',
            height: '0%',
            background: tab.color,
            borderRadius: '0 2px 2px 0',
            transition: `height ${CONFIG.animations.duration} ${CONFIG.animations.easing}`
        });

        button.appendChild(indicator);
        button.appendChild(icon);
        button.appendChild(label);

        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('active')) {
                button.style.background = `rgba(255,255,255,0.05)`;
                button.style.color = `var(--text-color)`;
                icon.style.filter = 'grayscale(0)';
            }
        });

        button.addEventListener('mouseleave', () => {
            if (!button.classList.contains('active')) {
                button.style.background = 'transparent';
                button.style.color = `var(--text-muted-color)`;
                icon.style.filter = 'grayscale(1)';
            }
        });

        return button;
    }

    function createContentPanel() {
        const panel = document.createElement('section');
        Object.assign(panel.style, {
            flexGrow: '1',
            padding: '30px',
            overflowY: 'auto'
        });
        panel.className = 'cheat-menu-scrollbar';

        // Create content for each tab
        const tabContents = {
            legitbot: createLegitbotContent(),
            visuals: createVisualsContent(),
            misc: createMiscContent(),
            settings: createSettingsContent()
        };

        Object.entries(tabContents).forEach(([id, content]) => {
            const tabDiv = document.createElement('div');
            tabDiv.dataset.tabContent = id;
            tabDiv.style.display = id === 'legitbot' ? 'block' : 'none';
            tabDiv.appendChild(content);
            panel.appendChild(tabDiv);
        });

        return panel;
    }

    // Functions to create the content for each tab
    function createLegitbotContent() {
        const container = document.createElement('div');
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; height: 100%;">
                <div class="config-section">
                    <h2 style="font-size: 1.5rem; margin-bottom: 25px; color: var(--primary-color); display: flex; align-items: center; gap: 10px;">
                        <span>🎯</span> Configuration de L'IA
                    </h2>

                    <div class="setting-group" style="margin-bottom: 25px;">
                        <h3 style="font-size: 1.1rem; margin-bottom: 15px; color: var(--text-color);">Génerale</h3>
                        <div class="toggle-setting" data-setting="enable-legit">
                            <span>Activation de l'IA</span>
                            <div class="toggle-switch"></div>
                        </div>
                        <div class="toggle-setting" data-setting="draw-fov">
                            <span>Utiliser les valeurs par défault</span>
                            <div class="toggle-switch"></div>
                        </div>
                    </div>

                    <div class="setting-group" style="margin-bottom: 25px;">
                        <h3 style="font-size: 1.1rem; margin-bottom: 15px; color: var(--text-color);">Paramètres de L'IA</h3>
                        <div class="number-setting">
                            <label>Température</label>
                            <input type="number" value="0.3" min="0" max="1" step="0.1" class="number-input">
                        </div>
                        <div class="number-setting">
                            <label>Nucleus Sampling</label>
                            <input type="number" value="0.9" min="0" max="1" step="0.5" class="number-input">
                        </div>
                        <div class="slider-setting" data-setting="smooth">
                            <label>Token Max Utilisé <span class="slider-value">0%</span></label>
                            <div class="enhanced-slider" data-value="50"></div>
                        </div>
                    </div>
                </div>

                <div class="config-section">
                    <h2 style="font-size: 1.5rem; margin-bottom: 25px; color: var(--secondary-color); display: flex; align-items: center; gap: 10px;">
                        <span>⚙</span> Paramètres avancés
                    </h2>

                    <div class="setting-group" style="margin-bottom: 25px;">
                        <h3 style="font-size: 1.1rem; margin-bottom: 15px; color: var(--text-color);">Target Priority</h3>
                        <div class="dropdown-setting">
                            <label>Paramètre de Hit</label>
                            <select class="enhanced-dropdown">
                                <option value="head-chest">Geométrie & Equations</option>
                                <option value="head-only">Calculs</option>
                                <option value="chest-only">Graphique</option>
                                <option value="body">Absolument Tout</option>
                            </select>
                        </div>
                        <div class="toggle-setting" data-setting="prefer-body">
                            <span>Préférer les Capture D'écrans</span>
                            <div class="toggle-switch"></div>
                        </div>
                    </div>

                    <div class="setting-group">
                        <h3 style="font-size: 1.1rem; margin-bottom: 15px; color: var(--text-color);">Automation</h3>
                        <div class="toggle-setting" data-setting="auto-fire">
                            <span>Capture Automatique</span>
                            <div class="toggle-switch"></div>
                        </div>
                        <div class="number-setting">
                            <label>Delay de Detection(ms)</label>
                            <input type="number" value="0" min="0" max="500" step="10" class="number-input">
                        </div>
                    </div>
                </div>
            </div>
        `;
        return container;
    }

    function createVisualsContent() {
        const container = document.createElement('div');
        container.innerHTML = `
            <h2 style="font-size: 1.5rem; margin-bottom: 25px; color: var(--secondary-color);">
                <span>👁</span> Configuration des Visuels
            </h2>
            <div class="setting-group">
                <h3 style="font-size: 1.1rem; margin-bottom: 15px; color: var(--text-color);">General Visuals</h3>
                <div class="toggle-setting" data-setting="enable-esp">
                    <span>Activation des Boites</span>
                    <div class="toggle-switch"></div>
                </div>
                <div class="toggle-setting" data-setting="show-player-names">
                    <span>Montrer le type de Maths.</span>
                    <div class="toggle-switch"></div>
                </div>
                <div class="toggle-setting" data-setting="show-health">
                    <span>Montrer la confidance de l'IA</span>
                    <div class="toggle-switch"></div>
                </div>
            </div>
            <div class="setting-group">
                <h3 style="font-size: 1.1rem; margin-bottom: 15px; color: var(--text-color);">Visuels Avancées</h3>
                <div class="toggle-setting" data-setting="glow-effect">
                    <span>Effect de Néons</span>
                    <div class="toggle-switch"></div>
                </div>
                <div class="number-setting">
                    <label>Luminosité des Néons</label>
                    <input type="number" value="1.0" min="0.1" max="5.0" step="0.1" class="number-input">
                </div>
            </div>
        `;
        return container;
    }

    function createMiscContent() {
        const container = document.createElement('div');
        container.innerHTML = `
            <h2 style="font-size: 1.5rem; margin-bottom: 25px; color: var(--accent-color);">
                <span>⚡</span> Options Divers
            </h2>
            <div class="setting-group">
                <h3 style="font-size: 1.1rem; margin-bottom: 15px; color: var(--text-color);">General</h3>
                <div class="toggle-setting" data-setting="auto-bhop">
                    <span>Auto Correction</span>
                    <div class="toggle-switch"></div>
                </div>
                <div class="toggle-setting" data-setting="anti-kick">
                    <span>Anti-Detections</span>
                    <div class="toggle-switch"></div>
                </div>
            </div>
            <div class="setting-group">
                <h3 style="font-size: 1.1rem; margin-bottom: 15px; color: var(--text-color);">Automation</h3>
                <div class="dropdown-setting">
                    <label>Auto Accepte a la fin de l'exercise</label>
                    <select class="enhanced-dropdown">
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                    </select>
                </div>
                <div class="number-setting">
                    <label>Delai de l'automatisme(ms)</label>
                    <input type="number" value="1" min="0" max="10" step="1" class="number-input">
                </div>
            </div>
        `;
        return container;
    }

    function createSettingsContent() {
        const container = document.createElement('div');
        container.innerHTML = `
            <h2 style="font-size: 1.5rem; margin-bottom: 25px; color: var(--warning-color);">
                <span>⚙</span> Paramètres
            </h2>
            <div class="setting-group">
                <h3 style="font-size: 1.1rem; margin-bottom: 15px; color: var(--text-color);">Interace Utilisateur</h3>
                <div class="toggle-setting" data-setting="light-theme">
                    <span>Theme Blanc (En Développement)</span>
                    <div class="toggle-switch"></div>
                </div>
                <div class="toggle-setting" data-setting="notifications">
                    <span>Montrer les Notifications</span>
                    <div class="toggle-switch"></div>
                </div>
            </div>
            <div class="setting-group">
                <h3 style="font-size: 1.1rem; margin-bottom: 15px; color: var(--text-color);">Touches</h3>
                <div class="number-setting">
                    <label>Touche du Menu</label>
                    <input type="text" value="Insert" class="number-input" style="width: 80px; text-align: center;">
                </div>
            </div>
        `;
        return container;
    }

    function initTabSwitching() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.tab-button');
            if (!button) return;

            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const tabId = button.dataset.tabId;
            document.querySelectorAll('[data-tab-content]').forEach(contentDiv => {
                contentDiv.style.display = contentDiv.dataset.tabContent === tabId ? 'block' : 'none';
            });
        });
    }

    function initialTransformFix(menu) {
        const menuRect = menu.getBoundingClientRect();
        menu.style.top = `${menuRect.top}px`;
        menu.style.left = `${menuRect.left}px`;
        menu.style.transform = 'none';
        menu.classList.add('initialized-menu');
    }

    function initDragging(menu, dragHandle) {
        if (!menu || !dragHandle) {
            console.error("Quartz.gg: Dragging elements not found.");
            return;
        }

        let isDragging = false;
        let offset = { x: 0, y: 0 };
        let currentPos = { x: 0, y: 0 };
        let targetPos = { x: 0, y: 0 };
        let velocity = { x: 0, y: 0 };
        let animFrame;
        const damping = 0.15;
        const friction = 0.95;
        const threshold = 0.5;

        const updatePosition = () => {
            if (isDragging) {
                velocity.x = (targetPos.x - currentPos.x) * damping;
                velocity.y = (targetPos.y - currentPos.y) * damping;
            } else {
                velocity.x *= friction;
                velocity.y *= friction;
            }

            currentPos.x += velocity.x;
            currentPos.y += velocity.y;

            menu.style.left = `${currentPos.x}px`;
            menu.style.top = `${currentPos.y}px`;

            if (!isDragging && Math.abs(velocity.x) < threshold && Math.abs(velocity.y) < threshold) {
                cancelAnimationFrame(animFrame);
                animFrame = null;
                return;
            }

            animFrame = requestAnimationFrame(updatePosition);
        };

        dragHandle.addEventListener('mousedown', (e) => {
            if (e.target.tagName.toLowerCase() === 'button' || e.button !== 0) {
                return;
            }

            const menuRect = menu.getBoundingClientRect();
            menu.style.top = `${menuRect.top}px`;
            menu.style.left = `${menuRect.left}px`;
            menu.style.transform = 'none';
            menu.classList.add('initialized-menu');

            isDragging = true;
            offset.x = e.clientX - menuRect.left;
            offset.y = e.clientY - menuRect.top;

            currentPos.x = menuRect.left;
            currentPos.y = menuRect.top;
            targetPos.x = e.clientX - offset.x;
            targetPos.y = e.clientY - offset.y;

            menu.style.transition = 'none';
            dragHandle.classList.add('dragging');
            menu.style.transform = 'scale(1.01)';

            document.body.style.userSelect = 'none';
            e.preventDefault();

            if (!animFrame) {
                updatePosition();
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            dragHandle.classList.remove('dragging');
            menu.style.transition = `transform ${CONFIG.animations.duration} ${CONFIG.animations.easing}`;
            menu.style.transform = 'scale(1)';
            document.body.style.userSelect = 'auto';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) {
                return;
            }

            const menuRect = menu.getBoundingClientRect();
            const maxX = window.innerWidth - menuRect.width;
            const maxY = window.innerHeight - menuRect.height;
            let newX = e.clientX - offset.x;
            let newY = e.clientY - offset.y;
            targetPos.x = Math.max(0, Math.min(newX, maxX));
            targetPos.y = Math.max(0, Math.min(newY, maxY));
        });
    }

    function initToggleSwitches() {
        document.querySelectorAll('.toggle-setting').forEach(setting => {
            const toggle = setting.querySelector('.toggle-switch');
            if (toggle) {
                setting.addEventListener('click', () => {
                    const settingName = setting.dataset.setting;
                    const isActive = !toggle.classList.contains('active');
                    toggle.classList.toggle('active');

                    if (settingName === 'light-theme') {
                        setTheme(isActive);
                    }
                });
            }
        });
    }

    function initSlider() {
        const sliders = document.querySelectorAll('.enhanced-slider');

        sliders.forEach(slider => {
            let isSliding = false;
            const valueSpan = slider.closest('.slider-setting').querySelector('.slider-value');

            const updateSlider = (e) => {
                const rect = slider.getBoundingClientRect();
                const x = e.clientX - rect.left;
                let percentage = (x / rect.width) * 100;
                percentage = Math.max(0, Math.min(100, percentage));
                slider.style.setProperty('--slider-value', `${percentage}%`);
                if (valueSpan) {
                    valueSpan.textContent = `${Math.round(percentage)}%`;
                }
            };

            const handleMouseDown = (e) => {
                isSliding = true;
                updateSlider(e);
                e.preventDefault();
            };

            const handleMouseMove = (e) => {
                if (isSliding) {
                    updateSlider(e);
                }
            };

            const handleMouseUp = () => {
                isSliding = false;
            };

            slider.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        });
    }

    function initializeHotkey() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Insert' || e.key === 'ins') {
                e.preventDefault();
                const menuContainer = document.getElementById('cheat-menu-container');
                if (!menuContainer) {
                    console.error("Quartz.gg: Menu container not found for hotkey.");
                    return;
                }

                if (menuContainer.style.display === 'none') {
                    // Menu is hidden, so show it with transitions
                    menuContainer.style.display = 'block';
                    setTimeout(() => {
                        menuContainer.style.opacity = '1';
                        menuContainer.style.transform = 'translate(-50%, -50%)';
                    }, 10);
                } else {
                    // Menu is visible, so fade it out and then hide it
                    menuContainer.style.opacity = '0';
                    menuContainer.style.transform = 'translate(-50%, -60%)';
                    setTimeout(() => {
                        menuContainer.style.display = 'none';
                    }, 300);
                }
            }
        });
    }

    // Main entry point for the script
    if (document.body) {
        showSplash(() => {
            createCheatMenu();
        });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            showSplash(() => {
                createCheatMenu();
            });
        });
    }
})();