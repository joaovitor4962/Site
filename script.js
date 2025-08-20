// ========================================
// VALIDADOR DE FORMULÁRIOS
// ========================================
const FormValidator = {
    validateField: (field) => {
        field.classList.remove('is-invalid', 'is-valid');
        
        if (!field.hasAttribute('required') && !field.value.trim()) {
            return true; // Campo opcional vazio é válido
        }
        
        let isValid = true;
        const value = field.value.trim();
        
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                break;
                
            case 'tel':
                const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/;
                isValid = !value || phoneRegex.test(value.replace(/\D/g, ''));
                break;
                
            default:
                if (field.hasAttribute('required')) {
                    isValid = value.length >= (field.dataset.minLength || 2);
                }
                break;
        }
        
        if (field.tagName === 'TEXTAREA' && field.hasAttribute('required')) {
            isValid = value.length >= 10;
        }
        
        if (field.type === 'checkbox' && field.hasAttribute('required')) {
            isValid = field.checked;
        }
        
        field.classList.add(isValid ? 'is-valid' : 'is-invalid');
        return isValid;
    },
    
    validateForm: (form) => {
        const fields = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!FormValidator.validateField(field)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    },
    
    setupPhoneMask: (phoneInput) => {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                }
            }
            
            e.target.value = value;
        });
    }
};

// ========================================
// CONFIGURAÇÕES GLOBAIS
// ========================================
const CONFIG = {
    SESSION_TIMEOUT: 2 * 60 * 60 * 1000, // 2 horas
    CHECK_INTERVAL: 5 * 60 * 1000, // 5 minutos
    EMAILJS: {
        PUBLIC_KEY: "AkmRbbP2sZ2SFfDs-", // Substitua pela sua Public Key
        SERVICE_ID: "service_8qgfce9", // Substitua pelo seu Service ID
        TEMPLATE_ID: "template_c5uwio5" // Substitua pelo seu Template ID
    }
};

