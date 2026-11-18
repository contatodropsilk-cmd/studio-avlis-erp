# Studio Avlis — ERP

App de atendimentos, agenda, CRM, estoque e financeiro do Studio Avlis.

## Rodando localmente
Basta abrir `index.html` num navegador, ou servir a pasta com qualquer servidor estático:

```
npx serve .
```

## Banco de dados (Firebase)
Preencha `firebase-config.js` com a configuração do seu projeto Firebase
(Firebase Console → seu projeto → ⚙️ Configurações do projeto → seção "Seus apps" → app Web).
Sem isso preenchido, o app roda em modo offline (salva só no navegador local).

## Deploy (Netlify)
1. Conecte este repositório no Netlify.
2. Build command: (vazio — é um site estático)
3. Publish directory: `.`

## Instalar como app no celular (PWA)
Depois do deploy, abra o link do site no celular (Chrome no Android, Safari no iPhone) e use
"Adicionar à tela de início" / "Instalar app". Isso cria um ícone que abre em tela cheia.

## Link restrito da profissional
`SEU-LINK#profissional` — abre direto na agenda + home resumida, sem acesso a financeiro,
clientes, estoque, relatórios ou marketing.
