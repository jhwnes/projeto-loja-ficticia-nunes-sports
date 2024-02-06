const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCodigo = document.querySelector('#m-codigo')
const sDescricao = document.querySelector('#m-descricao')
const sPreco = document.querySelector('#m-preco')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
    }
}

    if (edit) {
        sNome.value = itens[index].nome
        sCodigo.value = itens[index].codigo
        sDescricao.value = itens[index].descricao
        sPreco.value = itens[index].preco
        id = index
    } else {
        sNome.value = ''
        sCodigo.value = ''
        sDescricao.value = ''
        sPreco.value = ''
    }
}

function editItem(index) {

    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensDB()
    loadItens()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.codigo}</td>
        <td>${item.descricao}</td>
        <td>R$ ${item.preco}</td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

    if (sNome.value == '' || sCodigo.value == '' || sDescricao.value == '' || sPreco.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = sNome.value
        itens[id].codigo = sCodigo.value
        itens[id].descricao = sDescricao.value
        itens[id].preco = sPreco.value
    } else {
        itens.push({'nome': sNome.value, 'codigo': sCodigo.value, 'descricao': sDescricao.value, 'preco': sPreco.value})
    }

    setItensDB()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}

function loadItens() {
    itens = getItensDB()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}

const getItensDB = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensDB = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

