const { Octokit } = require('@octokit/rest');
const fs = require('fs');

const octokit = new Octokit({
  auth: 'YOUR_GITHUB_ACCESS_TOKEN', // GitHub erişim anahtarınızı buraya ekleyin
});

const owner = 'github_username';
const repo = 'repository_name';
const path = 'path/to/file.txt';

// Dosyayı oku
const fileContent = fs.readFileSync('local/path/to/file.txt', 'utf-8');

// GitHub'a dosyayı yükle
octokit.repos.createOrUpdateFile({
  owner,
  repo,
  path,
  message: 'Dosya eklendi',
  content: Buffer.from(fileContent).toString('base64'),
})
  .then(response => {
    console.log('Dosya başarıyla yüklendi:', response.data.content.sha);
  })
  .catch(error => {
    console.error('Hata oluştu:', error.message);
  });
