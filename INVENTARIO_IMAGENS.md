# Inventário de Imagens — IT Cloud Solutions

**Localização base:** `/img/` (raiz do site)

---

## 📁 Estrutura de Pastas Recomendada

```
/img/
├── logo.png                 # Logo principal (SVG ou PNG)
├── favicon.ico              # Favicon 32x32 / 16x16
├── og-default.jpg           # Open Graph padrão (1200x630)
├── hero/
│   ├── hero-home.jpg        # Hero página inicial
│   ├── hero-cloud.jpg       # Hero cloud-providers
│   ├── hero-solucoes.jpg    # Hero soluções
│   ├── hero-email.jpg       # Hero email-hosting
│   ├── hero-cases.jpg       # Hero cases
│   ├── hero-blog.jpg        # Hero blog
│   ├── hero-contact.jpg     # Hero contato
│   ├── hero-helpdesk.jpg    # Hero helpdesk
│   └── hero-careers.jpg     # Hero trabalhe-conosco
├── providers/
│   ├── aws.jpg              # Card AWS
│   ├── azure.jpg            # Card Azure
│   ├── gcp.jpg              # Card GCP
│   ├── oci.jpg              # Card OCI
│   ├── swx.jpg              # Card SWX
│   ├── vmware.jpg           # Card VMware
│   ├── aws-detail.jpg       # Detalhe cloud-aws.html
│   ├── azure-detail.jpg     # Detalhe cloud-azure.html
│   ├── gcp-detail.jpg       # Detalhe cloud-gcp.html
│   ├── oci-detail.jpg       # Detalhe cloud-oci.html
│   ├── swx-detail.jpg       # Detalhe cloud-swx.html
│   └── vmware-detail.jpg    # Detalhe cloud-vmware.html
├── solutions/
│   ├── iaas.jpg             # IaaS
│   ├── infra.jpg            # Infraestrutura & Virtualização
│   ├── security.jpg         # Segurança
│   ├── managed-cloud.jpg    # Cloud Gerenciada
│   ├── saas.jpg             # SaaS & Workplace
│   ├── paas.jpg             # PaaS & Dev
│   ├── support.jpg          # Suporte TI
│   ├── email.jpg            # Email & Hosting
│   └── data-analytics.jpg   # Data & Analytics
├── cases/
│   ├── case-azure-finops.jpg
│   ├── case-oci-exadata.jpg
│   ├── case-vmware-hcx.jpg
│   ├── case-zero-trust.jpg
│   ├── case-data-lake.jpg
│   ├── case-k8s-gitops.jpg
│   ├── case-helpdesk-noc.jpg
│   ├── case-aws-serverless.jpg
│   ├── case-terraform-modules.jpg
│   └── case-gcp-security.jpg
├── blog/
│   ├── blog-finops-azure.jpg
│   ├── blog-azure-landing-zone.jpg
│   ├── blog-oci-database.jpg
│   ├── blog-swx-hybrid.jpg
│   ├── blog-zero-trust.jpg
│   ├── blog-lgpd-backup.jpg
│   ├── blog-edr-xdr.jpg
│   ├── blog-devsecops.jpg
│   ├── blog-modern-data-stack.jpg
│   ├── blog-genai-rag.jpg
│   ├── blog-streaming-kafka.jpg
│   ├── blog-data-governance.jpg
│   ├── blog-k8s-gitops.jpg
│   ├── blog-terraform-modules.jpg
│   ├── blog-observability.jpg
│   └── blog-power-platform.jpg
├── email/
│   ├── email-comparison.jpg # Tabela comparativa
│   ├── migration-flow.jpg   # Fluxo migração
│   └── security-layers.jpg  # Camadas segurança email
├── team/
│   ├── team-1.jpg           # Foto time (about/contato)
│   ├── team-2.jpg
│   └── team-3.jpg
├── partners/
│   ├── microsoft.png        # Logos parceiros (transparente)
│   ├── aws.png
│   ├── google.png
│   ├── oracle.png
│   ├── vmware.png
│   ├── softwareone.png
│   ├── atlassian.png
│   └── zendesk.png
├── certifications/
│   ├── iso-27001.png
│   ├── soc2.png
│   ├── lgpd.png
│   ├── azure-expert.png
│   ├── aws-partner.png
│   └── google-partner.png
└── ui/
    ├── img2.png             # Imagem genérica "tecnologias" (solucoes.html)
    ├── pattern-bg.svg       # Background pattern sutil
    └── illustration-*.svg   # Ilustrações vetoriais (hero, empty states)
```