// ========================================
// UTILITÁRIOS
// ========================================
const Utils = {
    formatDate: (timestamp) => new Date(parseInt(timestamp)).toLocaleString('pt-BR'),
    
    formatFileSize: (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    sanitizeInput: (input) => {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },

    debounce: (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    }
};

// ========================================
// GERENCIAMENTO DE SESSÃO
// ========================================
const SessionManager = {
    setUser: (username, userType) => {
        const loginTime = Date.now().toString();
        sessionStorage.setItem('userAuthenticated', 'true');
        sessionStorage.setItem('userType', userType);
        sessionStorage.setItem('loginTime', loginTime);
        sessionStorage.setItem('userName', username);
        
        console.log(`✅ Usuário autenticado: ${userType} - Login: ${Utils.formatDate(loginTime)}`);
    },

    getUser: () => ({
        isAuthenticated: sessionStorage.getItem('userAuthenticated') === 'true',
        userType: sessionStorage.getItem('userType'),
        loginTime: sessionStorage.getItem('loginTime'),
        userName: sessionStorage.getItem('userName')
    }),

    isValid: () => {
        const { isAuthenticated, userType, loginTime } = SessionManager.getUser();
        
        if (!isAuthenticated || !userType || !loginTime) {
            return false;
        }
        
        const currentTime = Date.now();
        const sessionAge = currentTime - parseInt(loginTime);
        
        return sessionAge <= CONFIG.SESSION_TIMEOUT;
    },

    clear: () => {
        sessionStorage.clear();
        console.log(`🚪 Logout realizado em ${new Date().toLocaleString('pt-BR')}`);
    },

    checkAndRedirect: () => {
        const restrictedPages = ['pagina1.html', 'pagina2.html'];
        const currentPage = window.location.pathname;
        
        if (restrictedPages.some(page => currentPage.includes(page))) {
            if (!SessionManager.isValid()) {
                SessionManager.clear();
                NotificationManager.alert('⚠️ Acesso negado!\n\nVocê precisa fazer login para acessar esta área restrita.');
                window.location.href = 'index.html';
                return false;
            }
        }
        return true;
    },

    displayInfo: () => {
        const { userType, loginTime } = SessionManager.getUser();
        
        if (userType && loginTime) {
            const sessionDuration = Math.floor((Date.now() - parseInt(loginTime)) / 60000);
            console.log(`👤 Usuário: ${userType}`);
            console.log(`🕐 Login: ${Utils.formatDate(loginTime)}`);
            console.log(`⏱️ Sessão ativa há: ${sessionDuration} minutos`);
        }
    }
};

// ========================================
// GERENCIAMENTO DE NOTIFICAÇÕES
// ========================================
const NotificationManager = {
    alert: (message) => {
        alert(message);
    },

    toast: (message, type = 'info') => {
        const icons = {
            success: 'bi-check-circle',
            error: 'bi-x-circle',
            warning: 'bi-exclamation-triangle',
            info: 'bi-info-circle'
        };

        const toastHtml = `
            <div class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="bi ${icons[type] || icons.info} me-2"></i>${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;

        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }

        toastContainer.insertAdjacentHTML('beforeend', toastHtml);

        const toastElement = toastContainer.lastElementChild;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }
};

// ========================================
// SISTEMA DE AUTENTICAÇÃO
// ========================================
const AuthSystem = {
    // ATENÇÃO: Em produção, essas credenciais devem estar em um servidor seguro
    users: {
        'admin': { 
            password: 'VI@i05ti', 
            redirect: 'pagina1.html',
            role: 'administrator'
        },
        'tecnico': { 
            password: 'tecnico@#25', 
            redirect: 'pagina2.html',
            role: 'technician'
        }
    },

    validateCredentials: (username, password) => {
        const user = AuthSystem.users[username];
        return user && user.password === password;
    },

    login: (username, password) => {
        const sanitizedUsername = Utils.sanitizeInput(username.trim());
        const user = AuthSystem.users[sanitizedUsername];

        if (AuthSystem.validateCredentials(sanitizedUsername, password)) {
            SessionManager.setUser(sanitizedUsername, sanitizedUsername);
            return { success: true, redirect: user.redirect };
        } else {
            console.warn(`❌ Tentativa de login falhada: ${sanitizedUsername} em ${new Date().toLocaleString('pt-BR')}`);
            return { success: false, error: 'Usuário ou senha incorretos.' };
        }
    },

    logout: () => {
        const { userType } = SessionManager.getUser();
        const confirmMessage = userType === 'admin' ? 
            'Deseja realmente sair do painel administrativo?' : 
            'Deseja realmente sair do centro de download?';
            
        if (confirm(confirmMessage)) {
            SessionManager.clear();
            NotificationManager.toast('👋 Logout realizado com sucesso!', 'info');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    }
};

// ========================================
// SISTEMA DE ARQUIVOS
// ========================================
const FileSystem = {
    categories: {
        'programas': [
            { name: 'TeamViewer 15', file: 'teamviewer.exe', size: '45.2 MB', description: 'Acesso remoto' },
            { name: 'Google Chrome', file: 'chrome-installer.exe', size: '1.2 MB', description: 'Navegador web' },
            { name: 'Mozilla Firefox', file: 'firefox-setup.exe', size: '52.8 MB', description: 'Navegador web' },
            { name: 'VLC Media Player', file: 'vlc-media-player.exe', size: '38.5 MB', description: 'Player multimídia' },
            { name: '7-Zip', file: '7zip-installer.exe', size: '1.4 MB', description: 'Compactador' },
            { name: 'Notepad++', file: 'notepad-plus.exe', size: '4.1 MB', description: 'Editor de texto' },
            { name: 'Adobe Reader', file: 'adobe-reader.exe', size: '156 MB', description: 'Leitor de PDF' },
            { name: 'WinRAR', file: 'winrar-installer.exe', size: '3.2 MB', description: 'Compactador' },
            { name: 'Zoom', file: 'zoom-installer.exe', size: '4.8 MB', description: 'Videoconferência' },
            { name: 'Skype', file: 'skype-installer.exe', size: '56.2 MB', description: 'Comunicação' },
            { name: 'Office 365', file: 'office-installer.exe', size: '3.8 MB', description: 'Suíte office' },
            { name: 'Antivírus Empresarial', file: 'antivirus-setup.exe', size: '248 MB', description: 'Segurança' }
        ],
        'arquivos': [
            { name: 'Backup Configurações', file: 'backup-config.zip', size: '12.4 MB', description: 'Backup de configs' },
            { name: 'Backup Sistema', file: 'system-backup.rar', size: '456 MB', description: 'Backup completo' },
            { name: 'Export Database', file: 'database-export.sql', size: '89.1 MB', description: 'Exportação BD' },
            { name: 'Templates Config', file: 'config-templates.zip', size: '2.3 MB', description: 'Templates' },
            { name: 'Perfis Usuário', file: 'user-profiles.zip', size: '15.7 MB', description: 'Perfis de usuário' },
            { name: 'Configurações Rede', file: 'network-settings.txt', size: '145 KB', description: 'Config de rede' },
            { name: 'Regras Firewall', file: 'firewall-rules.xml', size: '89 KB', description: 'Regras firewall' },
            { name: 'Políticas Segurança', file: 'security-policies.json', size: '234 KB', description: 'Políticas' }
        ],
        'imagens': [
            { name: 'Logo IT Cloud', file: 'logo-it-cloud.png', size: '245 KB', description: 'Logo da empresa' },
            { name: 'Banner Principal', file: 'banner-principal.png', size: '1.2 MB', description: 'Banner site' },
            { name: 'Wallpaper Corporativo', file: 'wallpaper-corporativo.png', size: '3.4 MB', description: 'Papel de parede' },
            { name: 'Ícones Sistema', file: 'icones-sistema.zip', size: '890 KB', description: 'Ícones' },
            { name: 'Templates Design', file: 'templates-design.psd', size: '45.6 MB', description: 'Templates PSD' }
        ],
        'documentos': [
            { name: 'Manual do Usuário', file: 'manual-usuario.pdf', size: '3.2 MB', description: 'Manual completo' },
            { name: 'Guia de Instalação', file: 'guia-instalacao.docx', size: '1.8 MB', description: 'Guia passo-a-passo' },
            { name: 'Políticas de TI', file: 'politicas-ti.pdf', size: '956 KB', description: 'Políticas internas' },
            { name: 'Template Contrato', file: 'contrato-template.doc', size: '234 KB', description: 'Modelo contrato' }
        ],
        'scripts': [
            { name: 'Auto Update', file: 'auto-update.ps1', size: '3.4 KB', description: 'Script atualização' },
            { name: 'Backup Automático', file: 'backup-automatico.bat', size: '1.2 KB', description: 'Script backup' },
            { name: 'Limpeza Sistema', file: 'limpeza-sistema.cmd', size: '890 B', description: 'Limpeza automática' }
        ],
        'drivers': [
            { name: 'Driver Impressora HP', file: 'driver-impressora-hp.exe', size: '89.4 MB', description: 'Driver HP' },
            { name: 'Driver Placa de Vídeo', file: 'driver-placa-video.zip', size: '456 MB', description: 'Driver GPU' }
        ]
    },

    getFiles: (category) => {
        return FileSystem.categories[category] || [];
    },

    checkFileExists: async (filePath) => {
        try {
            const response = await fetch(filePath, { method: 'HEAD' });
            return response.ok;
        } catch {
            return false;
        }
    }
};

// ========================================
// INTERFACE DE USUÁRIO
// ========================================
const UIManager = {
    showLoading: () => {
        const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
        loadingModal.show();
        return loadingModal;
    },

    showCategoryFiles: (category) => {
        if (!SessionManager.isValid()) return;
        
        const files = FileSystem.getFiles(category);
        const { userType } = SessionManager.getUser();
        
        let fileListHtml = `
            <div class="modal fade" id="fileListModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="bi bi-folder-open me-2"></i>
                                Arquivos: ${category.charAt(0).toUpperCase() + category.slice(1)}
                            </h5>
                            <small class="text-muted ms-2">👤 ${userType}</small>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-3">
        `;

        files.forEach(file => {
            fileListHtml += `
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body p-3">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="bg-primary bg-opacity-10 rounded p-2 me-3">
                                        <i class="bi bi-file-earmark text-primary"></i>
                                    </div>
                                    <div>
                                        <h6 class="mb-1">${Utils.sanitizeInput(file.name)}</h6>
                                        <small class="text-muted">${file.size} • ${file.description || category}</small>
                                    </div>
                                </div>
                                <button class="btn btn-primary btn-sm" 
                                        onclick="DownloadManager.download('arquivos/${category}/${file.file}')">
                                    <i class="bi bi-download me-1"></i>Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        fileListHtml += `
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="text-muted">
                                <i class="bi bi-info-circle me-1"></i>
                                ${files.length} arquivo(s) disponível(eis) nesta categoria
                            </div>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove modal existente se houver
        const existingModal = document.getElementById('fileListModal');
        if (existingModal) {
            existingModal.remove();
        }

        document.body.insertAdjacentHTML('beforeend', fileListHtml);

        const modal = new bootstrap.Modal(document.getElementById('fileListModal'));
        modal.show();
    },

    openCategory: (category) => {
        if (!SessionManager.isValid()) return;
        
        const loadingModal = UIManager.showLoading();

        setTimeout(() => {
            loadingModal.hide();
            UIManager.showCategoryFiles(category);
        }, 1500);
    }
};

// ========================================
// GERENCIADOR DE DOWNLOADS
// ========================================
const DownloadManager = {
    download: async (filePath) => {
        if (!SessionManager.isValid()) return;
        
        const loadingModal = UIManager.showLoading();

        try {
            // Simula verificação do arquivo
            setTimeout(async () => {
                loadingModal.hide();

                // Cria link de download
                const link = document.createElement('a');
                link.href = filePath;
                link.download = filePath.split('/').pop();
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                NotificationManager.toast('📥 Download iniciado com sucesso!', 'success');
                
                const { userType } = SessionManager.getUser();
                console.log(`📥 Download: ${filePath} | Usuário: ${userType} | ${new Date().toISOString()}`);
            }, 1000);

        } catch (error) {
            loadingModal.hide();
            NotificationManager.toast('❌ Erro ao iniciar download', 'error');
            console.error('Erro no download:', error);
        }
    }
};

// ========================================
// SISTEMA DE BUSCA
// ========================================
const SearchManager = {
    searchFiles: Utils.debounce(() => {
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const categories = document.querySelectorAll('.download-category');

        if (searchTerm === '') {
            categories.forEach(cat => {
                cat.style.display = 'block';
            });
            return;
        }

        categories.forEach(cat => {
            const categoryName = cat.dataset.category?.toLowerCase() || '';
            const cardText = cat.textContent.toLowerCase();

            if (categoryName.includes(searchTerm) || cardText.includes(searchTerm)) {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
    }, 300),

    filterByCategory: () => {
        const filter = document.getElementById('categoryFilter')?.value || 'all';
        const categories = document.querySelectorAll('.download-category');

        categories.forEach(cat => {
            if (filter === 'all' || cat.dataset.category === filter) {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
    }
};

// ========================================
// SISTEMA DE EMAIL
// ========================================
const EmailManager = {
    isInitialized: false,

    init: () => {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(CONFIG.EMAILJS.PUBLIC_KEY);
            EmailManager.isInitialized = true;
            console.log('✅ EmailJS inicializado com sucesso');
        } else {
            console.warn('⚠️ EmailJS não encontrado. Certifique-se de incluir o script do EmailJS.');
        }
    },

    validateForm: (formData) => {
        const errors = [];
        
        if (!formData.from_name || formData.from_name.trim().length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres');
        }
        
        if (!formData.from_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) {
            errors.push('Email inválido');
        }
        
        if (!formData.message || formData.message.trim().length < 10) {
            errors.push('Mensagem deve ter pelo menos 10 caracteres');
        }
        
        return errors;
    },

    formatPhoneNumber: (phone) => {
        if (!phone) return '';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
        }
        return phone;
    },

    sendContact: async (formData) => {
        if (!EmailManager.isInitialized) {
            NotificationManager.toast('❌ Serviço de email não inicializado', 'error');
            return { success: false, error: 'EmailJS não inicializado' };
        }

        // Validação dos dados
        const validationErrors = EmailManager.validateForm(formData);
        if (validationErrors.length > 0) {
            NotificationManager.toast(`❌ ${validationErrors[0]}`, 'error');
            return { success: false, error: validationErrors };
        }

        try {
            // Prepara os dados para o template
            const templateParams = {
                from_name: Utils.sanitizeInput(formData.from_name),
                from_email: formData.from_email,
                company: Utils.sanitizeInput(formData.company || 'Não informado'),
                phone: EmailManager.formatPhoneNumber(formData.phone || 'Não informado'),
                service_interest: formData.service_interest || 'Não especificado',
                message: Utils.sanitizeInput(formData.message),
                to_email: 'contato@itcloudsolutions.com.br',
                reply_to: formData.from_email,
                timestamp: new Date().toLocaleString('pt-BR')
            };

            console.log('📧 Enviando email...', templateParams);

            const response = await emailjs.send(
                CONFIG.EMAILJS.SERVICE_ID,
                CONFIG.EMAILJS.TEMPLATE_ID,
                templateParams
            );

            console.log('✅ Email enviado com sucesso:', response);
            NotificationManager.toast('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            
            return { success: true, response };

        } catch (error) {
            console.error('❌ Erro ao enviar email:', error);
            
            let errorMessage = 'Erro ao enviar mensagem. ';
            if (error.status === 400) {
                errorMessage += 'Dados inválidos.';
            } else if (error.status === 403) {
                errorMessage += 'Serviço não autorizado.';
            } else if (error.status === 413) {
                errorMessage += 'Mensagem muito longa.';
            } else {
                errorMessage += 'Tente novamente ou entre em contato por telefone.';
            }
            
            NotificationManager.toast(`❌ ${errorMessage}`, 'error');
            return { success: false, error };
        }
    },

    // Função para envio via formulário HTML (compatibilidade)
    sendForm: async (form) => {
        const formData = new FormData(form);
        const data = {
            from_name: formData.get('from_name') || formData.get('nome'),
            from_email: formData.get('from_email') || formData.get('email'),
            company: formData.get('company') || formData.get('empresa'),
            phone: formData.get('phone') || formData.get('telefone'),
            service_interest: formData.get('service_interest') || formData.get('servico'),
            message: formData.get('message') || formData.get('mensagem')
        };

        const result = await EmailManager.sendContact(data);
        
        if (result.success) {
            form.reset();
            // Remove classes de validação se existirem
            const validatedFields = form.querySelectorAll('.is-valid, .is-invalid');
            validatedFields.forEach(field => {
                field.classList.remove('is-valid', 'is-invalid');
            });
        }
        
        return result;
    }
};

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Verifica sessão ao carregar página
    SessionManager.checkAndRedirect();
    
    // Inicializa EmailJS
    EmailManager.init();
    
    // Configura formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username')?.value || '';
            const password = document.getElementById('password')?.value || '';
            const loginError = document.getElementById('loginError');
            
            const result = AuthSystem.login(username, password);
            
            if (result.success) {
                if (loginError) {
                    loginError.style.display = 'none';
                }
                
                const modalEl = document.getElementById('loginModal');
                if (modalEl) {
                    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                    modal.hide();
                }
                
                NotificationManager.toast(`✅ Login realizado com sucesso! Bem-vindo, ${username}!`, 'success');
                
                setTimeout(() => {
                    window.location.href = result.redirect;
                }, 1000);
                
            } else {
                if (loginError) {
                    loginError.style.display = 'block';
                    loginError.textContent = result.error;
                }
            }
        });
    }
    
    // Configura formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';
            
            try {
                // Mostra loading se o botão existir
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.classList.add('loading');
                    if (submitBtn.querySelector('.btn-text')) {
                        submitBtn.querySelector('.btn-text').style.display = 'none';
                    }
                    if (submitBtn.querySelector('.loading-spinner')) {
                        submitBtn.querySelector('.loading-spinner').style.display = 'inline-block';
                    }
                }
                
                // Envia o email usando EmailJS
                await EmailManager.sendForm(this);
                
            } catch (error) {
                console.error('Erro no envio:', error);
                NotificationManager.toast('❌ Erro inesperado ao enviar mensagem', 'error');
            } finally {
                // Remove loading se o botão existir
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    if (submitBtn.querySelector('.btn-text')) {
                        submitBtn.querySelector('.btn-text').style.display = '';
                    }
                    if (submitBtn.querySelector('.loading-spinner')) {
                        submitBtn.querySelector('.loading-spinner').style.display = 'none';
                    }
                }
            }
        });
        
        // Adiciona validação em tempo real
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                FormValidator.validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    FormValidator.validateField(this);
                }
            });
        });
    }
    
    // Configura modal de login
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.addEventListener('hidden.bs.modal', function() {
            const loginError = document.getElementById('loginError');
            const loginForm = document.getElementById('loginForm');
            
            if (loginError) loginError.style.display = 'none';
            if (loginForm) loginForm.reset();
        });
    }
    
    // Configura busca
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', SearchManager.searchFiles);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                SearchManager.searchFiles();
            }
        });
    }
    
    // Adiciona efeitos visuais
    const downloadCards = document.querySelectorAll('.download-card, .admin-card');
    downloadCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Configura máscaras e validações para campos específicos
    const phoneFields = document.querySelectorAll('input[type="tel"], input[id*="phone"], input[id*="telefone"]');
    phoneFields.forEach(field => {
        FormValidator.setupPhoneMask(field);
    });
    
    // Mostra informações da sessão
    SessionManager.displayInfo();
});

// Verificação periódica da sessão
setInterval(() => {
    if (!SessionManager.isValid()) {
        NotificationManager.alert('⏰ Sua sessão expirou!\n\nPor favor, faça login novamente.');
        SessionManager.clear();
        window.location.href = 'index.html';
    }
}, CONFIG.CHECK_INTERVAL);

// ========================================
// FUNÇÕES GLOBAIS (compatibilidade)
// ========================================
function logout() {
    AuthSystem.logout();
}

function openCategory(category) {
    UIManager.openCategory(category);
}

function searchFiles() {
    SearchManager.searchFiles();
}

function filterByCategory() {
    SearchManager.filterByCategory();
}