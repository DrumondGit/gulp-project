# **🚀 Gulp Build System - Documentação Completa**  

![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)  
![Gulp](https://img.shields.io/badge/gulp-4.0.2-blue)  
![License](https://img.shields.io/badge/license-MIT-green)  

Um **sistema de build automatizado** usando **Gulp** para processar **SASS, LESS, JavaScript**, gerar **documentação** e **relatórios de otimização**.  

---

## **📥 Instalação**  

### **Pré-requisitos**  
- Node.js **v14+**  
- NPM ou Yarn  

### **Passos**  
1. Clone o repositório:  
   ```bash
   git clone https://github.com/seu-usuario/gulp-project.git
   cd gulp-project
   ```
2. Instale as dependências:  
   ```bash
   npm install
   ```
   ou  
   ```bash
   yarn install
   ```

---

## **⚡ Comandos Disponíveis**  

| Comando           | Descrição                                  |
|-------------------|-------------------------------------------|
| `npm run build`   | Executa todo o processo de build          |
| `npm run styles`  | Compila apenas SASS/LESS para CSS         |
| `npm run scripts` | Minifica e concatena JavaScript           |
| `npm run docs`    | Gera documentação JSDoc                   |
| `npm run report`  | Cria relatório de otimização (HTML)       |
| `npm test`        | Executa testes (se configurados)          |

---

## **📂 Estrutura do Projeto**  

```
gulp-project/
├── src/
│   ├── js/        # Arquivos JavaScript originais
│   ├── sass/      # Arquivos .scss/.sass
│   └── less/      # Arquivos .less
├── dist/          # Saída dos assets processados
│   ├── css/       # CSS otimizado
│   └── js/        # JS minificado
├── docs/          # Documentação gerada (JSDoc)
├── test/          # Testes (opcional)
├── gulpfile.js    # Configuração do Gulp
└── package.json   # Dependências e scripts
```

---

## **🔧 Tarefas Gulp**  

### **1. `styles`**  
- Compila **SASS/SCSS** e **LESS** para CSS  
- Minifica usando `clean-css`  
- Gera relatório de otimização  

**Uso:**  
```bash
npx gulp styles
```

### **2. `less`**  
- Processa apenas arquivos **LESS**  

**Uso:**  
```bash
npx gulp less
```

### **3. `scripts`**  
- Concatena e minifica **JavaScript** com `terser`  
- Gera `app.min.js`  

**Uso:**  
```bash
npx gulp scripts
```

### **4. `docs`**  
- Gera documentação via **JSDoc** na pasta `/docs`  

**Uso:**  
```bash
npx gulp docs
```

### **5. `report`**  
- Cria um **relatório HTML** (`report.html`) com métricas de:  
  - Tamanho original vs. otimizado  
  - Economia de espaço  

**Uso:**  
```bash
npx gulp report
```

---

## **🛠 Configuração Avançada**  

### **Modificando caminhos**  
Edite o `gulpfile.js` para alterar:  
```javascript
// Exemplo: Mudar destino do CSS
gulp.task('styles', () => {
  return gulp.src('src/sass/**/*.scss')
    .pipe(gulp.dest('out/css')); // Altere para sua pasta
});
```

### **Adicionando novos processadores**  
1. Instale o plugin (ex: `gulp-postcss`):  
   ```bash
   npm install gulp-postcss autoprefixer --save-dev
   ```
2. Adicione ao `gulpfile.js`:  
   ```javascript
   const postcss = require('gulp-postcss');
   const autoprefixer = require('autoprefixer');

   gulp.task('styles', () => {
     return gulp.src('src/sass/**/*.scss')
       .pipe(postcss([autoprefixer()])) // Adiciona prefixos CSS
       .pipe(gulp.dest('dist/css'));
   });
   ```

---

## **🚨 Solução de Problemas**  

### **Erro: `No test files found: "test"`**  
- **Causa:** A pasta `test/` não existe ou está vazia.  
- **Solução:**  
  ```bash
  mkdir test
  echo "describe('Teste', () => { it('should pass', () => { expect(true).toBe(true); }); });" > test/example.test.js
  ```

### **Erro: `File not found: README.md`**  
- **Solução:** Crie um `README.md` vazio:  
  ```bash
  touch README.md
  ```
  Ou remova `README.md` da tarefa `docs` no `gulpfile.js`.

---

## **📜 Licença**  
MIT © [Seu Nome]  

--- 

✨ **Pronto!** Seu sistema de build está configurado e documentado.  
Para dúvidas, consulte o [Gulp Docs](https://gulpjs.com/docs/en/getting-started/quick-start).