---

## 📋 Detalhamento por Página

### **index.html (Home)**
| Arquivo | Formato | Dimensões | Descrição | Alt Text Sugerido |
|---------|---------|-----------|-----------|-------------------|
| `hero/hero-home.jpg` | JPG/WebP | 1920×1080 | Banner principal hero section | "IT Cloud Solutions - Transformação digital com cloud, segurança e dados" |
| `logo.png` | PNG/SVG | 200×60 | Logo empresa (navbar + footer) | "IT Cloud Solutions" |
| `og-default.jpg` | JPG | 1200×630 | Open Graph compartilhamento | "IT Cloud Solutions - Cloud, Segurança, Dados" |

### **cloud-providers.html**
| Arquivo | Formato | Dimensões | Descrição | Alt Text Sugerido |
|---------|---------|-----------|-----------|-------------------|
| `hero/hero-cloud.jpg` | JPG/WebP | 1920×600 | Hero "Cloud Providers" | "Principais provedores de nuvem: AWS, Azure, GCP, OCI, SWX, VMware" |
| `providers/aws.jpg` | JPG/WebP | 400×250 | Card AWS | "Amazon Web Services - Compute, Storage, Database, AI" |
| `providers/azure.jpg` | JPG/WebP | 400×250 | Card Azure | "Microsoft Azure - Hybrid, AI, Developer Tools" |
| `providers/gcp.jpg` | JPG/WebP | 400×250 | Card GCP | "Google Cloud - Data, AI, Kubernetes" |
| `providers/oci.jpg` | JPG/WebP | 400×250 | Card OCI | "Oracle Cloud Infrastructure - Database, HPC" |
| `providers/swx.jpg` | JPG/WebP | 400×250 | Card SWX | "SWX Cloud - Soberania brasileira, custo previsível" |
| `providers/vmware.jpg` | JPG/WebP | 400×250 | Card VMware | "VMware vSphere, vSAN, NSX, Tanzu" |

### **cloud-aws.html, cloud-azure.html, cloud-gcp.html, cloud-oci.html, cloud-swx.html, cloud-vmware.html** (6 páginas)
| Arquivo | Formato | Dimensões | Descrição | Alt Text Sugerido |
|---------|---------|-----------|-----------|-------------------|
| `providers/{provider}-detail.jpg` | JPG/WebP | 800×450 | Banner detalhe provedor | "Arquitetura de referência {Provider} - Landing zones, serviços gerenciados, segurança" |

### **solucoes.html**
| Arquivo | Formato | Dimensões | Descrição | Alt Text Sugerido |
|---------|---------|-----------|-----------|-------------------|
| `hero/hero-solucoes.jpg` | JPG/WebP | 1920×600 | Hero "Soluções" | "Portfólio completo: IaaS, Segurança, Cloud Gerenciada, SaaS, PaaS, Suporte, Email, Data" |
| `solutions/iaas.jpg` | JPG/WebP | 400×250 | Card IaaS | "Infraestrutura como Serviço - Servidores, Storage, Rede, Backup" |
| `solutions/infra.jpg` | JPG/WebP | 400×250 | Card Infraestrutura | "Virtualização VMware, Hyper-V, Kubernetes, Automação IaC" |
| `solutions/security.jpg` | JPG/WebP | 400×250 | Card Segurança | "Zero Trust, Identidade, Rede, Endpoint, Dados, Governança" |
| `solutions/managed-cloud.jpg` | JPG/WebP | 400×250 | Card Cloud Gerenciada | "Multicloud 24/7, FinOps, Landing Zones, Migração" |
| `solutions/saas.jpg` | JPG/WebP | 400×250 | Card SaaS | "Microsoft 365, Google Workspace, Atlassian, ERPs" |
| `solutions/paas.jpg` | JPG/WebP | 400×250 | Card PaaS | "App Platforms, API Management, Bancos Gerenciados, Low-Code" |
| `solutions/support.jpg` | JPG/WebP | 400×250 | Card Suporte TI | "Helpdesk, NOC 24/7, SOC 24/7, ITAM, Field Services" |
| `solutions/email.jpg` | JPG/WebP | 400×250 | Card Email | "Email corporativo, segurança, arquivamento, continuidade" |
| `solutions/data-analytics.jpg` | JPG/WebP | 400×250 | Card Data & Analytics | "Modern Data Stack, Data Lake, BI, IA/ML, Streaming" |
| `ui/img2.png` | PNG | 600×400 | Imagem "Tecnologias que Dominamos" | "Stack tecnológica: Azure, OCI, SWX, AWS, GCP, VMware, K8s, GitHub, Terraform" |

