(function() {
  if (window.location.pathname.includes('pagina2.html') || window.location.pathname.includes('pagina1.html')) {
    
    const isAuthenticated = sessionStorage.getItem('userAuthenticated');
    const userType = sessionStorage.getItem('userType');
    const loginTime = sessionStorage.getItem('loginTime');
    
    const timeLimit = 2 * 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    
    if (!isAuthenticated || !userType || !loginTime || 
        (currentTime - parseInt(loginTime)) > timeLimit) {
      
      sessionStorage.clear();
      
      alert('⚠️ Acesso negado!\n\nVocê precisa fazer login para acessar esta área restrita.');
      
      window.location.href = 'index.html';
      return;
    }
    
    console.log(`✅ Usuário autenticado: ${userType} - Login: ${new Date(parseInt(loginTime)).toLocaleString()}`);
  }
})();

(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("AkmRbbP2sZ2SFfDs-");
  }
})();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const serviceID = "SEU_SERVICE_ID";
    const templateID = "SEU_TEMPLATE_ID";

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        alert('Mensagem enviada com sucesso!');
        this.reset();
      }, (err) => {
        alert('Erro ao enviar: ' + JSON.stringify(err));
      });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const user = document.getElementById('username').value.trim();
      const pass = document.getElementById('password').value.trim();
      const loginError = document.getElementById('loginError');

      const users = {
        'admin': { password: 'VI@i05ti', redirect: 'pagina1.html' },
        'tecnico': { password: 'tecnico@#25', redirect: 'pagina2.html' }
      };

      if (users[user] && users[user].password === pass) {
        if (loginError) {
          loginError.style.display = 'none';
        }

        sessionStorage.setItem('userAuthenticated', 'true');
        sessionStorage.setItem('userType', user);
        sessionStorage.setItem('loginTime', new Date().getTime().toString());
        sessionStorage.setItem('userName', user);

        const modalEl = document.getElementById('loginModal');
        if (modalEl) {
          let modal = bootstrap.Modal.getInstance(modalEl);
          if (!modal) {
            modal = new bootstrap.Modal(modalEl);
          }
          modal.hide();
        }

        showNotification(`✅ Login realizado com sucesso! Bem-vindo, ${user}!`, 'success');

        setTimeout(() => {
          window.location.href = users[user].redirect;
        }, 1000);

      } else {
        if (loginError) {
          loginError.style.display = 'block';
          loginError.textContent = 'Usuário ou senha incorretos.';
        }
        
        console.warn(`❌ Tentativa de login falhada: ${user} em ${new Date().toLocaleString()}`);
      }
    });
  }

  const loginModal = document.getElementById('loginModal');
  if (loginModal) {
    loginModal.addEventListener('hidden.bs.modal', function () {
      const loginError = document.getElementById('loginError');
      const loginForm = document.getElementById('loginForm');

      if (loginError) {
        loginError.style.display = 'none';
      }
      if (loginForm) {
        loginForm.reset();
      }
    });
  }

  showUserInfo();
});

