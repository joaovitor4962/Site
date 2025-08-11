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

        const modalEl = document.getElementById('loginModal');
        if (modalEl) {
          let modal = bootstrap.Modal.getInstance(modalEl);
          if (!modal) {
            modal = new bootstrap.Modal(modalEl);
          }
          modal.hide();
        }

        setTimeout(() => {
          window.location.href = users[user].redirect;
        }, 300);

      } else {
        if (loginError) {
          loginError.style.display = 'block';
          loginError.textContent = 'Usuário ou senha incorretos.';
        }
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
});

function logout() {
  if (confirm('Deseja realmente sair do centro de download?')) {
    window.location.href = 'index.html';
  }
}

function openCategory(category) {

  const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
  loadingModal.show();

  setTimeout(() => {
    loadingModal.hide();
    alert(`Abrindo pasta: arquivos/${category}/\n\nImplementar listagem de arquivos desta categoria.`);
  }, 1500);
}

function downloadFile(filePath) {
  const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
  loadingModal.show();

  setTimeout(() => {
    loadingModal.hide();

    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Download iniciado com sucesso!', 'success');
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
  t
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

  document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchFiles();
    }
  });
});

function logout() {
  if (confirm('Deseja realmente sair do sistema?')) {
    window.location.href = 'index.html';
  }
}

document.addEventListener('DOMContentLoaded', function () {
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