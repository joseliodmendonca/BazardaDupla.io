const form = document.getElementById('formCadastro');
const mensagem = document.getElementById('mensagem');
const totalCadastros = document.getElementById('totalCadastros');
const btnExportar = document.getElementById('btnExportar');
const senhaExport = document.getElementById('senhaExport');

const STORAGE_KEY = 'cadastros_bazar_da_josy';
const EXPORT_PASSWORD = 'BazardaDuplaJosyDias';
let cadastros = carregarCadastros();
atualizarTotal();

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    if (!nome) return;

    const data = new Date().toLocaleString('pt-BR');

    cadastros.push({ nome, data });
    salvarCadastros();
    atualizarTotal();
    mensagem.textContent = "Cadastro realizado com sucesso!";
    form.reset();
});

btnExportar.addEventListener('click', function () {
    if (cadastros.length === 0) {
        mensagem.textContent = "Nenhum cadastro para exportar.";
        return;
    }
    const senhaDigitada = senhaExport.value.trim();
    if (senhaDigitada !== EXPORT_PASSWORD) {
        mensagem.textContent = "Senha incorreta para exportar.";
        return;
    }
    gerarCSV();
});

function gerarCSV() {
    let csv = "Nome;Data de Cadastro\n";

    cadastros.forEach(item => {
        csv += `${item.nome};${item.data}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "cadastros_bazar_da_josy.csv";
    link.click();
}

function salvarCadastros() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cadastros));
}

function carregarCadastros() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function atualizarTotal() {
    totalCadastros.textContent = String(cadastros.length);
}