### **email-hosting.html**
| Arquivo | Formato | Dimensões | Descrição | Alt Text Sugerido |
|---------|---------|-----------|-----------|-------------------|
| `hero/hero-email.jpg` | JPG/WebP | 1920×600 | Hero Email & Hosting | "Email corporativo profissional com domínio próprio" |
| `email/email-comparison.jpg` | JPG/WebP | 800×600 | Tabela comparativa planos | "Comparativo: Microsoft 365, Google Workspace, Zimbra, cPanel" |
| `email/migration-flow.jpg` | JPG/WebP | 800×450 | Fluxo migração zero-downtime | "Processo migração email: assessment, coexistência, cutover, validação" |
| `email/security-layers.jpg` | JPG/WebP | 800×450 | Camadas segurança email | "DMARC/DKIM/SPF, Antispam, Sandbox, Criptografia, DLP" |

### **cases.html + 10 páginas de detalhe**
| Arquivo | Formato | Dimensões | Descrição | Alt Text Sugerido |
|---------|---------|-----------|-----------|-------------------|
| `hero/hero-cases.jpg` | JPG/WebP | 1920×600 | Hero Cases | "Cases de sucesso - Clientes reais, resultados mensuráveis" |
| `cases/case-azure-finops.jpg` | JPG/WebP | 800×450 | Case Azure FinOps | "Economia 40% custos Azure - FinOps, rightsizing, savings plans" |
| `cases/case-oci-exadata.jpg` | JPG/WebP | 800×450 | Case OCI Exadata | "Migração Oracle Exadata on-prem → OCI - Performance 3x" |
| `cases/case-vmware-hcx.jpg` | JPG/WebP | 800×450 | Case VMware HCX | "Migração VMware HCX - Zero downtime, 200+ VMs" |
| `cases/case-zero-trust.jpg` | JPG/WebP | 800×450 | Case Zero Trust | "Implementação Zero Trust - Entra ID, Conditional Access, PAM" |
| `cases/case-data-lake.jpg` | JPG/WebP | 800×450 | Case Data Lake | "Modern Data Stack - Airbyte, dbt, Snowflake, Power BI" |
| `cases/case-k8s-gitops.jpg` | JPG/WebP | 800×450 | Case K8s GitOps | "GitOps com ArgoCD - EKS, deploy contínuo, rollback automático" |
| `cases/case-helpdesk-noc.jpg` | JPG/WebP | 800×450 | Case Helpdesk NOC | "Service Desk + NOC 24/7 - SLA 99.9%, MTTR < 15min" |
| `cases/case-aws-serverless.jpg` | JPG/WebP | 800×450 | Case AWS Serverless | "Arquitetura Serverless - Lambda, API Gateway, DynamoDB" |
| `cases/case-terraform-modules.jpg` | JPG/WebP | 800×450 | Case Terraform | "Módulos Terraform reutilizáveis - Multi-account, multi-region" |
| `cases/case-gcp-security.jpg` | JPG/WebP | 800×450 | Case GCP Security | "Security Command Center, Cloud Armor, conformidade PCI-DSS" |

