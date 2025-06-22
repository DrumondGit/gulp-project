const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const prettyBytes = require('pretty-bytes');
const fs = require('fs');
const through = require('through2');
const newer = require('gulp-newer');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const jsdoc = require('gulp-jsdoc3');
const eslint = require('gulp-eslint');

// Objeto de relatório
const report = { 
  logs: [],
  totals: {
    original: 0,
    optimized: 0,
    saved: 0
  }
};

// Função para registrar tamanhos dos arquivos
function fileSizeLogger(taskName) {
  return through.obj(function (file, _, cb) {
    if (file.stat && file.contents) {
      const original = file.stat.size;
      const optimized = file.contents.length;
      const saved = original - optimized;
      
      report.logs.push({
        task: taskName,
        file: file.relative,
        original: prettyBytes(original),
        optimized: prettyBytes(optimized),
        saved: prettyBytes(saved),
        reduction: `${Math.round((saved) / original * 100)}%`
      });

      // Atualiza totais
      report.totals.original += original;
      report.totals.optimized += optimized;
      report.totals.saved += saved;
    }
    cb(null, file);
  });
}

// Compila arquivos SCSS
gulp.task('styles', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(newer('dist/css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({
      level: {
        1: { specialComments: 'none' },
        2: { mergeMedia: true }
      }
    }))
    .pipe(fileSizeLogger('SASS Minification'))
    .pipe(gulp.dest('dist/css'));
});

// Compila arquivos LESS
gulp.task('less', function () {
  return gulp.src('src/less/**/*.less')
    .pipe(newer('dist/css'))
    .pipe(less())
    .pipe(cleanCSS({
      level: {
        1: { specialComments: 'none' },
        2: { mergeMedia: true }
      }
    }))
    .pipe(fileSizeLogger('LESS Minification'))
    .pipe(gulp.dest('dist/css'));
});

// Otimização avançada de JavaScript
gulp.task('scripts', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(newer('dist/js/app.min.js'))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat('app.min.js'))
    .pipe(terser({
      mangle: {
        toplevel: true,
        keep_fnames: false
      },
      compress: {
        drop_console: true,
        dead_code: true,
        arguments: true,
        passes: 2
      },
      format: {
        comments: false
      }
    }))
    .pipe(fileSizeLogger('JS Minification'))
    .pipe(gulp.dest('dist/js'));
});

// Lint do código fonte
gulp.task('lint', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Testes unitários e de integração
gulp.task('test', () => {
  return gulp.src([
      'src/test/**/*.js',
      'src/tests/**/*.test.js',
      'src/acceptance/**/*.test.js'
    ], { read: false })
    .pipe(mocha({ reporter: 'spec', timeout: 5000 }))
    .on('error', function (err) {
      console.error('Testes falharam:', err.message);
      this.emit('end');
    });
});

// Gera documentação com JSDoc
gulp.task('docs', function (cb) {
  const config = {
    opts: {
      destination: './docs',
      template: 'node_modules/minami'
    },
    templates: {
      default: {
        staticFiles: {
          include: ['./README.md']
        }
      }
    }
  };
  
  gulp.src(['README.md', './src/**/*.js'], { read: false, allowEmpty: true })
    .pipe(jsdoc(config, cb));
});

// Gera relatório HTML
gulp.task('report', function (done) {
  const totals = {
    original: prettyBytes(report.totals.original),
    optimized: prettyBytes(report.totals.optimized),
    saved: prettyBytes(report.totals.saved),
    reduction: report.totals.original > 0
      ? `${Math.round(report.totals.saved / report.totals.original * 100)}%`
      : '0%'
  };

  let html = `
  <html>
    <head>
      <title>Gulp Build Report</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; margin: 20px; line-height: 1.6; }
        h1 { color: #2c3e50; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; box-shadow: 0 2px 3px rgba(0,0,0,0.1); }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #3498db; color: white; font-weight: bold; }
        tr:nth-child(even) { background-color: #f8f9fa; }
        .saved { color: #27ae60; font-weight: bold; }
        .totals { background-color: #f1f1f1; font-weight: bold; }
        .js-row { background-color: #e3f2fd; }
      </style>
    </head>
    <body>
      <h1>Relatório de Build</h1>

      <h2>Resumo Geral</h2>
      <table>
        <tr class="totals">
          <td colspan="2">TOTAL</td>
          <td>${totals.original}</td>
          <td>${totals.optimized}</td>
          <td class="saved">${totals.saved}</td>
          <td>${totals.reduction}</td>
        </tr>
      </table>

      <h2>Detalhes por Arquivo</h2>
      <table>
        <tr>
          <th>Tarefa</th>
          <th>Arquivo</th>
          <th>Original</th>
          <th>Otimizado</th>
          <th>Economia</th>
          <th>Redução</th>
        </tr>`;

  report.logs.forEach(log => {
    const isJS = log.task.includes('JS');
    html += `
        <tr class="${isJS ? 'js-row' : ''}">
          <td>${log.task}</td>
          <td>${log.file}</td>
          <td>${log.original}</td>
          <td>${log.optimized}</td>
          <td class="saved">${log.saved}</td>
          <td>${log.reduction}</td>
        </tr>`;
  });

  html += `
      </table>
      <h2>Destaques</h2>
      <ul>
        <li><strong>JavaScript:</strong> ${report.logs.filter(l => l.task.includes('JS')).length} arquivos processados</li>
        <li><strong>CSS:</strong> ${report.logs.filter(l => l.task.includes('SASS') || l.task.includes('LESS')).length} arquivos compilados</li>
        <li><strong>Economia total:</strong> ${totals.saved} (${totals.reduction} de redução)</li>
      </ul>
    </body>
  </html>`;

  fs.writeFileSync('report.html', html);
  console.log('Relatório gerado em: report.html');
  done();
});

// Watch de todos os arquivos
gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.scss', gulp.series('styles'));
  gulp.watch('src/less/**/*.less', gulp.series('less'));
  gulp.watch('src/js/**/*.js', gulp.series('scripts', 'lint', 'test'));
  gulp.watch(['src/tests/**/*.js', 'src/acceptance/**/*.js'], gulp.series('lint', 'test'));
});

// Tarefa principal de build
gulp.task('build', gulp.series(
  gulp.parallel('styles', 'less', 'scripts'),
  'lint',
  'test',
  'docs',
  'report'
));

// Tarefa padrão
gulp.task('default', gulp.series('build', 'watch'));
