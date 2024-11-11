const yaml = require('js-yaml');
const fs   = require('fs');
const path = require("path");

const markdownIt = require('markdown-it');


module.exports = {
    createProjetoObj : function (title, subtitle, group, image, link, description, tags, ){

        let projObj = {
            'title' : title,
            'subtitle' : subtitle,
            'group' : group,
            'image' : image,
            'link': link,
            'description': description,
            'repo' : '',
            'tags' : tags,
        
        }
    
        return projObj;
    
    },
    
    getAllProjectsInfo: function() {
        // TODO: O CAMINHO VAI TER DE SER MODIFICADO
        var markObj = new markdownIt();
        var retornoJSON = {};
        var id = 1; // Inicializa o contador de ID começando em 1
        let dir;
    
        try {
            dir = fs.opendirSync(path.resolve('../site_template/', '_projects/'));
            let dirent;
            while ((dirent = dir.readSync()) !== null) {
                let content = fs.readFileSync(path.resolve('../site_template/', '_projects/' + dirent.name), 'utf8');
                let lines = content.split('\n'); // Divide o conteúdo em linhas
                
                // Variáveis para armazenar valores, inicializadas como vazias
                let tituloProj = '';
                let subTituloProj = '';
                let imagemProj = '';
                let linkProj = '';
                let descricaoProj = '';
                let tags = [];
                let collectingTags = false;
    
                // Processa cada linha para identificar e extrair os campos, caso existam
                lines.forEach((line) => {
                    let lineContent = line.trim();
    
                    if (lineContent.startsWith("title:")) {
                        tituloProj = lineContent.replace("title:", '').trim();
                    } else if (lineContent.startsWith("subtitle:")) {
                        subTituloProj = lineContent.replace("subtitle:", '').trim();
                    } else if (lineContent.startsWith("image:")) {
                        imagemProj = lineContent.replace("image:", '').trim();
                    } else if (lineContent.startsWith("link:")) {
                        linkProj = lineContent.replace("link:", '').trim();
                    } else if (lineContent.startsWith("description:")) {
                        descricaoProj = lineContent.replace("description:", '').trim();
                    } else if (lineContent.startsWith("tags:")) {
                        collectingTags = true; // Marca o início da coleção de tags
                    } else if (collectingTags) {
                        // Coleta as linhas que começam com "-" como parte da lista de tags
                        if (lineContent.startsWith("- ")) {
                            tags.push(lineContent.replace("-", '').trim());
                        } else if (lineContent === '') {
                            collectingTags = false; // Finaliza a coleção ao encontrar uma linha em branco
                        }
                    }
                });
    
                // Adiciona as informações no objeto de retorno, incluindo o ID
                retornoJSON[id] = {
                    'id': id,
                    'titulo': tituloProj || null,
                    'subtitulo': subTituloProj || null,
                    'imagem': imagemProj || null,
                    'link': linkProj || null,
                    'descricao': descricaoProj || null,
                    'tags': tags.length > 0 ? tags : null
                };
    
                id++; // Incrementa o ID para o próximo projeto
            }
        } catch (err) {
            console.error("Erro ao ler diretório ou arquivos:", err);
            return null;
        } finally {
            // Garante que o diretório seja fechado
            if (dir) dir.closeSync();
        }
    
        return retornoJSON;
    }
    
    ,
    getAllNoticiasInfo: function() {
        // TODO: O CAMINHO VAI TER DE SER MODIFICADO
        var markObj = new markdownIt();
        var retornoJSON = {};
        var id = 1; // Inicializa o contador de ID começando em 1
        let dir;
    
        try {
            dir = fs.opendirSync(path.resolve('../site_template/', '_posts/'));
            let dirent;
            while ((dirent = dir.readSync()) !== null) {
                let content = fs.readFileSync(path.resolve('../site_template/', '_posts/' + dirent.name), 'utf8');
                let lines = content.split('\n'); // Divide o conteúdo em linhas
                
                // Variáveis para armazenar valores, inicializadas como vazias
                let tituloNoticia = '';
                let imagemNoticia = '';
                let descricaoNoticia = '';
                let tags = [];
                let collectingTags = false;
    
                // Processa cada linha para identificar e extrair os campos, caso existam
                lines.forEach((line) => {
                    let lineContent = line.trim();
    
                    if (lineContent.startsWith("title:")) {
                        tituloNoticia = lineContent.replace("title:", '').trim();
                    } else if (lineContent.startsWith("image:")) {
                        imagemNoticia = lineContent.replace("image:", '').trim();
                    } else if (lineContent.startsWith("description:")) {
                        descricaoNoticia = lineContent.replace("description:", '').trim();
                    } else if (lineContent.startsWith("tags:")) {
                        collectingTags = true; // Marca o início da coleção de tags
                    } else if (collectingTags) {
                        // Coleta as linhas que começam com "-" como parte da lista de tags
                        if (lineContent.startsWith("- ")) {
                            tags.push(lineContent.replace("-", '').trim());
                        } else if (lineContent === '') {
                            collectingTags = false; // Finaliza a coleção ao encontrar uma linha em branco
                        }
                    }
                });
    
                // Adiciona as informações no objeto de retorno, incluindo o ID
                retornoJSON[id] = {
                    'id': id,
                    'titulo': tituloNoticia || null,
                    'imagem': imagemNoticia || null,
                    'descricao': descricaoNoticia || null,
                    'tags': tags.length > 0 ? tags : null
                };
    
                id++; // Incrementa o ID para a próxima notícia
            }
        } catch (err) {
            console.error("Erro ao ler diretório ou arquivos:", err);
            return null;
        } finally {
            // Garante que o diretório seja fechado
            if (dir) dir.closeSync();
        }
    
        return retornoJSON;
    }
    
    
    ,
    getAllMembrosInfo: function() {
        // TODO: O CAMINHO VAI TER DE SER MODIFICADO
        var markObj = new markdownIt();
        var retornoJSON = {};
        var id = 1; // Inicializa o contador de ID começando em 1
        let dir;
    
        try {
            dir = fs.opendirSync(path.resolve('../site_template/', '_members/'));
            let dirent;
            while ((dirent = dir.readSync()) !== null) {
                let content = fs.readFileSync(path.resolve('../site_template/', '_members/' + dirent.name), 'utf8');
                let lines = content.split('\n'); // Divide o conteúdo em linhas
                
                // Variáveis para armazenar valores, inicializadas como vazias
                let nomeMembro = '';
                let imagemMembro = '';
                let descricaoMembro = '';
                let cargoMembro = '';
                let afiliacaoMembro = '';
                let emailMembro = '';
                let lattesMembro = '';
                let linkedinMembro = '';
                let githubMembro = '';
                let orcidMembro = '';
                let instagramMembro = '';
    
                // Processa cada linha para identificar e extrair os campos, caso existam
                lines.forEach((line) => {
                    let lineContent = line.trim();
                    if (lineContent.startsWith("name:")) {
                        nomeMembro = lineContent.replace("name:", '').trim();
                    } else if (lineContent.startsWith("image:")) {
                        imagemMembro = lineContent.replace("image:", '').trim();
                    } else if (lineContent.startsWith("description:")) {
                        descricaoMembro = lineContent.replace("description:", '').trim();
                    } else if (lineContent.startsWith("role:")) {
                        cargoMembro = lineContent.replace("role:", '').trim();
                    } else if (lineContent.startsWith("affiliation:")) {
                        afiliacaoMembro = lineContent.replace("affiliation:", '').trim();
                    } else if (lineContent.startsWith("linkemail:")) {
                        emailMembro = lineContent.replace("linkemail:", '').trim();
                    } else if (lineContent.startsWith("linklattes:")) {
                        lattesMembro = lineContent.replace("linklattes:", '').trim();
                    } else if (lineContent.startsWith("linklinkedin:")) {
                        linkedinMembro = lineContent.replace("linklinkedin:", '').trim();
                    } else if (lineContent.startsWith("linkgithub:")) {
                        githubMembro = lineContent.replace("linkgithub:", '').trim();
                    } else if (lineContent.startsWith("linkorcid:")) {
                        orcidMembro = lineContent.replace("linkorcid:", '').trim();
                    } else if (lineContent.startsWith("linkinstagram:")) {
                        instagramMembro = lineContent.replace("linkinstagram:", '').trim();
                    }
                });
    
                // Adiciona as informações no objeto de retorno, incluindo o ID
                retornoJSON[id] = {
                    'id': id,
                    'nome': nomeMembro || null,
                    'imagem': imagemMembro || null,
                    'descricao': descricaoMembro || null,
                    'cargo': cargoMembro || null,
                    'afiliacao': afiliacaoMembro || null,
                    'email': emailMembro || null,
                    'lattes': lattesMembro || null,
                    'linkedin': linkedinMembro || null,
                    'github': githubMembro || null,
                    'orcid': orcidMembro || null,
                    'instagram': instagramMembro || null
                };
    
                id++; // Incrementa o ID para o próximo membro
            }
        } catch (err) {
            console.error("Erro ao ler diretório ou arquivos:", err);
            return null;
        } finally {
            // Garante que o diretório seja fechado
            if (dir) dir.closeSync();
        }
    
        return retornoJSON;
    }
    
    ,
    getAllLaboratoriosInfo: function() {
        // TODO: O CAMINHO VAI TER DE SER MODIFICADO
        var markObj = new markdownIt();
        var retornoJSON = {};
        var id = 1; // Inicializa o contador de ID começando em 1
        let dir;
    
        try {
            dir = fs.opendirSync(path.resolve('../site_template/', '_laboratorios/'));
            let dirent;
            while ((dirent = dir.readSync()) !== null) {
                let content = fs.readFileSync(path.resolve('../site_template/', '_laboratorios/' + dirent.name), 'utf8');
                let lines = content.split('\n'); // Divide o conteúdo em linhas
                
                // Variáveis para armazenar valores, inicializadas como vazias
                let tituloLab = '';
                let imagemLab = '';
                let descricaoLab = '';
    
                // Processa cada linha para identificar e extrair os campos, caso existam
                lines.forEach((line) => {
                    let lineContent = line.trim();
                    if (lineContent.startsWith("title:")) {
                        tituloLab = lineContent.replace("title:", '').trim();
                    } else if (lineContent.startsWith("image:")) {
                        imagemLab = lineContent.replace("image:", '').trim();
                    } else if (lineContent.startsWith("description:")) {
                        descricaoLab = lineContent.replace("description:", '').trim();
                    }
                });
    
                // Adiciona as informações no objeto de retorno, incluindo o ID
                retornoJSON[id] = {
                    'id': id,
                    'nome': tituloLab || null,
                    'imagem': imagemLab || null,
                    'descricao': descricaoLab || null
                };
    
                id++; // Incrementa o ID para o próximo laboratório
            }
        } catch (err) {
            console.error("Erro ao ler diretório ou arquivos:", err);
            return null;
        } finally {
            // Garante que o diretório seja fechado
            if (dir) dir.closeSync();
        }
    
        return retornoJSON;
    }
    
    ,

    addNewProject: function(projObj){
        const proj = this.createProjetoObj(projObj['proj_titulo'], 
            projObj['proj_subtitulo'], projObj['grupo_projeto'], projObj['filefoto'], projObj['link_projeto'],
            projObj['desc_projeto'], projObj['chip']
        );


        var bodyMarkdown = `---
title: ${proj['title']}
subtitle: ${proj['subtitle']}
image: ${proj['image']}
link: ${proj['link']}
description: ${proj['description']}
`;
        if (proj.tags != undefined && proj.tags!=''){
            bodyMarkdown = bodyMarkdown + `tags:`;
            try{
                proj.tags.forEach(function(elm){
                    bodyMarkdown = bodyMarkdown + `\n   - `+elm;
                })
            } catch (erro){
                bodyMarkdown = bodyMarkdown + `\n   - `+proj.tags;
            }
        }
    
        bodyMarkdown = bodyMarkdown + `\n---`;

        
        
        proj['title'] = proj['title'].replace("-", '');
        proj['title'] = proj['title'].replace("/", '');
        //TODO: Modificar Caminho Depois
        let camProj = path.resolve('../site_template/' , '_projects/'+proj['title'].split(" ").join('')+'.md');
        //let camProj = path.resolve('C:/Users/User/Documents/GitHub/site_template' , '_projects/'+proj['title'].split(" ").join('')+'.md');
        fs.writeFileSync(camProj, bodyMarkdown, function (err) {
            if (err) return 400;
            return 200;
        });

        return 200;    
    
    },

    prepareImageMembro: function(flagTemImg, imgName){
        if (flagTemImg){
            //TODO : Modificar caminhos
            let camAntigo = path.resolve('./', 'uploads/'+imgName);
            var camNovo = path.resolve('../site_template/' , 'assets/images/membros/'+imgName);

            fs.rename(camAntigo, camNovo, (err)=>{
                if (err) throw err
                console.log('Movido');
            })

            return '/assets/images/membros/'+imgName;
        }

        return '';

    },

    prepareImagePath : function (flagTemImg, imgName, flagNoticia){
        if(flagTemImg){
            
            let camAntigo;
            let camNovo
            if(flagNoticia){
                camAntigo = 'C:/Users/User/Desktop/NCA-API/uploads/'+imgName;
                //TODO: MUDAR CAMINHOS
                camNovo = 'C:/Users/User/Documents/GitHub/site_template/assets/images/noticias/'+imgName;
            }else{
                camAntigo = path.resolve('./', 'uploads/'+imgName);
                camNovo = path.resolve('../site_template/' , 'assets/images/projetos/'+imgName);
            }
            
            
            fs.rename(camAntigo, camNovo, (err)=>{
                if (err){
                    //TODO: Deletar img de uploads
                }
                console.log('Movido');
            })
            
            
            if(flagNoticia){
                return '/assets/images/noticias/'+imgName;
            }

            return '/assets/images/projetos/'+imgName;
        }
    
        return '';
    
    }, 

    prepareMarkdownNoticia: function(titulo, imageDir, tags, description){
        var bodyMarkdown = `---
title: ${titulo}
image: ${imageDir}
description: ${description}
`;
        if (tags != undefined){
            bodyMarkdown = bodyMarkdown + `tags:`;
            try{
                tags.forEach(function(elm){
                    bodyMarkdown = bodyMarkdown + `\n   - `+elm;
                })
            } catch (erro){
                bodyMarkdown = bodyMarkdown + `\n   - `+tags;
            }
        }

    
        bodyMarkdown = bodyMarkdown + `\n---`;
    
        return bodyMarkdown;
    
    },

    saveNoticia: function(titulo, imageDir, tags, description){
        
        //TODO: Analizar os tratamentos necessários no nome de salvamento do arquivo .md

        const dataAtual = new Date();
        const dia = dataAtual.getDate();      // Dia do mês (1-31)
        const mes = dataAtual.getMonth() + 1; // Mês (0-11) - Adiciona 1 porque o mês começa em 0 (janeiro é 0)
        const ano = dataAtual.getFullYear();  // Ano com 4 dígitos
        const nameNoticia = ano+'-'+mes.toString().padStart(2, '0')+'-'+dia.toString().padStart(2, '0')+'-'+titulo.replace(' ','_').replace(/[\/\\:*?"<>|]/g, '_').trim();
    
        //TODO: MUDAR CAMINHOS 

        let cam = path.resolve('../site_template/' , '_projects/'+nameNoticia+'.md');
        fs.writeFileSync(cam, this.prepareMarkdownNoticia(titulo, imageDir, tags, description), function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
        
    },

    saveMembro: function(nameMembro, descMembro, roleMembro, affiliationMembro, contatosObj, imgMembro){
        let camMembro = path.resolve('../site_template/' , '_members/'+nameMembro+'.md');
        fs.writeFileSync(camMembro, this.prepareMarkdownMembro(nameMembro, descMembro, roleMembro, affiliationMembro, contatosObj, imgMembro), function (err) {
            if (err) return 400;
            return 200;
        });

        return 200;
    },

    prepareMarkdownMembro: function(nameMembro, descMembro, roleMembro, affiliationMembro, contatosObj, imgMembro){
        for (let key in contatosObj){
            if (contatosObj[key] == ''){
                delete contatosObj[key];
            }
        }



        var bodyMarkdown = `---
name: ${nameMembro}
image: ${imgMembro}
description: ${descMembro}
role: ${roleMembro}
affiliation: ${affiliationMembro}
`;
        if(Object.keys(contatosObj).length > 0){
            
            for (let key in contatosObj){
                bodyMarkdown += `${key} : ${contatosObj[key]}\n`
            }
        }
    
        bodyMarkdown = bodyMarkdown + `---`;

    
        return bodyMarkdown;
    
    },

    // Recebe o conteúdo do .md e o nome do atributo e retorna o valor do atributo especificado presente no conteúdo.
    // OBS.: atributo deve ter ": " para pegar o valor corretamente.

    getMarkdownAttribute : function(content,attribute){
 
        // Expressão regular para capturar o conteúdo entre os delimitadores (---)
        const metadataMatch = content.match(/---([\s\S]*?)---/);

        if (metadataMatch) {
            // Divide o conteúdo das linhas capturadas entre os delimitadores
            const metadataLines = metadataMatch[1].split('\n');
                  
            // Procura pela linha que começa exatamente com "title: "
            const regex = new RegExp(`^${attribute}(.*)`);
            const attributeLine = metadataLines.find(line => regex.test(line.trim()));// .replace para remover char indesejados;
                  
            if (attributeLine) {
                // Extrai o valor do atributo. TODO: Identificar todos os caracteres indesejados
                value = attributeLine.replace(regex, '$1').replace(/\r/g, '').trim();
                //console.log('Título:', titletext);
                return value;
                } else {
                    console.log('Linha "'+attribute+'" não encontrada.');
                }
        } else {
            console.log('Metadados não encontrados.');
        }
    },

    // Função para apagar um arquivo Markdown com uma única imagem pelo título

    DeleteMarkdownByTitle_1 : function(title,caminho,tipo,res){       
        
        const markdownDir = path.join(caminho, tipo);
        
        // Lê todos os arquivos do diretório
        fs.readdir(markdownDir, (err, files) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao ler o diretório. '+ markdownDir });
            }
            var image = '';

            // Procura pelo arquivo Markdown que corresponde ao valor do atributo
            const fileToDelete = files.find(file => {
                const filePath = path.join(markdownDir, file);
                const content = fs.readFileSync(filePath, 'utf8'); // Lê o conteúdo do arquivo
                const attribute = 'title: ';

                const titletext = this.getMarkdownAttribute(content,attribute);
                //console.log(titletext);

                if (titletext==title){
                    image = this.getMarkdownAttribute(content, 'image: ');
                }

                // Aqui você verifica se o atributo corresponde ao valor passado
                return titletext == title; // Supondo que você esteja buscando por um título
            });

            if (!fileToDelete) {
                return res.status(404).json({ error: 'Arquivo não encontrado.' });
            }

            // Deleta o arquivo correspondente
            const fullPath = path.join(markdownDir, fileToDelete);
            

            //TODO: Revisar os testes com o diretório de imagens
            if (image!= undefined && image!=''){
                const pathImage = path.join(caminho,image);
                fs.unlink(pathImage, (err) => {
                    if (err) {
                        console.log('Erro ao deletar o arquivo de imagem: '+ pathImage);
                    }else{
                        console.log('Arquivo de imagem deletado com sucesso.');
                    }
                });
            }

            fs.unlink(fullPath, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao deletar o arquivo.' });
                }
                res.json({ message: 'Arquivo Markdown deletado com sucesso.' });
                });
        })
        // Teste de deleção de notícia: curl -X DELETE http://localhost:3000/deleteNoticia -H "Content-Type: application/json" -d '{"title": "Noticia teste"}'
        // Teste de deleção de projeto: curl -X DELETE http://localhost:3000/deleteProjeto -H "Content-Type: application/json" -d '{"title": "Projeto teste"}'
    },
    // OBS.: Dependendo de como forem os demais arquivos, a função acima pode ser usada para apagá-los também, sem a necessidade da implementação de funções individuais para cada arquivo

    EditNoticiaByTitle : function(title,caminho,res){
        
        const noticiaDir = path.join(caminho, '_posts');

        var originalContent = '';

        // Lê todos os arquivos do diretório
        fs.readdir(noticiaDir, (err, files) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao ler o diretório. '+ noticiaDir });
            }

            // Procura pelo arquivo Markdown que corresponde ao valor do atributo
            const fileToEdit = files.find(file => {
                const filePath = path.join(noticiaDir, file);
                const content = fs.readFileSync(filePath, 'utf8'); // Lê o conteúdo do arquivo
                const attribute = 'title: ';

                const titletext = this.getMarkdownAttribute(content,attribute);

                if(titletext == title){
                    originalContent = content;
                }

                // Aqui você verifica se o atributo corresponde ao valor passado
                return titletext == title; // Supondo que você esteja buscando por um título
            });

            if (!fileToEdit) {
                return res.status(404).json({ error: 'Arquivo não encontrado.' });
            }

            const fullPath = path.join(noticiaDir, fileToEdit);
            
            //Edição aqui

        })        
    }
}