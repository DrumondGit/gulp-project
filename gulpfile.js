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
const Mocha = require('mocha');
const jsdoc = require('gulp-jsdoc3');
const eslint = require('gulp-eslint');
const ghPages = require('gulp-gh-pages');



const report = { 
  logs: [],
  totals: {
    original: 0,
    optimized: 0,
    saved: 0
  },
  tests: {
    passed: [],
    failed: []
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

gulp.task('scripts', function () {
  return gulp.src([
      'src/js/**/*.js',
      'src/controllers/**/*.js',
      'src/models/**/*.js',
      'src/services/**/*.js',
      'src/utils/**/*.js',
      'src/public/**/*.js',
      'src/repositories/**/*.js'
    ])
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


gulp.task('lint', () => {
  return gulp.src([
      'src/**/*.js',
      '!src/test/**/*.js',
      '!src/tests/**/*.js',
      '!src/acceptance/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('test', () => {
  const mochaRunner = new Mocha({ reporter: 'spec', timeout: 5000 });
  const testFiles = [
    'src/test/**/*.js',
    'src/tests/**/*.test.js',
    'src/acceptance/**/*.test.js'
  ];

  return gulp.src(testFiles, { read: false })
    .pipe(through.obj(function (file, enc, cb) {
      mochaRunner.addFile(file.path);
      cb(null, file);
    }))
    .on('end', function () {
      const runner = mochaRunner.run(function (failures) {
        if (failures) {
          console.log(`${failures} testes falharam`);
        }
      });

      runner.on('pass', function (test) {
        report.tests.passed.push(test.fullTitle());
      });

      runner.on('fail', function (test, err) {
        report.tests.failed.push({
          title: test.fullTitle(),
          error: err.message
        });
      });
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
        .fail { color: #e74c3c; }
        .pass { color: #2ecc71; }
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

      <h2>Resumo dos Testes</h2>
      <p><strong>Testes Passaram:</strong> ${report.tests.passed.length}</p>
      <p><strong>Testes Falharam:</strong> ${report.tests.failed.length}</p>

      <h3>Testes com Sucesso</h3>
      <ul>
        ${report.tests.passed.map(t => `<li class="pass">${t}</li>`).join('\n')}
      </ul>

      <h3>Testes com Falha</h3>
      <ul>
        ${report.tests.failed.map(f => `<li class="fail"><strong>${f.title}</strong>: ${f.error}</li>`).join('\n')}
      </ul>

    </body>
  </html>`;

  fs.writeFileSync('report.html', html);
  console.log('Relatório gerado em: report.html');
  done();
});


gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.scss', gulp.series('styles'));
  gulp.watch('src/less/**/*.less', gulp.series('less'));
  gulp.watch([
    'src/js/**/*.js',
    'src/controllers/**/*.js',
    'src/models/**/*.js',
    'src/services/**/*.js',
    'src/utils/**/*.js',
    'src/public/**/*.js',
    'src/repositories/**/*.js'
  ], gulp.series('scripts', 'lint', 'test'));
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

gulp.task('deploy', () =>
  gulp.src('dist/**/*')
    .pipe(ghPages())
);

// Tarefa padrão
gulp.task('default', gulp.series('build', 'watch'));