function logout() {
  const userType = sessionStorage.getItem('userType');
  const confirmMessage = userType === 'admin' ? 
    'Deseja realmente sair do painel administrativo?' : 
    'Deseja realmente sair do centro de download?';
    
  if (confirm(confirmMessage)) {
    sessionStorage.clear();
    
    console.log(`🚪 Logout realizado em ${new Date().toLocaleString()}`);
    
    showNotification('👋 Logout realizado com sucesso!', 'info');
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
}

function showUserInfo() {
  const userType = sessionStorage.getItem('userType');
  const loginTime = sessionStorage.getItem('loginTime');
  
  if (userType && loginTime) {
    const loginDate = new Date(parseInt(loginTime));
    const sessionDuration = Math.floor((new Date().getTime() - parseInt(loginTime)) / 60000); // em minutos
    
    console.log(`👤 Usuário: ${userType}`);
    console.log(`🕐 Login: ${loginDate.toLocaleString()}`);
    console.log(`⏱️ Sessão ativa há: ${sessionDuration} minutos`);
  }
}

function checkSessionValidity() {
  const loginTime = sessionStorage.getItem('loginTime');
  const timeLimit = 2 * 60 * 60 * 1000;
  
  if (loginTime && (new Date().getTime() - parseInt(loginTime)) > timeLimit) {
    alert('⏰ Sua sessão expirou!\n\nPor favor, faça login novamente.');
    sessionStorage.clear();
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

setInterval(checkSessionValidity, 5 * 60 * 1000);

function openCategory(category) {
  if (!checkSessionValidity()) return;
  
  const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
  loadingModal.show();

  setTimeout(() => {
    loadingModal.hide();
    showCategoryFiles(category);
  }, 1500);
}

function showCategoryFiles(category) {
  const categoryFiles = {
    'programas': [
      { name: 'TeamViewer 15', file: 'teamviewer.exe', size: '45.2 MB' },
      { name: 'Google Chrome', file: 'chrome-installer.exe', size: '1.2 MB' },
      { name: 'Mozilla Firefox', file: 'firefox-setup.exe', size: '52.8 MB' },
      { name: 'VLC Media Player', file: 'vlc-media-player.exe', size: '38.5 MB' },
      { name: '7-Zip', file: '7zip-installer.exe', size: '1.4 MB' },
      { name: 'Notepad++', file: 'notepad-plus.exe', size: '4.1 MB' },
      { name: 'Adobe Reader', file: 'adobe-reader.exe', size: '156 MB' },
      { name: 'WinRAR', file: 'winrar-installer.exe', size: '3.2 MB' },
      { name: 'Zoom', file: 'zoom-installer.exe', size: '4.8 MB' },
      { name: 'Skype', file: 'skype-installer.exe', size: '56.2 MB' },
      { name: 'Office 365', file: 'office-installer.exe', size: '3.8 MB' },
      { name: 'Antivírus Empresarial', file: 'antivirus-setup.exe', size: '248 MB' }
    ],
    'arquivos': [
      { name: 'Backup Configurações', file: 'backup-config.zip', size: '12.4 MB' },
      { name: 'Backup Sistema', file: 'system-backup.rar', size: '456 MB' },
      { name: 'Export Database', file: 'database-export.sql', size: '89.1 MB' },
      { name: 'Templates Config', file: 'config-templates.zip', size: '2.3 MB' },
      { name: 'Perfis Usuário', file: 'user-profiles.zip', size: '15.7 MB' },
      { name: 'Configurações Rede', file: 'network-settings.txt', size: '145 KB' },
      { name: 'Regras Firewall', file: 'firewall-rules.xml', size: '89 KB' },
      { name: 'Políticas Segurança', file: 'security-policies.json', size: '234 KB' }
    ],
    'imagens': [
      { name: 'Logo IT Cloud', file: 'logo-it-cloud.png', size: '245 KB' },
      { name: 'Banner Principal', file: 'banner-principal.png', size: '1.2 MB' },
      { name: 'Wallpaper Corporativo', file: 'wallpaper-corporativo.jpg', size: '3.4 MB' },
      { name: 'Ícones Sistema', file: 'icones-sistema.zip', size: '890 KB' },
      { name: 'Templates Design', file: 'templates-design.psd', size: '45.6 MB' },
      { name: 'Fotos Equipe', file: 'fotos-equipe.zip', size: '23.1 MB' },
      { name: 'Infográficos', file: 'infograficos.ai', size: '12.8 MB' },
      { name: 'Apresentação Slides', file: 'apresentacao-slides.pptx', size: '8.9 MB' },
      { name: 'Mockups Interface', file: 'mockups-interface.fig', size: '6.7 MB' },
      { name: 'Logos Parceiros', file: 'logos-parceiros.zip', size: '4.2 MB' },
      { name: 'Certificados Digitais', file: 'certificados-digitais.pdf', size: '1.1 MB' },
      { name: 'Portfolio Projetos', file: 'portfolio-projetos.zip', size: '67.3 MB' },
      { name: 'Capturas de Tela', file: 'capturas-tela.zip', size: '18.9 MB' },
      { name: 'Diagramas Rede', file: 'diagramas-rede.png', size: '2.1 MB' },
      { name: 'Manuais Visuais', file: 'manuais-visuais.pdf', size: '14.5 MB' }
    ],
    'documentos': [
      { name: 'Manual do Usuário', file: 'manual-usuario.pdf', size: '3.2 MB' },
      { name: 'Guia de Instalação', file: 'guia-instalacao.docx', size: '1.8 MB' },
      { name: 'Políticas de TI', file: 'politicas-ti.pdf', size: '956 KB' },
      { name: 'Template Contrato', file: 'contrato-template.doc', size: '234 KB' },
      { name: 'Relatório Mensal', file: 'relatorio-mensal.xlsx', size: '445 KB' },
      { name: 'Procedimentos Backup', file: 'procedimentos-backup.pdf', size: '1.1 MB' }
    ],
    'scripts': [
      { name: 'Auto Update', file: 'auto-update.ps1', size: '3.4 KB' },
      { name: 'Backup Automático', file: 'backup-automatico.bat', size: '1.2 KB' },
      { name: 'Limpeza Sistema', file: 'limpeza-sistema.cmd', size: '890 B' },
      { name: 'Instalação Programas', file: 'instalacao-programas.ps1', size: '5.6 KB' },
      { name: 'Configuração Rede', file: 'configuracao-rede.sh', size: '2.1 KB' },
      { name: 'Monitoramento', file: 'monitoramento.py', size: '8.9 KB' },
      { name: 'Deploy Aplicação', file: 'deploy-aplicacao.js', size: '12.3 KB' },
      { name: 'Manutenção BD', file: 'manutencao-bd.sql', size: '4.7 KB' },
      { name: 'Ativadores', file: 'ativar-programas.ps1', size: '6.2 KB' }
    ],
    'drivers': [
      { name: 'Driver Impressora HP', file: 'driver-impressora-hp.exe', size: '89.4 MB' },
      { name: 'Driver Placa de Vídeo', file: 'driver-placa-video.zip', size: '456 MB' },
      { name: 'Driver Audio Realtek', file: 'driver-audio-realtek.exe', size: '145 MB' },
      { name: 'Drivers Rede Intel', file: 'drivers-rede-intel.zip', size: '67.8 MB' }
    ]
  };

  const files = categoryFiles[category] || [];
  showFileList(category, files);
}

function showFileList(category, files) {
  const userType = sessionStorage.getItem('userType');
  
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
                                    <h6 class="mb-1">${file.name}</h6>
                                    <small class="text-muted">${file.size} • ${category}/</small>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-sm" 
                                    onclick="downloadFile('arquivos/${category}/${file.file}')">
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

  const existingModal = document.getElementById('fileListModal');
  if (existingModal) {
    existingModal.remove();
  }

  document.body.insertAdjacentHTML('beforeend', fileListHtml);

  const modal = new bootstrap.Modal(document.getElementById('fileListModal'));
  modal.show();
}

function downloadFile(filePath) {
  if (!checkSessionValidity()) return;
  
  const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
  loadingModal.show();

  setTimeout(() => {
    loadingModal.hide();

    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop();
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('📥 Download iniciado com sucesso!', 'success');
    
    const userType = sessionStorage.getItem('userType');
    console.log(`📥 Download: ${filePath} | Usuário: ${userType} | ${new Date().toISOString()}`);
  }, 1000);
}

function searchFiles() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const categories = document.querySelectorAll('.download-category');

  if (searchTerm === '') {
    categories.forEach(cat => {
      cat.style.display = 'block';
    });
    return;
  }

  categories.forEach(cat => {
    const categoryName = cat.dataset.category.toLowerCase();
    const cardText = cat.textContent.toLowerCase();

    if (categoryName.includes(searchTerm) || cardText.includes(searchTerm)) {
      cat.style.display = 'block';
    } else {
      cat.style.display = 'none';
    }
  });
}

function filterByCategory() {
  const filter = document.getElementById('categoryFilter').value;
  const categories = document.querySelectorAll('.download-category');

  categories.forEach(cat => {
    if (filter === 'all' || cat.dataset.category === filter) {
      cat.style.display = 'block';
    } else {
      cat.style.display = 'none';
    }
  });
}

function showNotification(message, type = 'info') {
  const toastHtml = `
                <div class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            <i class="bi bi-check-circle me-2"></i>${message}
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

document.addEventListener('DOMContentLoaded', function () {
  const downloadCards = document.querySelectorAll('.download-card');
  downloadCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px)';
      this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        searchFiles();
      }
    });
  }

  const adminCards = document.querySelectorAll('.admin-card');
  adminCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px)';
      this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });
});

function checkFileExists(filePath) {
  return fetch(filePath, { method: 'HEAD' })
    .then(response => response.ok)
    .catch(() => false);
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