### **blog.html + 16 páginas de posts**
| Arquivo | Formato | Dimensões | Descrição | Alt Text Sugerido |
|---------|---------|-----------|-----------|-------------------|
| `hero/hero-blog.jpg` | JPG/WebP | 1920×600 | Hero Blog | "Artigos técnicos - Cloud, DevOps, Segurança, Dados, IA" |
| `blog/blog-finops-azure.jpg` | JPG/WebP | 800×450 | Post FinOps Azure | "FinOps no Azure - Tagging, budgets, advisor, workbooks" |
| `blog/blog-azure-landing-zone.jpg` | JPG/WebP | 800×450 | Post Landing Zone | "Azure Landing Zone - CAF, policy-as-code, management groups" |
| `blog/blog-oci-database.jpg` | JPG/WebP | 800×450 | Post OCI Database | "Oracle Autonomous Database - Exadata, Data Guard, backup" |
| `blog/blog-swx-hybrid.jpg` | JPG/WebP | 800×450 | Post SWX Híbrida | "Cloud híbrida SWX - Soberania, baixa latência, custo fixo" |
| `blog/blog-zero-trust.jpg` | JPG/WebP | 800×450 | Post Zero Trust | "Zero Trust na prática - Identidade, device, network, app, data" |
| `blog/blog-lgpd-backup.jpg` | JPG/WebP | 800×450 | Post LGPD Backup | "Backup imutável e LGPD - WORM, retenção legal, eDiscovery" |
| `blog/blog-edr-xdr.jpg` | JPG/WebP | 800×450 | Post EDR/XDR | "EDR vs XDR - Detecção, resposta, threat hunting, SOAR" |
| `blog/blog-devsecops.jpg` | JPG/WebP | 800×450 | Post DevSecOps | "Shift-left security - SAST, DAST, SCA, container scanning" |
| `blog/blog-modern-data-stack.jpg` | JPG/WebP | 800×450 | Post Modern Data Stack | "Modern Data Stack - Ingest, transform, warehouse, BI, governance" |
| `blog/blog-genai-rag.jpg` | JPG/WebP | 800×450 | Post GenAI RAG | "RAG com LLMs - Vector DB, embedding, retrieval, evaluation" |
| `blog/blog-streaming-kafka.jpg` | JPG/WebP | 800×450 | Post Streaming Kafka | "Event-driven - Kafka, Flink, RisingWave, exactly-once" |
| `blog/blog-data-governance.jpg` | JPG/WebP | 800×450 | Post Data Governance | "Catálogo, lineage, quality, privacy - DataHub, Amundsen" |
| `blog/blog-k8s-gitops.jpg` | JPG/WebP | 800×450 | Post K8s GitOps | "ArgoCD, Flux - Multi-cluster, progressive delivery" |
| `blog/blog-terraform-modules.jpg` | JPG/WebP | 800×450 | Post Terraform Modules | "Módulos reutilizáveis - Registry, versioning, testing" |
| `blog/blog-observability.jpg` | JPG/WebP | 800×450 | Post Observabilidade | "Prometheus, Grafana, Loki, Tempo - RED/USE methods" |
| `blog/blog-power-platform.jpg` | JPG/WebP | 800×450 | Post Power Platform | "Governança Power Platform - DLP, ALM, CoE Starter Kit" |

### **contato.html**
| Arquivo | Formato | Dimensões | Descrição | Alt Text Sugerido |
|---------|---------|-----------|-----------|-------------------|
| `hero/hero-contact.jpg` | JPG/WebP | 1920×600 | Hero Contato | "Entre em contato - Formulário, telefone, endereço, WhatsApp" |
| `team/team-1.jpg` | JPG/WebP | 400×400 | Foto time comercial | "Equipe de vendas e pré-vendas IT Cloud Solutions" |

### **helpdesk.html**
| Arquivo | Formato | Dimensões | Descrição | Alt Text Sugerido |
|---------|---------|-----------|-----------|-------------------|
| `hero/hero-helpdesk.jpg` | JPG/WebP | 1920×600 | Hero Helpdesk | "Portal de suporte - Abrir chamado, acompanhar SLA, knowledge base" |

### **trabalhe-conosco.html**
| Arquivo | Formato | Dimensões | Descrição | Alt Text Sugerido |
|---------|---------|-----------|-----------|-------------------|
| `hero/hero-careers.jpg` | JPG/WebP | 1920×600 | Hero Carreiras | "Trabalhe conosco - Vagas abertas, cultura, benefícios" |
| `team/team-2.jpg` | JPG/WebP | 400×400 | Foto time técnico | "Engenheiros cloud, segurança, dados, DevOps" |
| `team/team-3.jpg` | JPG/WebP | 400×400 | Foto escritório | "Escritório Cuiabá - Ambiente colaborativo" |

