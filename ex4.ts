interface Pessoa {
	id: number;
    name: string;
    bio: string;
}

let lista: Array<Pessoa> = [
    {"id" : 1, "name": "Ada Lovelace", "bio" : "Ada Lovelace, foi uma matemática e escritora inglesa reconhecida por ter escrito o primeiro algoritmo para ser processado por uma máquina"},
    {"id" : 2, "name": "Alan Turing", "bio" : "Alan Turing foi um matemático, cientista da computação, lógico, criptoanalista, filósofo e biólogo teórico britânico, ele é amplamente considerado o pai da ciência da computação teórica e da inteligência artificial"},
    {"id" : 3, "name": "Nikola Tesla", "bio" : "Nikola Tesla foi um inventor, engenheiro eletrotécnico e engenheiro mecânico sérvio, mais conhecido por suas contribuições ao projeto do moderno sistema de fornecimento de eletricidade em corrente alternada."},
    {"id" : 4, "name": "Nicolau Copérnico", "bio": "Nicolau Copérnico foi um astrônomo e matemático polonês que desenvolveu a teoria heliocêntrica do Sistema Solar."}
];

construirTabela();

//cria a tabela HTML com cabeçalho e seta os valores da lista na tabela
function construirTabela() : void {
    let tr: HTMLElement;
    
    document.body.innerHTML =
        '<table id="tabela">' +
            '<tr>' +
                '<th>Id</th>' +
                '<th>Nome</th>' +
                '<th>Bio</th>' +
                '<th>Ações</th>' +
            '</tr>' +
        '</table>';

    for(let i=0; i<lista.length; i++) {
        tr = document.createElement('tr');
        tr.innerHTML =
            `<td>${String(lista[i].id)}</td>` +
            `<td>${lista[i].name}</td>` +
            `<td>${lista[i].bio}</td>` +
            `<td>` +
                `<input type="button" value="Editar" onclick="editar(${Number(lista[i].id)})">` +
                `<input type="button" value="Excluir" onclick="excluir(${Number(lista[i].id)})">` +
            `</td>`;
        document.getElementById('tabela')?.append(tr);
    }
}

//procura a pessoa na lista pelo id e retorna seu index
function encontrarIndexPessoa(id: number): number {
    let index: number = -1;

    for(let i=0; i<lista.length; i++) {
        if(lista[i].id == id) {
            index = i;
            break;
        }
    }
    return index;
}

//apaga a tabela e o formulário e reconstrói a tabela com os novos valores da lista
function reload(): void {
    document.getElementById('tabela');
    document.getElementsByTagName('div');
    construirTabela();
}

//altera os valores da lista com os valores de input no formulário
function alterarPessoa(index: number) : void {
    lista[index].id = Number((<HTMLSelectElement>document.getElementById('id')).value);
    lista[index].name = (<HTMLSelectElement>document.getElementById('nome')).value;
    lista[index].bio = (<HTMLSelectElement>document.getElementById('bio')).value;

    reload();
}

//cria o formulário de edição na página, com inputs já inicializados com os valores atuais dos atributos da lista
function editar(id: number) : void {
    let formulario: HTMLElement;
    let index: number;

    index = encontrarIndexPessoa(id);
    formulario = document.createElement('div');
    formulario.innerHTML = `Id: <input type="number" id="id" value="${lista[index].id}"><br>` +
        `Nome: <input type="string" id="nome" value="${lista[index].name}"><br>` +
        `Bio: <input type="string" id="bio" value="${lista[index].bio}"><br>` +
        `<input type="button" value="Enviar" onclick="alterarPessoa(${index})">`;
    document.body.appendChild(formulario);
}

//exclui o item da lista
function excluir(id: number): void {
    lista.splice(encontrarIndexPessoa(id), 1);
    reload();
}