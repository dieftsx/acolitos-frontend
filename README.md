# Escala de Acólitos

![image](https://github.com/user-attachments/assets/66797740-02b0-401d-abc4-b61c0c9e85ac)


Um sistema de gerenciamento de escala para acólitos e coroinhas de igrejas católicas, desenvolvido com Next.js, TypeScript e shadcn/ui.

![Escala de Acólitos]

## 📋 Sobre o Projeto

Este projeto é um MVP (Minimum Viable Product) para gerenciar as escalas de serviço de acólitos e coroinhas em paróquias católicas. O sistema permite o cadastro de acólitos, criação de escalas para missas e celebrações, e oferece áreas específicas para administradores e acólitos.

### 🚀 Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/) - Framework React com App Router
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript tipado
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [shadcn/ui](https://ui.shadcn.com/) - Componentes de UI reutilizáveis
- [Lucide React](https://lucide.dev/) - Biblioteca de ícones


## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js 18.0.0 ou superior
- npm ou yarn

### Passos para instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/escala-acolitos.git
   cd escala-acolitos


Thought for 2 seconds```markdown project="Escala de Acólitos" file="README.md"
...
```

2. Instale as dependências:

```shellscript
npm install
# ou
yarn install
```


3. Execute o servidor de desenvolvimento:

```shellscript
npm run dev
# ou
yarn dev
```


4. Acesse o aplicativo em `http://localhost:3000`


## 📊 Estrutura do Projeto

```plaintext
escala-acolitos/
├── app/                    # Diretórios de rotas do Next.js App Router
│   ├── admin/              # Área administrativa
│   ├── acolito/            # Área do acólito
│   ├── cadastro/           # Página de cadastro
│   ├── login/              # Página de login
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página inicial
├── components/             # Componentes reutilizáveis
│   ├── admin-sidebar.tsx   # Barra lateral administrativa
│   ├── acolito-sidebar.tsx # Barra lateral do acólito
│   ├── ui/                 # Componentes de UI (shadcn)
│   └── theme-provider.tsx  # Provedor de tema
├── lib/                    # Utilitários e funções auxiliares
├── public/                 # Arquivos estáticos
├── next.config.js          # Configuração do Next.js
├── tailwind.config.js      # Configuração do Tailwind CSS
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências e scripts
```

## ✨ Funcionalidades

### Área Pública

- Página inicial com informações sobre o sistema
- Tela de login com opções para acólitos e administradores
- Formulário de cadastro para novos acólitos
![image](https://github.com/user-attachments/assets/ac372367-5b30-4d3a-95a0-41b1a42bdb70)


### Área Administrativa

- Dashboard com visão geral das estatísticas
- Gerenciamento de acólitos (listagem, status ativo/inativo)
- Gerenciamento de escalas (criação, edição, visualização)
- Menu lateral para navegação entre as seções

![image](https://github.com/user-attachments/assets/62b81d46-7528-4491-aa8a-ccd07d992c55)


### Área do Acólito

- Dashboard personalizado com próximas missas
- Visualização das escalas em formato de lista e calendário
- Perfil do acólito com informações pessoais
- Status de confirmação para cada escala

  ![image](https://github.com/user-attachments/assets/69818f0f-4252-45cc-afff-006192b6651c)



## 🔜 Próximos Passos

Este é um MVP com foco no frontend. Os próximos passos incluem:

- Integração com backend (Firebase, Supabase ou API REST)
- Sistema de autenticação real
- Notificações por email ou SMS para acólitos
- Sistema de substituição entre acólitos
- Relatórios e estatísticas detalhadas
- Funcionalidade de impressão de escalas
- Testes automatizados


## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request


## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Desenvolvido com ❤️ para a comunidade católica.
  