### **Páginas Legais (política-privacidade.html, termos-uso.html, política-cookies.html, lgpd-dsr.html, obrigado.html, 404.html)**
| Arquivo | Formato | Dimensões | Descrição | Alt Text Sugerido |
|---------|---------|-----------|-----------|-------------------|
| `hero/hero-legal.jpg` | JPG/WebP | 1920×400 | Hero páginas legais (compartilhado) | "Informações legais - Privacidade, Termos, Cookies, LGPD" |

---

## 🎯 Especificações Técnicas

### **Formatos Recomendados**
| Uso | Formato Primário | Fallback | Compressão |
|-----|------------------|----------|------------|
| Hero banners | WebP (quality 80) | JPG (quality 85) | Lossy |
| Cards/Thumbnails | WebP (quality 75) | JPG (quality 80) | Lossy |
| Logos/Ícones | SVG | PNG (24-bit) | Lossless |
| Screenshots/Diagramas | WebP (quality 85) | PNG | Lossless preferido |
| Photos (team, office) | WebP (quality 80) | JPG (quality 85) | Lossy |

### **Nomenclatura**
- **Keenbab-case** para arquivos: `hero-home.jpg`, `case-azure-finops.jpg`
- **Sufixos**: `-detail` (página detalhe), `-thumb` (thumbnail 200×150), `-og` (Open Graph 1200×630)
- **Sem acentos, espaços ou caracteres especiais**

### **Responsividade (srcset sugerido)**
```html
<picture>
  <source srcset="img/hero/hero-home.webp" type="image/webp">
  <img src="img/hero/hero-home.jpg" alt="..." width="1920" height="1080"
       srcset="img/hero/hero-home-480.jpg 480w,
               img/hero/hero-home-800.jpg 800w,
               img/hero/hero-home-1200.jpg 1200w,
               img/hero/hero-home-1920.jpg 1920w"
       sizes="(max-width: 480px) 100vw, (max-width: 800px) 90vw, 1920px">
</picture>
```

### **Otimização**
- **WebP**: `cwebp -q 80 input.jpg -o output.webp`
- **AVIF (opcional)**: `avifenc input.jpg -o output.avif --quality 50`
- **Compressão adicional**: `jpegoptim --strip-all --max=85 *.jpg`
- **SVGO para SVGs**: `svgo -i input.svg -o output.svg`

---

## ✅ Checklist de Entrega

- [ ] **Logo**: `logo.png` (200×60) + `logo.svg` (vetor)
- [ ] **Favicon**: `favicon.ico` (32×32, 16×16) + `favicon.svg`
- [ ] **OG Default**: `og-default.jpg` (1200×630)
- [ ] **9 Hero banners** (1920×600/1080)
- [ ] **6 Provider cards** (400×250) + **6 detalhes** (800×450)
- [ ] **10 Solution cards** (400×250)
- [ ] **10 Case thumbnails** (400×250) + **10 detalhes** (800×450)
- [ ] **16 Blog thumbnails** (400×250) + **16 detalhes** (800×450)
- [ ] **3 Email imagens** (800×450/600)
- [ ] **3 Team photos** (400×400)
- [ ] **8 Partner logos** (SVG/PNG transparente)
- [ ] **7 Certification badges** (SVG/PNG)
- [ ] **UI assets** (img2.png, patterns, illustrations)
- [ ] **WebP versions** de todas as imagens JPG/PNG
- [ ] **srcset/responsive** implementado no HTML

---

## 📍 Onde este documento fica

**Arquivo:** `/home/joao-vitor/Documentos/itcloud-workspace/site-itcloud/INVENTARIO_IMAGENS.md`

**Para gerar as imagens:** Use este documento como briefing para designer/IA (Midjourney, DALL-E, Stable Diffusion) ou fotógrafo. Cada linha tem descrição e alt text pronto para acessibilidade e SEO.

---

*Gerado em 26/10/2026 — IT Cloud Solutions*