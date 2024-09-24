1. Testar a página Inicial:
curl http://127.0.0.1:3000/
2. Testar a página Sobre:
curl http://127.0.0.1:3000/about
3. Testar a página 404
curl http://127.0.0.1:3000/404
4. Upload de arquivo:
curl -X POST -F "file=@caminho_para_arquivo/arquivo.txt" http://127.0.0.1:3000/upload

Se digitar qualquer http://127.0.0.1:3000/dfasdsada, vai para o 404
Dentro dessa pasta faltou incluir a pasta node_modules, que não cabia dentro dos 100 arquivos disponiveis para envio direto do github, contudo, ao iniciar: npm install express, ele é criado automaticamente.
